import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
// import { useDispatch, useSelector } from 'react-redux';
// import { useSnackbar } from 'notistack';
import { Link } from "react-router-dom";
// import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction';
import Rating from "@mui/material/Rating";
// import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
// import Actions from './Actions';
import MetaData from "../Layout/MetaData";
import BackdropLoader from "../Layout/BackdropLoader";
import Actions from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import { allPostAdmin, deleteproduct } from "@/Redux/postSlice";
import { useSnackbar } from "notistack";

const ProductTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getallProduct = async () => {
      try {
        const data = await dispatch(allPostAdmin()).unwrap();
        if (data.success) {
          console.log("Admin post reactivated successfully");
          console.log(data);
        } else {
          console.log("Admin reactivation failed");
        }
      } catch (error) {
        console.error("User verification failed:", error);
      }
    };

    getallProduct();
  }, [dispatch]);

  // const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { AdminAllpost, isLoading } = useSelector((state) => state.post);

  const deleteProductHandler = (id, setopen) => {
    dispatch(deleteproduct(id))
      .then((data) => {
        if (data.payload.success) {
          console.log("Product deleted successfully");
          enqueueSnackbar("Product Delete Successfully", {
            variant: "success",
          });

          setopen(false);
        } else {
          enqueueSnackbar("Product deletion failed", {
            variant: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Product deletion failed:", error);
        enqueueSnackbar("Product deletion failed", {
          variant: "error",
        });
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full">
              <img
                draggable="false"
                src={params.row.image}
                alt={params.row.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 70,
      flex: 0.1,
      renderCell: (params) => {
        return (
          <div className="  flex justify-center items-center w-full h-full">
            {params.row.stock < 10 ? (
              <span className="font-medium text-red-700 rounded-full bg-red-200 p-1 w-6 h-6 flex  items-center justify-center">
                {params.row.stock}
              </span>
            ) : (
              <span className="">{params.row.stock}</span>
            )}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      headerAlign: "left",
      align: "left",
      flex: 0.2,
      renderCell: (params) => {
        return <span>₹{params.row.price.toLocaleString()}</span>;
      },
    },
    {
      field: "cprice",
      headerName: "Cutted Price",
      type: "number",
      minWidth: 100,
      headerAlign: "left",
      align: "left",
      flex: 0.2,
      renderCell: (params) => {
        return <span>₹{params.row.cprice.toLocaleString()}</span>;
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <Rating
            readOnly
            value={params.row.rating}
            size="small"
            precision={0.5}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Actions
            editRoute={"product"}
            deleteHandler={deleteProductHandler}
            id={params.row.id}
          />
        );
      },
    },
  ];

  const rows = [];

  AdminAllpost &&
    AdminAllpost.forEach((item) => {
      rows.unshift({
        id: item._id,
        name: item.name,
        image: item?.images[0]?.url,
        category: item.category,
        stock: item.stock,
        price: item.price,
        cprice: item.cuttedPrice,
        rating: item.ratings,
      });
    });

  return (
    <>
      <MetaData title="Admin Products | Flipkart" />

      {isLoading && <BackdropLoader />}

      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium uppercase">products</h1>
        <Link
          to="/admin/new_product"
          className="py-2 px-4 rounded shadow font-medium text-white bg-blue-600 hover:shadow-lg">
          New Product
        </Link>
      </div>
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

export default ProductTable;
