import React from 'react'
import Image from 'next/image'
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="fixed top-0 bg-gradient-to-t from-transparent to-black w-full z-30 flex justify-center items-center h-[90px] px-10">
      <Link href="/" scroll={false}>
        <Image
          src="/img/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="h-10 w-auto object-contain cursor-pointer"
        />
      </Link>
    </header>
  )
}

export default Navbar
