import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='h-[90px] flex justify-center items-center bottom-0'>
      <p className="mb-4 text-white text-center font-normal md:mb-0">
        &copy; {currentYear}{" "}
        <a href="#" className="hover:text-primary">
          Snap by Madz
        </a>
        . All Rights Reserved. Designed By 
        <a href="#" className="hover:text-primary"> Nezcode</a>.
      </p>
    </div>
  )
}

export default Footer
