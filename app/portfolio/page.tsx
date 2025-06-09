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

const Portfolio = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const lightboxRef = useRef<LightGallery | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch('/api/images')
      .then(res => res.json())
      .then((data: ImageItem[]) => setImages(data))
      .catch(err => console.error('Error fetching images:', err));
  }, []);

  return (
    <div className='relative grow pt-[100px] z-20'>
      <div className='relative flex flex-col items-center h-full p-10'>
        <TabGroup className='flex flex-col items-center h-full w-full'>
          <TabList className="flex flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-5">
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
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                        dynamic
                        dynamicEl={filteredImages.map((image) => ({
                          src: image.imageUrl,
                          thumb: image.imageUrl,
                        }))}
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
