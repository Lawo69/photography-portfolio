import Portfolio from "./pages/portfolio";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <div className="h-full bg-[url('/img/photography-bg.jpg')] bg-cover bg-center overflow-auto slider">
      <Navbar />
      <Portfolio />
      <Footer />
    </div>
  );
}
