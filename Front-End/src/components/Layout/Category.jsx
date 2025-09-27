import { Link } from "react-router-dom";
import mobiles from "../../assets/images/Categories/phone.png";
import fashion from "../../assets/images/Categories/fashion.png";
import electronics from "../../assets/images/Categories/electronics.png";
import home from "../../assets/images/Categories/home.png";
import travel from "../../assets/images/Categories/travel.png";
import appliances from "../../assets/images/Categories/appliances.png";
import furniture from "../../assets/images/Categories/furniture.png";
import beauty from "../../assets/images/Categories/beauty.png";
import grocery from "../../assets/images/Categories/grocery.png";
import { memo } from "react";

const categories = [
    { name: "Mobiles", icon: mobiles },
    { name: "Fashion", icon: fashion },
    { name: "Electronics", icon: electronics },
    { name: "Home", icon: home },
    { name: "Travel", icon: travel },
    { name: "Appliances", icon: appliances },
    { name: "Furniture", icon: furniture },
    { name: "Beauty, Toys & More", icon: beauty },
    { name: "Grocery", icon: grocery },
];

const Categories = () => {
    return (
        <section className="hidden sm:block bg-white mt-10 mb-4 w-full px-12 py-2 shadow-lg rounded-md">
            <div className="flex items-center justify-between mt-4 space-x-4">
                {categories.map((category) => (
                    <Link 
                        to={`/products?category=${encodeURIComponent(category.name)}`} 
                        className="flex flex-col items-center p-2 group transition-transform duration-200 hover:scale-105" 
                        key={category.name}
                    >
                        <div className="h-16 w-16">
                            <img 
                                draggable="false" 
                                className="h-full w-full object-contain rounded-md" 
                                src={category.icon} 
                                alt={`${category.name} category`} 
                            />
                        </div>
                        <span className="text-sm text-gray-800 font-medium group-hover:text-blue-600">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default memo(Categories);
