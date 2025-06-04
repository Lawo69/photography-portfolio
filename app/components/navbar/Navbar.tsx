import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="sticky top-0 bg-black w-full z-30 flex justify-between items-center h-[90px] px-10">
        <div className='min-w-1/3'>hm</div>
        <div className='min-w-1/3 text-center font-medium text-lg uppercase'>Madz!</div>
        <div className='min-w-1/3 text-right'>
          <Link href="#" className='rounded-3xl  bg-white text-stone-700 px-3 py-2 hover:opacity-90'>Get in Touch</Link>
        </div>
    </header>
  )
}

export default Navbar
