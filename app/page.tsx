import Portfolio from "./pages/portfolio";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <div className="h-full overflow-auto bg-black slider">
      <Navbar />
      <Portfolio />
      <Footer />
    </div>
  );
}
