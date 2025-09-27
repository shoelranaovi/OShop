// src/utils/chartConfig.js

export const getLineChartData = (orders) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
  
    return {
      labels: months,
      datasets: [0, 1, 2].map((offset) => {
        const year = currentYear - (2 - offset);
        const color = ["#8A39E1", "orange", "#4ade80"][offset];
        return {
          label: `Sales in ${year}`,
          borderColor: color,
          backgroundColor: color,
          data: months.map((_, i) =>
            orders
              ?.filter(
                (order) =>
                  new Date(order.createdAt).getMonth() === i &&
                  new Date(order.createdAt).getFullYear() === year
              )
              .reduce((total, od) => total + od.totalPrice, 0)
          ),
        };
      }),
    };
  };
  
  export const getPieChartData = (orders) => {
    const statuses = ["Processing", "Shipped", "Delivered"];
    return {
      labels: statuses,
      datasets: [
        {
          backgroundColor: ["#9333ea", "#facc15", "#4ade80"],
          hoverBackgroundColor: ["#a855f7", "#fde047", "#86efac"],
          data: statuses.map(
            (status) => orders?.filter((item) => item.orderStatus === status).length
          ),
        },
      ],
    };
  };
  
  export const getDoughnutChartData = (products) => {
    const outOfStock = products?.reduce(
      (acc, item) => acc + (item.stock === 0 ? 1 : 0),
      0
    );
  
    return {
      labels: ["Out of Stock", "In Stock"],
      datasets: [
        {
          backgroundColor: ["#ef4444", "#22c55e"],
          hoverBackgroundColor: ["#dc2626", "#16a34a"],
          data: [outOfStock, products?.length - outOfStock],
        },
      ],
    };
  };
  
  export const getBarChartData = (products, categories) => {
    return {
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
  };
  