import { Doughnut, Line, Pie, Bar } from "react-chartjs-2";
// import { getAdminProducts } from '../../actions/productAction';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllOrders } from '../../actions/orderAction';
// import { getAllUsers } from '../../actions/userAction';
import { categories } from "../../utils/constants";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";

const MainData = () => {
  // const dispatch = useDispatch();

  const { products } = useSelector((state) => state.post);
  const { orders } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.auth);
  //   const products = [
  //     { id: 1, name: "iPhone 13", category: "Electronics", stock: 5 },
  //     { id: 2, name: "Samsung Galaxy S22", category: "Electronics", stock: 0 },
  //     { id: 3, name: "Sony Headphones", category: "Accessories", stock: 8 },
  //     { id: 4, name: "Nike Shoes", category: "Fashion", stock: 12 },
  //     { id: 5, name: "Adidas Jacket", category: "Fashion", stock: 3 },
  //   ];

  //   const orders = [
  //     {
  //       id: 1,
  //       totalPrice: 5000,
  //       orderStatus: "Processing",
  //       createdAt: "2024-01-15",
  //     },
  //     {
  //       id: 2,
  //       totalPrice: 12000,
  //       orderStatus: "Shipped",
  //       createdAt: "2024-02-20",
  //     },
  //     {
  //       id: 3,
  //       totalPrice: 8000,
  //       orderStatus: "Delivered",
  //       createdAt: "2024-02-25",
  //     },
  //     {
  //       id: 4,
  //       totalPrice: 6500,
  //       orderStatus: "Processing",
  //       createdAt: "2024-03-05",
  //     },
  //     {
  //       id: 5,
  //       totalPrice: 15000,
  //       orderStatus: "Delivered",
  //       createdAt: "2024-03-10",
  //     },
  //   ];
  //   const users = [
  //     { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
  //     { id: 2, name: "Jane Smith", email: "jane@example.com", role: "customer" },
  //     {
  //       id: 3,
  //       name: "Michael Brown",
  //       email: "michael@example.com",
  //       role: "seller",
  //     },
  //     {
  //       id: 4,
  //       name: "Alice Johnson",
  //       email: "alice@example.com",
  //       role: "customer",
  //     },
  //     {
  //       id: 5,
  //       name: "David Wilson",
  //       email: "david@example.com",
  //       role: "customer",
  //     },
  //   ];

  let outOfStock = 0;
  console.log(outOfStock);

  products?.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1;
    }
  });

  // useEffect(() => {
  //     dispatch(getAdminProducts());
  //     dispatch(getAllOrders());
  //     dispatch(getAllUsers());
  // }, [dispatch]);

  let totalAmount = orders?.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const lineState = {
    labels: months,
    datasets: [
      {
        label: `Sales in ${date.getFullYear() - 2}`,
        borderColor: "#8A39E1",
        backgroundColor: "#8A39E1",
        data: months.map((m, i) =>
          orders
            ?.filter(
              (od) =>
                new Date(od.createdAt).getMonth() === i &&
                new Date(od.createdAt).getFullYear() === date.getFullYear() - 2
            )
            .reduce((total, od) => total + od.totalPrice, 0)
        ),
      },
      {
        label: `Sales in ${date.getFullYear() - 1}`,
        borderColor: "orange",
        backgroundColor: "orange",
        data: months.map((m, i) =>
          orders
            ?.filter(
              (od) =>
                new Date(od.createdAt).getMonth() === i &&
                new Date(od.createdAt).getFullYear() === date.getFullYear() - 1
            )
            .reduce((total, od) => total + od.totalPrice, 0)
        ),
      },
      {
        label: `Sales in ${date.getFullYear()}`,
        borderColor: "#4ade80",
        backgroundColor: "#4ade80",
        data: months.map((m, i) =>
          orders
            ?.filter(
              (od) =>
                new Date(od.createdAt).getMonth() === i &&
                new Date(od.createdAt).getFullYear() === date.getFullYear()
            )
            .reduce((total, od) => total + od.totalPrice, 0)
        ),
      },
    ],
  };

  const statuses = ["Processing", "Shipped", "Delivered"];

  const pieState = {
    labels: statuses,
    datasets: [
      {
        backgroundColor: ["#9333ea", "#facc15", "#4ade80"],
        hoverBackgroundColor: ["#a855f7", "#fde047", "#86efac"],
        data: statuses.map(
          (status) =>
            orders?.filter((item) => item.orderStatus === status).length
        ),
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#ef4444", "#22c55e"],
        hoverBackgroundColor: ["#dc2626", "#16a34a"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  const barState = {
    labels: categories,
    datasets: [
      {
        label: "Products",
        borderColor: "#9333ea",
        backgroundColor: "#9333ea",
        hoverBackgroundColor: "#6b21a8",
        data: categories.map(
          (cat) => products?.filter((item) => item.category === cat).length
        ),
      },
    ],
  };

  return (
    <>
      <MetaData title="Admin Dashboard | Flipkart" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
        <div className="flex flex-col bg-purple-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
          <h4 className="text-gray-100 font-medium">Total Sales Amount</h4>
          <h2 className="text-2xl font-bold">
            ₹{totalAmount?.toLocaleString()}
          </h2>
        </div>
        <div className="flex flex-col bg-red-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
          <h4 className="text-gray-100 font-medium">Total Orders</h4>
          <h2 className="text-2xl font-bold">{orders?.length}</h2>
        </div>
        <div className="flex flex-col bg-yellow-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
          <h4 className="text-gray-100 font-medium">Total Products</h4>
          <h2 className="text-2xl font-bold">{products?.length}</h2>
        </div>
        <div className="flex flex-col bg-green-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
          <h4 className="text-gray-100 font-medium">Total Users</h4>
          <h2 className="text-2xl font-bold">{users?.length}</h2>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full">
        <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">
          <Line data={lineState} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <span className="font-medium uppercase text-gray-800">
            Order Status
          </span>
          <Pie data={pieState} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full mb-6">
        <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">
          <Bar data={barState} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <span className="font-medium uppercase text-gray-800">
            Stock Status
          </span>
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </>
  );
};

export default MainData;
