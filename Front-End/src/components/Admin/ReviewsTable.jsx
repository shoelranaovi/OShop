// import { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
// import { useDispatch, useSelector } from 'react-redux';
// import { useSnackbar } from 'notistack';
// import { clearErrors, deleteReview, getAllReviews } from '../../actions/productAction';
import Rating from "@mui/material/Rating";
import Actions from "./Actions";
// import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import MetaData from "../Layout/MetaData";
import BackdropLoader from "../Layout/BackdropLoader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReview } from "@/Redux/postSlice";

const ReviewsTable = () => {
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();
  const [productId, setProductId] = useState("");
  console.log(productId);

  const { reviews } = useSelector((state) => state.post);
  // const { loading, isDeleted, error: deleteError } = useSelector((state) => state.review);
  const isLoading = false;
  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getReview(productId));
    }
  }, [dispatch, productId]);

  const deleteReviewHandler = (id, setOpen) => {
    dispatch(deleteReview({ id, productId }));
    setOpen(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 200,
      flex: 0.3,
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
      field: "comment",
      headerName: "Comment",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Actions
            deleteHandler={deleteReviewHandler}
            editRoute={"review"}
            id={params.row.id}
          />
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((rev) => {
      rows.push({
        id: rev._id,
        rating: rev.rating,
        comment: rev.comment,
        user: rev.name,
      });
    });

  return (
    <>
      <MetaData title="Admin Reviews | Flipkart" />

      {isLoading && <BackdropLoader />}
      <div className="flex justify-between items-center gap-2 sm:gap-12">
        <h1 className="text-lg font-medium uppercase">reviews</h1>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="outline-none border-0 rounded p-2 w-full shadow hover:shadow-lg"
        />
      </div>
      <div
        className="bg-white rounded-xl shadow-lg w-full"
        style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
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

export default ReviewsTable;
