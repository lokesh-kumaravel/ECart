import React from "react";
import HeroSlider from "../components/sliders/HeroSlider";
import FeaturedSlider from "../components/sliders/FeaturedSlider";
import SectionsHead from "../components/common/SectionsHead";
import TopProducts from "../components/product/TopProducts";
import Services from "../components/common/Services";
// import commonContext from "../contexts/common/commonContext";
// import { useContext } from "react";
const Home = () => {
  //   const { products } = useContext(commonContext);
  return (
    <main>
      <section id="hero">
        <HeroSlider />
      </section>
      {/* {console.log(products)} */}
      <section id="featured" className="section">
        <div className="container">
          <SectionsHead heading="Featured Products" />
          <FeaturedSlider />
        </div>
      </section>

      <section id="products" className="section">
        <div className="container">
          <SectionsHead heading="Top Products" />
          <TopProducts />
        </div>
      </section>

      <Services />
    </main>
  );
};

export default Home;
