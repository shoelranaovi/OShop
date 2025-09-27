/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Import banner images
import gadgetSale from "../../../assets/images/Banners/gadget-sale.jpg";
import kitchenSale from "../../../assets/images/Banners/kitchen-sale.jpg";
import poco from "../../../assets/images/Banners/poco-m4-pro.webp";
import realme from "../../../assets/images/Banners/realme-9-pro.webp";
import fashionSale from "../../../assets/images/Banners/fashionsale.jpg";
import oppo from "../../../assets/images/Banners/oppo-reno7.webp";

// Arrow Buttons
export const PreviousBtn = ({ className, onClick }) => (
  <div className={`${className} slick-prev`} onClick={onClick}>
    <ArrowBackIosIcon />
  </div>
);

export const NextBtn = ({ className, onClick }) => (
  <div className={`${className} slick-next`} onClick={onClick}>
    <ArrowForwardIosIcon />
  </div>
);

// ✅ Props Validation for Buttons
PreviousBtn.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

NextBtn.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

// Banner Component
const Banner = ({
  banners = [gadgetSale, kitchenSale, poco, fashionSale, realme, oppo],
}) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  return (
    <section className="h-44 sm:h-72 w-full rounded-sm shadow relative overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <img
            key={index}
            draggable="false"
            className="h-44 sm:h-72 w-full object-cover"
            src={banner}
            alt={`banner-${index}`}
          />
        ))}
      </Slider>
    </section>
  );
};

// ✅ Props Validation for Banner Component
Banner.propTypes = {
  banners: PropTypes.arrayOf(PropTypes.string),
};

// ✅ Default Props (If No Props are Passed)
// Banner.defaultProps = {
//   banners: [gadgetSale, kitchenSale, poco, fashionSale, realme, oppo],
// };

export default Banner;
