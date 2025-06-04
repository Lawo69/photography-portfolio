'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import React from 'react'
import Masonry from 'react-masonry-css';
import Image from 'next/image';

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

const Portfolio = () => {
  return (
    <main className='grow'>
      <div className='flex flex-col items-center h-full p-10'>
        <TabGroup className='flex flex-col items-center h-full w-full'>
          <TabList className='flex items-center gap-12'>
            {tabs.map((tab) => (
              <Tab key={tab.key} className='p-2 focus:outline-none font-sans uppercase font-medium cursor-pointer'>
                {({ selected }) => (
                  <span
                    className={ selected ? 'text-white' : 'text-stone-600'}
                  >
                    {tab.display}
                  </span>
                )}
              </Tab>
            ))}
          </TabList>
          <TabPanels className='w-full max-w-5xl my-6'>
            <TabPanel>
              <Masonry breakpointCols={4} className='flex gap-5' columnClassName=''>
                <Image src={Img1} alt='placeholder' className='my-5' />
                <Image src={Img2} alt='placeholder' className='my-5' />
                <Image src={Img3} alt='placeholder' className='my-5' />
                <Image src={Img4} alt='placeholder' className='my-5' />
                <Image src={Img5} alt='placeholder' className='my-5' />
              </Masonry>
            </TabPanel>
            <TabPanel>Product</TabPanel>
            <TabPanel>Interior</TabPanel>
            <TabPanel>Nature</TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </main>
  )
}

export default Portfolio;
