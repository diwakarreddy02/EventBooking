import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero";
import Eventcard from "../../components/Eventcard";
import Eventinfo from "../../components/Eventinfo";
import Footer from "../../components/Footer";
// import ImageSlider from "../../components/Slider";

function HomePage() {
  return (
    <>
      
      <Hero
        cName="hero"
        heroImg="https://images.unsplash.com/photo-1487466365202-1afdb86c764e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80"
        title="Don't miss out, book your spot today!"
        url="/"
      />
      <Eventinfo />
      <Eventcard />
      {/* <ImageSlider/> */}
    </>
  );
}

export default HomePage;
