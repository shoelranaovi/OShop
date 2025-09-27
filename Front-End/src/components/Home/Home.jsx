import { useDispatch } from "react-redux";
import Categories from "../Layout/Category"
import MetaData from "../Layout/MetaData"
import Banner from "./Banner/Banner"
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import DealSlider from "./DealSlider/DealSlider";
import ProductSlider from "./ProductSlider/ProductSlider";

function Home() {
    
  const dispatch = useDispatch();
//   const { enqueueSnackbar } = useSnackbar();

    const error =false
    const loading =false

    // todo

    // useEffect(() => {
    //     if (error) {
    //       enqueueSnackbar(error, { variant: "error" });
    //       dispatch(clearErrors());
    //     }
    //     dispatch(getSliderProducts());
    //   }, [dispatch, error, enqueueSnackbar]);

  return (

    <>      
    <MetaData title="Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!" />
    <Categories />
    <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
    <Banner />
    <DealSlider title={"Discounts for You"} />
        {!loading && <ProductSlider title={"Suggested for You"} tagline={"Based on Your Activity"} />}
        <DealSlider title={"Top Brands, Best Price"} />
        {!loading && <ProductSlider title={"You May Also Like..."} tagline={"Based on Your Interest"} />}
        <DealSlider title={"Top Offers On"} />
        {!loading && <ProductSlider title={"Don't Miss These!"} tagline={"Inspired by your order"} />}

    </main>
    </>
  )
}

export default Home