
import { Inter } from "next/font/google";
import MultiLayerParallax from "./components/banner/MultiLayerParallax";
import Image from 'next/image';
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const images = [
  { src: "/img/img-1.jpg", className: "-rotate-20 bottom-15 left-20" },
  { src: "/img/img-7.jpg", className: "-rotate-10 bottom-25 left-50" },
  { src: "/img/img-9.jpg", className: "rotate-10 bottom-25 right-50" },
  { src: "/img/img-1.jpg", className: "rotate-20 bottom-15 right-20" },
];

export default function Home() {
  return (
    <main className={inter.className}>
      <MultiLayerParallax />
      <div className="relative container mx-auto px-6 w-full bg-black">
        <div className="absolute -top-30 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black z-20" />
        <div className="max-w-lg space-y-4 mx-auto py-24 text-neutral-300">
          <p>
            Based in Sri Lanka, Madara is a passionate photographer with an eye for the beauty in both the everyday and the extraordinary. From the vivid textures of nature and the elegance of interior design to the fine details of product photography, Madara captures moments that tell a story.
          </p>
          <p>
            Guided by curiosity and a deep appreciation for simplicity, Madara’s work reflects a love for light, composition, and natural emotion. Whether it&apos;s a fleeting shadow, a thoughtfully designed space, or a unique product angle, Madara believes in photographing what truly speaks.
          </p>
          <p>
            With every shot, Madara invites you to pause, feel, and connect. This is more than photography—this is a visual journey through stillness, wonder, and storytelling.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative hidden w-[800px] h-[600px] bg-black overflow-hidden md:flex items-center justify-center">
          {images.map((image, index) => (
            <Link href="/portfolio" scroll={false} key={index}>
              <Image
                src={image.src}
                alt='placeholder'
                width={256}
                height={384}
                className={`absolute rounded-lg shadow-lg transition-transform hover:scale-95 cursor-pointer duration-300 ${image.className}`}
              />
            </Link>
          ))}
        </div>
        <Link
            href="/portfolio"
            scroll={false}
            className="text-gray-400 hover:text-white tracking-widest text-sm pb-24 hover:underline"
          >
            VIEW PORTFOLIO →
          </Link>
      </div>
    </main>
  );
}