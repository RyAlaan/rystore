import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../components/fragments/Card/Card";
import Navbar from "../components/layouts/Navbar";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/layouts/HomePage/Header";
import FlashSale from "@/components/layouts/HomePage/FlashSale";
import Categories from "@/components/layouts/HomePage/Categories";
import BestPoruduct from "@/components/layouts/HomePage/BestProduct";
import Ads from "@/components/layouts/HomePage/Ads";
import ProductsSection from "@/components/layouts/HomePage/ProductsSection";
import Featured from "@/components/layouts/HomePage/Featured";
import Footer from "@/components/layouts/Footer";

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col font-poppins px-3">
        <div className="mt-12 py-8 px-8">
          <div className="">
            <Header />
          </div>
          <div className="pt-8">
            <FlashSale />
          </div>
          <div className="pt-8 border-y mb-5">
            <Categories />
          </div>
          <div className="pt-[70px] pb-[120px]">
            <BestPoruduct />
          </div>
          <div className="">
            <Ads />
          </div>
          <div className="pt-[70px]">
            <ProductsSection />
          </div>
          <div className="py-16 md:py-36">
            <Featured />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
