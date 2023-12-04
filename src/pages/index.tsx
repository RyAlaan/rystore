import Header from "@/components/layouts/HomePage/Header";
import FlashSale from "@/components/layouts/HomePage/FlashSale";
import Categories from "@/components/layouts/HomePage/Categories";
import Ads from "@/components/layouts/HomePage/Ads";
import Featured from "@/components/layouts/HomePage/Featured";

const HomePage = () => {
  return (
      <div className="flex flex-col font-poppins px-3 overflow-x-hidden">
        <div className="mt-12 py-8 lg:px-8">
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
            {/* <BestPoruduct /> */}
          </div>
          <div className="">
            <Ads />
          </div>
          <div className="pt-[70px]">
            {/* <ProductsSection /> */}
          </div>
          <div className="py-16 md:py-36">
            <Featured />
          </div>
        </div>
      </div>
  );
};

export default HomePage;
