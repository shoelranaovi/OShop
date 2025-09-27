import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
// import { useDispatch, useSelector } from 'react-redux';
// import { useSnackbar } from 'notistack';
// import { clearErrors, deleteOrder, getAllOrders } from '../../actions/orderAction';
// import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
// import Actions from './Actions';
import { formatDate } from "../../utils/functions";
import MetaData from "../Layout/MetaData";
import BackdropLoader from "../Layout/BackdropLoader";
import Actions from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getAllOrder } from "@/Redux/orderSlice";

const OrderTable = () => {
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();

  const { orders, isLoading } = useSelector((state) => state.order);
  // const { loading, isDeleted, error: deleteError } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  const deleteOrderHandler = (id, setClose) => {
    dispatch(deleteOrder(id));
    setClose(false);
  };

  // const columns = [
  //   {
  //     field: "id",
  //     headerName: "Order ID",
  //     minWidth: 200,
  //     flex: 1,
  //   },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     minWidth: 150,
  //     flex: 0.2,
  //     renderCell: (params) => {
  //       return (
  //         <>
  //           {params.row.status === "Delivered" ? (
  //             <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800">
  //               {params.row.status}
  //             </span>
  //           ) : params.row.status === "Shipped" ? (
  //             <span className="text-sm bg-yellow-100 p-1 px-2 font-medium rounded-full text-yellow-800">
  //               {params.row.status}
  //             </span>
  //           ) : (
  //             <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800">
  //               {params.row.status}
  //             </span>
  //           )}
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     field: "itemsQty",
  //     headerName: "Items Qty",
  //     type: "number",
  //     minWidth: 100,
  //     flex: 0.1,
  //   },
  //   {
  //     field: "amount",
  //     headerName: "Amount",
  //     type: "number",
  //     minWidth: 200,
  //     flex: 0.2,
  //     renderCell: (params) => {
  //       return <span>₹{params.row.amount.toLocaleString()}</span>;
  //     },
  //   },
  //   {
  //     field: "orderOn",
  //     headerName: "Order On",
  //     type: "date",
  //     minWidth: 200,
  //     flex: 0.5,
  //   },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     minWidth: 100,
  //     flex: 0.3,
  //     type: "number",
  //     sortable: false,
  //     renderCell: (params) => {
  //       return (
  //         <Actions
  //           deleteHandler={deleteOrderHandler}
  //           editRoute={"order"}
  //           id={params.row.id}
  //         />
  //       );
  //     },
  //   },
  // ];

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "Delivered" ? (
              <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800">
                {params.row.status}
              </span>
            ) : params.row.status === "Shipped" ? (
              <span className="text-sm bg-yellow-100 p-1 px-2 font-medium rounded-full text-yellow-800">
                {params.row.status}
              </span>
            ) : (
              <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800">
                {params.row.status}
              </span>
            )}
          </>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 200,
      flex: 0.2,
      renderCell: (params) => (
        <span>₹{params.row.amount.toLocaleString()}</span>
      ),
    },
    {
      field: "orderOn",
      headerName: "Order On",
      type: "date",
      minWidth: 200,
      flex: 0.5,
      valueGetter: (params) => {
        if (!params.row?.orderOn) return null;
        console.log(new Date(params.row.orderOn));
        // 🔥 যদি `orderOn` না থাকে, তাহলে `null` রিটার্ন করবো
        return new Date(params.row.orderOn); // 🔥 Date ফরম্যাটে কনভার্ট করলাম
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Actions
            deleteHandler={deleteOrderHandler}
            editRoute={"order"}
            id={params.row.id}
          />
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((order) => {
      rows.unshift({
        id: order._id,
        itemsQty: order.orderItems.length,
        amount: order.totalPrice,
        orderOn: formatDate(order.createdAt),
        status: order.orderStatus,
      });
    });

  return (
    <>
      <MetaData title="Admin Orders | Flipkart" />

      {isLoading && <BackdropLoader />}

      <h1 className="text-lg font-medium uppercase">orders</h1>
      <div
        className="bg-white rounded-xl shadow-lg w-full"
        style={{ height: 470 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectIconOnClick
          sx={{
            boxShadow: 0,
            border: 0,
          }}
        />
      </div>
    </>
  );
};

export default OrderTable;
