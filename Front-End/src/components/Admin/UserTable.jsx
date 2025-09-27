import { DataGrid } from "@mui/x-data-grid";
import Actions from "./Actions";
import MetaData from "../Layout/MetaData";
import BackdropLoader from "../Layout/BackdropLoader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { allUserAdmin, deleteUser } from "@/Redux/AuthSlice";

const UserTable = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { users, isLoading } = useSelector((state) => state.auth);
  //     const { loading, isDeleted, error: deleteError } = useSelector((state) => state.profile);

  const deleteUserHandler = (id, setopen) => {
    dispatch(deleteUser(id))
      .then((data) => {
        if (data.payload.success) {
          console.log("user deleted successfully");
          enqueueSnackbar("user Delete Successfully", {
            variant: "success",
          });

          setopen(false);
        } else {
          enqueueSnackbar("user deletion failed", {
            variant: "error",
          });
        }
      })
      .catch((error) => {
        console.error("user deletion failed:", error);
        enqueueSnackbar("user deletion failed", {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    const getAlluser = async () => {
      try {
        const data = await dispatch(allUserAdmin()).unwrap();
        if (data.success) {
          console.log("Admin user reactivated successfully");
          console.log(data);
        } else {
          console.log("Admin reactivation failed");
        }
      } catch (error) {
        console.error("User verification failed:", error);
      }
    };

    getAlluser();
  }, [dispatch]);
  const columns = [
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
                src={params.row.avatar}
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
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.2,
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            {params.row.role === "admin" ? (
              <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800 capitalize">
                {params.row.role}
              </span>
            ) : (
              <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800 capitalize">
                {params.row.role}
              </span>
            )}
          </>
        );
      },
    },
    {
      field: "registeredOn",
      headerName: "Registered On",
      // type: "date",
      minWidth: 150,
      flex: 0.2,
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Actions
            editRoute={"user"}
            id={params.row.id}
            deleteHandler={deleteUserHandler}
            name={params.row.name}
          />
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.unshift({
        id: item?._id,
        name: item?.name,
        avatar: item?.avatar?.url,
        email: item?.email,
        gender: item?.gender?.toUpperCase(),
        role: item?.role,
        registeredOn:
          item?.createdAt && !isNaN(new Date(item.createdAt))
            ? new Date(item.createdAt).toISOString().split("T")[0]
            : "N/A",
      });
    });

  return (
    <>
      <MetaData title="Admin Users | Flipkart" />

      {isLoading && <BackdropLoader />}

      <h1 className="text-lg font-medium uppercase">users</h1>
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

export default UserTable;
