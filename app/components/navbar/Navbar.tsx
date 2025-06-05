import React from 'react'
import Image from 'next/image'
import Link from "next/link";

const Navbar = () => {
  return (
    <header
      className="fixed top-0 bg-gradient-to-t from-transparent to-black w-full z-30 flex justify-center items-center h-[90px] px-6 sm:px-10"
      role="banner"
    >
      <nav aria-label="Main navigation">
        <Link href="/" scroll={false} aria-label="Go to homepage">
          <Image
            src="/img/logo.png"
            alt="Snaps by Madz logo"
            width={100}
            height={100}
            className="h-10 w-auto object-contain cursor-pointer drop-shadow-md"
            priority
          />
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
