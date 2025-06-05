import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='relative container mx-auto px-6 h-[300px] flex flex-col justify-around items-center bottom-0 z-20 bg-[url(/img/photography-bg.jpg)] bg-center bg-cover bg-no-repeat'>
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <a href='mailto:madaranarampanawa@gmail.com' className='text-xl md:text-2xl xl:text-3xl z-10 hover:text-gray-400'>madaranarampanawa@gmail.com</a>
      <p className="mb-4 text-white text-center font-normal md:mb-0 z-10">
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
