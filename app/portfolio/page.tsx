'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import React, { useEffect, useRef } from 'react'
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

import Img1 from '@/public/img/img-1.jpg';
import Img2 from '@/public/img/img-2.png';
import Img3 from '@/public/img/img-3.jpeg';
import Img4 from '@/public/img/img-4.jpeg';
import Img5 from '@/public/img/img-5.jpg';

const tabs = [
  {
    key: 'all',
    display: 'All'
  },
  {
    key: 'product',
    display: 'Product'
  },
  {
    key: 'interior',
    display: 'Interior'
  },
  {
    key: 'nature',
    display: 'Nature'
  }
]

const images = [
  Img1,
  Img2,
  Img3,
  Img4,
  Img5
]

const Portfolio = () => {
  const lightboxRef = useRef<LightGallery | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='relative grow pt-[100px] z-20'>
      <div className='relative flex flex-col items-center h-full p-10'>
        <TabGroup className='flex flex-col items-center h-full w-full'>
          <TabList className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-12">
            {tabs.map((tab) => (
              <Tab key={tab.key} className="p-1 sm:p-2 text-sm sm:text-base focus:outline-none font-sans uppercase font-medium cursor-pointer">
                {({ selected }) => (
                  <span className={selected ? "text-white" : "text-stone-600"}>
                    {tab.display}
                  </span>
                )}
              </Tab>
            ))}
          </TabList>

          <TabPanels className='w-full max-w-5xl my-6'>
            <TabPanel>
              <Masonry
                breakpointCols={{
                  default: 4,
                  768: 2
                }}
                className='flex gap-5'
                columnClassName=''
              >
                {images.map((image, idx) => (
                  <Image
                    key={image.src}
                    src={image}
                    alt='placeholder'
                    className='my-5 hover:opacity-80 transition-all duration-500 cursor-pointer'
                    placeholder='blur'
                    onClick={() => {
                      lightboxRef.current?.openGallery(idx);
                    }}
                  />
                ))}
              </Masonry>

              <LightGalleryComponent
                onInit={(ref) => {
                  if (ref) {
                    lightboxRef.current = ref.instance
                  }
                }}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                dynamic
                dynamicEl={
                  images.map(image => ({
                    src: image.src,
                    thumb: image.src
                  }))
                }
              >
              </LightGalleryComponent>
            </TabPanel>
            <TabPanel>Product</TabPanel>
            <TabPanel>Interior</TabPanel>
            <TabPanel>Nature</TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  )
}

export default Portfolio;
