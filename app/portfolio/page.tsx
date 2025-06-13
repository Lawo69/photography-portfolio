/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import React, { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import LightGalleryComponent from 'lightgallery/react';
import { LightGallery } from 'lightgallery/lightgallery';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

type ImageItem = {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: string;
};

const category = [
  { key: 'all', display: 'All' },
  { key: 'product', display: 'Product' },
  { key: 'nature', display: 'Nature' },
  { key: 'people', display: 'People' },
  { key: 'food', display: 'Food' },
  { key: 'travel', display: 'Travel' },
  { key: 'architecture', display: 'Architecture' },
  { key: 'animal', display: 'Animal' },
  { key: 'others', display: 'Others' },
];

// 🔽 Watermark download function
const downloadWithWatermark = async (url: string, title: string) => {
  const img = document.createElement('img') as HTMLImageElement;
  img.crossOrigin = 'anonymous';
  img.src = url;

  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    // Watermark
    const watermark = '© SnapbyMadz';
    ctx.font = '100px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.textAlign = 'right';
    ctx.fillText(watermark, canvas.width - 50, canvas.height - 50);

    const link = document.createElement('a');
    link.download = `${title || 'image'}-snapbymadz.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.92);
    link.click();
  };

  img.onerror = () => console.error('Image load failed');
};

const Portfolio = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const lightboxRef = useRef<LightGallery | null>(null);
  const currentImagesRef = useRef<ImageItem[]>([]); // to track images in each tab

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/images')
      .then(res => res.json())
      .then((data: ImageItem[]) => setImages(data))
      .catch(err => console.error('Error fetching images:', err));
  }, []);

  const handleAfterSlide = (event: any) => {
    const index = event.index;
    const image = currentImagesRef.current[index];

    // Remove existing button if any
    const existingBtn = document.getElementById('custom-download-btn');
    if (existingBtn) existingBtn.remove();

    const downloadBtn = document.createElement('button');
    downloadBtn.innerText = 'Download';
    downloadBtn.id = 'custom-download-btn';
    downloadBtn.style.cssText = `
      position: absolute;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      padding: 8px 14px;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    downloadBtn.onclick = () => {
      downloadWithWatermark(image.imageUrl, image.title);
    };

    const container = document.querySelector('.lg-current');
    if (container) {
      container.appendChild(downloadBtn);
    }
  };

  return (
    <div className='relative grow pt-[100px] z-20'>
      <div className='relative flex flex-col items-center h-full p-10'>
        <TabGroup className='flex flex-col items-center h-full w-full'>
          <TabList className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2 sm:gap-5">
            {category.map((tab) => (
              <Tab
                key={tab.key}
                className="p-1 sm:p-2 text-sm sm:text-base focus:outline-none font-sans uppercase font-medium cursor-pointer"
              >
                {({ selected }) => (
                  <span className={selected ? "text-white" : "text-stone-600"}>
                    {tab.display}
                  </span>
                )}
              </Tab>
            ))}
          </TabList>

          <TabPanels className='w-full max-w-5xl my-6'>
            {category.map((cat) => {
              const filteredImages =
                cat.key === 'all'
                  ? images
                  : images.filter((img) => img.category.toLowerCase() === cat.key);

              return (
                <TabPanel key={cat.key}>
                  {filteredImages.length > 0 ? (
                    <>
                      <Masonry
                        breakpointCols={{ default: 4, 768: 2 }}
                        className='flex gap-5'
                        columnClassName='masonry-column'
                      >
                        {filteredImages.map((image, idx) => (
                          <Image
                            key={image._id}
                            src={image.imageUrl}
                            alt={image.title}
                            width={300}
                            height={200}
                            className='my-5 hover:opacity-80 transition-all duration-500 cursor-pointer'
                            onClick={() => {
                              currentImagesRef.current = filteredImages;
                              lightboxRef.current?.openGallery(idx);
                            }}
                          />
                        ))}
                      </Masonry>

                      <LightGalleryComponent
                        onInit={(ref) => {
                          if (ref) {
                            lightboxRef.current = ref.instance;
                          }
                        }}
                        dynamic
                        dynamicEl={filteredImages.map((image) => ({
                          src: image.imageUrl,
                          thumb: image.imageUrl,
                        }))}
                        plugins={[lgThumbnail, lgZoom]}
                        speed={500}
                        download={false} // ✅ hide default download
                        onAfterSlide={handleAfterSlide} // ✅ add watermark download button
                      />
                    </>
                  ) : (
                    <div className="text-center text-gray-500 py-10 text-lg font-medium">
                      No images found.
                    </div>
                  )}
                </TabPanel>
              );
            })}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default Portfolio;
