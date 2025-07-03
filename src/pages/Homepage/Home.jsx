import Header from "../../components/Header/Header";
import Banner from "./Banner";
import FeatureBar from "../../components/FeatureBar/featureBar";
import TopBrands from '../../components/TopBrands/topBrands';
import ImageTextBlock from "../../components/ImageTextBlock/ImageTextBlock";
import WeekendOfferBlock from "../../components/WeekendOfferBlock/WeekendOfferBlock";
import ShopCategory from "../../components/ShopCategory/ShopCategory";
import PersonalCareProduct from "../../components/PersonalCareProduct/PersonalCareProduct";
import ImageTextBlockTwo from "../../components/ImageTextBlockTwo/ImageTextBlockTwo";
import ClientTestimonial from "../../components/ClientTestimonial/ClientTestimonial";
import BlogSection from "../../components/BlogSection/BlogSection";
import Footer from "../../components/Footer/Footer";


function Home (){
  return (
    <>
      <div className="main_content_wrapper">
        <Banner />
        <FeatureBar />
        <TopBrands />
        <ImageTextBlock />
        <WeekendOfferBlock />
        <ShopCategory />
        <PersonalCareProduct />
        <ImageTextBlockTwo />
        <ClientTestimonial />
        <BlogSection />
      </div>
      <Footer />
    </>
  );
}

export default Home;