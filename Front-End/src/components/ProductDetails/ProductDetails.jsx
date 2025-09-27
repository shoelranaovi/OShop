import { enqueueSnackbar, useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
// import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from "../Home/Banner/Banner";
import ProductSlider from "../Home/ProductSlider/ProductSlider";
import Loader from "../Layout/Loader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
// import { NEW_REVIEW_RESET } from '../../constants/productConstants';
// import { addItemsToCart } from '../../actions/cartAction';
import { getDeliveryDate, getDiscount } from "../../utils/functions";
// import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import MinCategory from "../Layout/MinCategory";
import MetaData from "../Layout/MetaData";
import { createReview, getReview, singlepost } from "@/Redux/postSlice";
import { addToCart } from "@/Redux/CartSlice";
import { addTowishlist, removeFromwishlist } from "@/Redux/WishlistSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const navigate = useNavigate();

  const productId = params.id;

  useEffect(() => {
    dispatch(singlepost(productId));
  }, [dispatch, productId]);

  // reviews toggle
  const [open, setOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { isLoading, productDetails } = useSelector((state) => state.post);

  const product = productDetails;
  // const { product, loading, error } = useSelector((state) => state.productDetails);
  //   const product = {
  //     brand: {
  //       logo: {
  //         public_id: "brands/ymgu42ulow4yuy7xfcio",
  //         url: "https://res.cloudinary.com/lifecodes/image/upload/v1644426872/brands/ymgu42ulow4yuy7xfcio.png",
  //       },
  //       name: "TP-Link",
  //     },
  //     _id: "6203f6755893c7f4f98c358a",
  //     name: "TP-Link Archer C20 AC WiFi 750 MBPS Wireless Router  (Blue, Dual Band)",
  //     description:
  //       "A good network is mandatory for interruption-free binge watching. When you bring home the TP-Link Archer C20 Wireless Dual Band router, you can be assured to have a consistent signal, thanks to the presence of three external antennas and dual band connections.",
  //     highlights: [
  //       "Type: Wireless Without Modem",
  //       "750 MBPS Speed",
  //       "Frequency: 2.4 GHz, 5 GHz",
  //       "External Antenna",
  //     ],
  //     specifications: [
  //       {
  //         title: "Type",
  //         description: "Wireless Without Modem",
  //         _id: "6203f6755893c7f4f98c358b",
  //       },
  //       {
  //         title: "Model",
  //         description: " Archer C20 AC WiFi",
  //         _id: "6203f6755893c7f4f98c358c",
  //       },
  //       {
  //         title: "In The Box",
  //         description:
  //           "Wi-Fi Router Archer C20, Power Adapter, RJ45 Ethernet Cable, Quick Installation Guide",
  //         _id: "6203f6755893c7f4f98c358d",
  //       },
  //       {
  //         title: "Color",
  //         description: "Blue",
  //         _id: "6203f6755893c7f4f98c358e",
  //       },
  //       {
  //         title: "Brand",
  //         description: " TP-Link",
  //         _id: "6203f6755893c7f4f98c358f",
  //       },
  //       {
  //         title: "Wireless Speed",
  //         description: " 750 MBPS",
  //         _id: "6203f6755893c7f4f98c3590",
  //       },
  //     ],
  //     price: 1599,
  //     cuttedPrice: 2499,
  //     images: [
  //       {
  //         public_id: "products/xijub1dgipfknne718ge",
  //         url: "https://res.cloudinary.com/lifecodes/image/upload/v1644426864/products/xijub1dgipfknne718ge.jpg",
  //         _id: "6203f6755893c7f4f98c3591",
  //       },
  //       {
  //         public_id: "products/z8yrpdmoj8ccih8xbrr4",
  //         url: "https://res.cloudinary.com/lifecodes/image/upload/v1644426866/products/z8yrpdmoj8ccih8xbrr4.jpg",
  //         _id: "6203f6755893c7f4f98c3592",
  //       },
  //       {
  //         public_id: "products/roqcs0cf3vdlmoh8bijc",
  //         url: "https://res.cloudinary.com/lifecodes/image/upload/v1644426868/products/roqcs0cf3vdlmoh8bijc.jpg",
  //         _id: "6203f6755893c7f4f98c3593",
  //       },
  //       {
  //         public_id: "products/qof9c7alucfr1e6uq6qi",
  //         url: "https://res.cloudinary.com/lifecodes/image/upload/v1644426870/products/qof9c7alucfr1e6uq6qi.jpg",
  //         _id: "6203f6755893c7f4f98c3594",
  //       },
  //     ],
  //     category: "Electronics",
  //     stock: 99,
  //     warranty: 2,
  //     ratings: 3.875,
  //     numOfReviews: 8,
  //     user: "6203ecf05893c7f4f98c34f0",
  //     reviews: [
  //       {
  //         user: "62051cba94c232bf0be7045e",
  //         name: "Akshay Patil",
  //         rating: 4.5,
  //         comment: "Best Router ",
  //         _id: "6205237b94c232bf0be7cefb",
  //       },
  //       {
  //         user: "6205189f94c232bf0be6c1f0",
  //         name: "Harsh Singh",
  //         rating: 4,
  //         comment: "Best one",
  //         _id: "6205246394c232bf0be80e6f",
  //       },
  //       {
  //         user: "62051a1f94c232bf0be6d0e4",
  //         name: "Shruti Jadhav",
  //         rating: 4.5,
  //         comment: "good quality",
  //         _id: "62053bc994c232bf0beb3760",
  //       },
  //       {
  //         user: "64caacd945e78d73a25736a2",
  //         name: "jkg",
  //         rating: 3.5,
  //         comment: "sssd",
  //         _id: "64caacf045e78d73a25742a4",
  //       },
  //       {
  //         user: "66828de36f73ad5265c2a922",
  //         name: "kumar",
  //         rating: 3.5,
  //         comment: "hchg",
  //         _id: "66828e8525c11f27f06df3e9",
  //       },
  //       {
  //         user: "66828fa1d72cb1f97d326a7f",
  //         name: "aaaaaaaaa",
  //         rating: 3.5,
  //         comment: "qwdqwdqwd",
  //         _id: "668392f9209a69b52282ad20",
  //       },
  //       {
  //         user: "668e67c28587f17f197fc111",
  //         name: "jmumumu",
  //         rating: 3,
  //         comment: "cds",
  //         _id: "6690d1962bdd56b6192ad90c",
  //       },
  //       {
  //         user: "6787f9cf1a43c6adb9ccdded",
  //         name: "Hoàng Việt Đức",
  //         rating: 4.5,
  //         comment: "v",
  //         _id: "6787fc320efb6f7425a2ea13",
  //       },
  //     ],
  //     createdAt: "2022-02-09T17:14:29.355Z",
  //     __v: 8,
  //   };
  // const { success, error: reviewError } = useSelector((state) => state.newReview);

  const { cart } = useSelector((state) => state.cart);
  const itemInCart = cart.some((i) => i._id === productId);

  const { wishlist } = useSelector((state) => state.wishList);
  const goToCart = () => {
    navigate("/cart");
  };

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const itemInWishlist = wishlist.some((i) => i._id === productId);
  console.log(itemInWishlist);

  const addToWishlistHandler = () => {
    if (itemInWishlist) {
      dispatch(removeFromwishlist({ _id: productId }));
      enqueueSnackbar("Remove From Wishlist", { variant: "success" });
    } else {
      dispatch(addTowishlist(product));
      enqueueSnackbar("Added To Wishlist", { variant: "success" });
    }
  };

  const reviewSubmitHandler = () => {
    if (rating === 0 || !comment.trim()) {
      enqueueSnackbar("Empty Review", { variant: "error" });
      return;
    }
    const fromData = {
      rating,
      comment,
      productId,
    };
    console.log(fromData);

    dispatch(createReview(fromData)).then((data) => {
      if (data.payload.success) {
        console.log(data.payload);
        dispatch(getReview(productId));

        enqueueSnackbar("Review Added", { variant: "success" });
      } else {
        enqueueSnackbar("Error Adding Review", { variant: "error" });
      }
    });
    setOpen(false);
  };

  const handleDialogClose = () => {
    setOpen(!open);
  };

  const buyNow = () => {
    addToCartHandler();
    navigate("/shipping");
  };

  // useEffect(() => {
  //     if (error) {
  //         enqueueSnackbar(error, { variant: "error" });
  //         dispatch(clearErrors());
  //     }
  //     if (reviewError) {
  //         enqueueSnackbar(reviewError, { variant: "error" });
  //         dispatch(clearErrors());
  //     }
  //     if (success) {
  //         enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
  //         dispatch({ type: NEW_REVIEW_RESET });
  //     }
  //     dispatch(getProductDetails(productId));
  //     // eslint-disable-next-line
  // }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

  // useEffect(() => {
  //     dispatch(getSimilarProducts(product?.category));
  // }, [dispatch, product, product.category]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product?.name} />
          <MinCategory />
          <main className="mt-12 sm:mt-0">
            {/* <!-- product image & description container --> */}
            <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">
              {/* <!-- image wrapper --> */}
              <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                {/* <!-- imgbox --> */}
                <div className="flex flex-col gap-3 m-3">
                  <div className="w-full h-full pb-6 border relative">
                    <Slider {...settings}>
                      {product?.images &&
                        product?.images.map((item, i) => (
                          <img
                            draggable="false"
                            className="w-full h-96 object-contain"
                            src={item.url}
                            alt={product?.name}
                            key={i}
                          />
                        ))}
                    </Slider>
                    <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                      <span
                        onClick={addToWishlistHandler}
                        className={`${
                          itemInWishlist
                            ? "text-red-500"
                            : "hover:text-red-500 text-gray-300"
                        } cursor-pointer`}>
                        <FavoriteIcon sx={{ fontSize: "18px" }} />
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex gap-3">
                    {/* <!-- add to cart btn --> */}
                    {product?.stock > 0 && (
                      <button
                        onClick={itemInCart ? goToCart : addToCartHandler}
                        className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-yellow-600 rounded-sm shadow hover:shadow-lg">
                        <ShoppingCartIcon />
                        {itemInCart ? "GO TO CART" : "ADD TO CART"}
                      </button>
                    )}
                    <button
                      onClick={buyNow}
                      disabled={product?.stock < 1 ? true : false}
                      className={
                        product?.stock < 1
                          ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg"
                          : "p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-orange-500 rounded-sm shadow hover:shadow-lg"
                      }>
                      <FlashOnIcon />
                      {product?.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                    </button>
                    {/* <!-- add to cart btn --> */}
                  </div>
                </div>
                {/* <!-- imgbox --> */}
              </div>
              {/* <!-- image wrapper --> */}

              {/* <!-- product desc wrapper --> */}
              <div className="flex-1 py-2 px-3">
                {/* <!-- whole product description --> */}
                <div className="flex flex-col gap-2 mb-4">
                  <h2 className="text-xl">{product?.name}</h2>
                  {/* <!-- rating badge --> */}
                  <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                    <span className="text-xs px-1.5 py-0.5 bg-green-600 rounded-sm text-white flex items-center gap-0.5">
                      {product?.ratings && product.ratings.toFixed(1)}{" "}
                      <StarIcon sx={{ fontSize: "12px" }} />
                    </span>
                    <span>{product?.numOfReviews} Reviews</span>
                  </span>
                  {/* <!-- rating badge --> */}

                  {/* <!-- price desc --> */}
                  <span className="text-green-400 text-sm font-medium">
                    Special Price
                  </span>
                  <div className="flex items-baseline gap-2 text-3xl font-medium">
                    <span className="text-gray-800">
                      ₹{product?.price?.toLocaleString()}
                    </span>
                    <span className="text-base text-gray-500 line-through">
                      ₹{product?.cuttedPrice?.toLocaleString()}
                    </span>
                    <span className="text-base text-green-600">
                      {getDiscount(product?.price, product?.cuttedPrice)}
                      %&nbsp;off
                    </span>
                  </div>
                  {product?.stock <= 10 && product?.stock > 0 && (
                    <span className="text-red-500 text-sm font-medium">
                      Hurry, Only {product?.stock} left!
                    </span>
                  )}
                  {/* <!-- price desc --> */}

                  {/* <!-- banks offers --> */}
                  <p className="text-md font-medium">Available offers</p>
                  {Array(3)
                    .fill("")
                    .map((el, i) => (
                      <p className="text-sm flex items-center gap-1" key={i}>
                        <span className="text-green-500">
                          <LocalOfferIcon sx={{ fontSize: "20px" }} />
                        </span>
                        <span className="font-medium ml-2">Bank Offer</span> 15%
                        Instant discount on first Flipkart Pay Later order of
                        500 and above{" "}
                        <Link className="text-blue-600 font-medium" to="/">
                          T&C
                        </Link>
                      </p>
                    ))}
                  {/* <!-- banks offers --> */}

                  {/* <!-- warranty & brand --> */}
                  <div className="flex gap-8 mt-2 items-center text-sm">
                    <img
                      draggable="false"
                      className="w-20 h-8 p-0.5 border object-contain"
                      src={product?.brand?.logo.url}
                      alt={product?.brand && product.brand?.name}
                    />
                    <span>
                      {product?.warranty} Year Warranty{" "}
                      <Link className="font-medium text-blue-600" to="/">
                        Know More
                      </Link>
                    </span>
                  </div>
                  {/* <!-- warranty & brand --> */}

                  {/* <!-- delivery details --> */}
                  <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                    <p className="text-gray-500">Delivery</p>
                    <span>Delivery by {getDeliveryDate()}</span>
                  </div>
                  {/* <!-- delivery details --> */}

                  {/* <!-- highlights & services details --> */}
                  <div className="flex flex-col sm:flex-row justify-between">
                    {/* <!-- highlights details --> */}
                    <div className="flex gap-16 mt-4 items-stretch text-sm">
                      <p className="text-gray-500 font-medium">Highlights</p>

                      <ul className="list-disc flex flex-col gap-2 w-64">
                        {product?.highlights.map((highlight, i) => (
                          <li key={i}>
                            <p>{highlight}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* <!-- highlights details --> */}

                    {/* <!-- services details --> */}
                    <div className="flex gap-16 mt-4 mr-6 items-stretch text-sm">
                      <p className="text-gray-500 font-medium">Services</p>
                      <ul className="flex flex-col gap-2">
                        <li>
                          <p className="flex items-center gap-3">
                            <span className="text-blue-600">
                              <VerifiedUserIcon sx={{ fontSize: "18px" }} />
                            </span>{" "}
                            {product?.warranty} Year
                          </p>
                        </li>
                        <li>
                          <p className="flex items-center gap-3">
                            <span className="text-blue-600">
                              <CachedIcon sx={{ fontSize: "18px" }} />
                            </span>{" "}
                            7 Days Replacement Policy
                          </p>
                        </li>
                        <li>
                          <p className="flex items-center gap-3">
                            <span className="text-blue-600">
                              <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />
                            </span>{" "}
                            Cash on Delivery available
                          </p>
                        </li>
                      </ul>
                    </div>
                    {/* <!-- services details --> */}
                  </div>
                  {/* <!-- highlights & services details --> */}

                  {/* <!-- seller details --> */}
                  <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                    <p className="text-gray-500">Seller</p>
                    <Link className="font-medium text-blue-600 ml-3" to="/">
                      {product?.brand && product.brand?.name}
                    </Link>
                  </div>
                  {/* <!-- seller details --> */}

                  {/* <!-- flipkart plus banner --> */}
                  <div className="sm:w-1/2 mt-4 border">
                    <img
                      draggable="false"
                      className="w-full h-full object-contain"
                      src="https://rukminim1.flixcart.com/lockin/763/305/images/promotion_banner_v2_active.png"
                      alt=""
                    />
                  </div>
                  {/* <!-- flipkart plus banner --> */}

                  {/* <!-- description details --> */}
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                    <p className="text-gray-500 font-medium">Description</p>
                    <span>{product?.description}</span>
                  </div>
                  {/* <!-- description details --> */}

                  {/* <!-- border box --> */}
                  <div className="w-full mt-6 rounded-sm border flex flex-col">
                    <h1 className="px-6 py-4 border-b text-2xl font-medium">
                      Product Description
                    </h1>
                    <div className="p-6">
                      <p className="text-sm">{product?.description}</p>
                    </div>
                  </div>
                  {/* <!-- border box --> */}

                  {/* <!-- specifications border box --> */}
                  <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                    <h1 className="px-6 py-4 border-b text-2xl font-medium">
                      Specifications
                    </h1>
                    <h1 className="px-6 py-3 text-lg">General</h1>

                    {/* <!-- specs list --> */}
                    {product?.specifications?.map((spec, i) => (
                      <div
                        className="px-6 py-2 flex items-center text-sm"
                        key={i}>
                        <p className="text-gray-500 w-3/12">{spec?.title}</p>
                        <p className="flex-1">{spec?.description}</p>
                      </div>
                    ))}
                    {/* <!-- specs list --> */}
                  </div>
                  {/* <!-- specifications border box --> */}

                  {/* <!-- reviews border box --> */}
                  <div className="w-full mt-4 rounded-sm border flex flex-col">
                    <div className="flex justify-between items-center border-b px-6 py-4">
                      <h1 className="text-2xl font-medium">
                        Ratings & Reviews
                      </h1>
                      <button
                        onClick={handleDialogClose}
                        className="shadow bg-yellow-500 text-white px-4 py-2 rounded-sm hover:shadow-lg">
                        Rate Product
                      </button>
                    </div>

                    <Dialog
                      aria-labelledby="review-dialog"
                      open={open}
                      onClose={handleDialogClose}>
                      <DialogTitle className="border-b">
                        Submit Review
                      </DialogTitle>
                      <DialogContent className="flex flex-col m-1 gap-4">
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large"
                          precision={0.5}
                        />
                        <TextField
                          label="Review"
                          multiline
                          rows={3}
                          sx={{ width: 400 }}
                          size="small"
                          variant="outlined"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <button
                          onClick={handleDialogClose}
                          className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase">
                          Cancel
                        </button>
                        <button
                          onClick={reviewSubmitHandler}
                          className="py-2 px-6 rounded bg-green-600 hover:bg-green-700 text-white shadow uppercase">
                          Submit
                        </button>
                      </DialogActions>
                    </Dialog>

                    <div className="flex items-center border-b">
                      <h1 className="px-6 py-3 text-3xl font-semibold">
                        {product?.ratings && product?.ratings.toFixed(1)}
                        <StarIcon />
                      </h1>
                      <p className="text-lg text-gray-500">
                        ({product?.numOfReviews}) Reviews
                      </p>
                    </div>

                    {viewAll
                      ? product?.reviews
                          ?.map((rev, i) => (
                            <div
                              className="flex flex-col gap-2 py-4 px-6 border-b"
                              key={i}>
                              <Rating
                                name="read-only"
                                value={rev.rating}
                                readOnly
                                size="small"
                                precision={0.5}
                              />
                              <p>{rev.comment}</p>
                              <span className="text-sm text-gray-500">
                                by {rev.name}
                              </span>
                            </div>
                          ))
                          .reverse()
                      : product?.reviews
                          ?.slice(-3)
                          .map((rev, i) => (
                            <div
                              className="flex flex-col gap-2 py-4 px-6 border-b"
                              key={i}>
                              <Rating
                                name="read-only"
                                value={rev.rating}
                                readOnly
                                size="small"
                                precision={0.5}
                              />
                              <p>{rev.comment}</p>
                              <span className="text-sm text-gray-500">
                                by {rev.name}
                              </span>
                            </div>
                          ))
                          .reverse()}
                    {product?.reviews?.length > 3 && (
                      <button
                        onClick={() => setViewAll(!viewAll)}
                        className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-blue-400 text-white">
                        {viewAll ? "View Less" : "View All"}
                      </button>
                    )}
                  </div>
                  {/* <!-- reviews border box --> */}
                </div>
              </div>
              {/* <!-- product desc wrapper --> */}
            </div>
            {/* <!-- product image & description container --> */}

            {/* Sliders */}
            <div className="flex flex-col gap-3 mt-6">
              <ProductSlider
                title={"Similar Products"}
                tagline={"Based on the category"}
              />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetails;
