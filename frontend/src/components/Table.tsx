import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { User } from "../api/User";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { availableRoutes } from "../routes/availableRoutes";
import { useNavigate } from "react-router";
import { useMemo } from "react";

export default function Table({
  type,
  rows,
  isAdmin,
  deleteHandler,
  downloadHandler,
}: {
  type: "users" | "activity";
  rows: User[] | User["activity"];
  isAdmin?: boolean;
  deleteHandler?: (id: string) => void;
  downloadHandler: (id: string) => void;
}) {
  const navigate = useNavigate();

  const columns: GridColDef[] = useMemo(
    () =>
      type === "users"
        ? [
            { field: "name", headerName: "Name", width: 400 },
            { field: "email", headerName: "Email", width: 350 },
            { field: "role", headerName: "Role", width: 150 },
            {
              field: "activity",
              headerName: "Actions",
              width: 100,
              renderCell: (params) => {
                const userId = params.row.id;
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      color="success"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadHandler(userId);
                      }}
                    >
                      <SimCardDownloadIcon />
                    </IconButton>
                    {isAdmin && deleteHandler && (
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHandler(userId);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>
                );
              },
            },
          ]
        : [
            { field: "action", headerName: "Action", width: 150 },
            {
              field: "createdAt",
              headerName: "Date",
              width: 200,
              renderCell: (params) => new Date(params.row.createdAt).toDateString(),
            },
            { field: "updatedField", headerName: "Updated Field", width: 200 },
            {
              field: "status",
              headerName: "Status",
              width: 150,
            },
          ],
    [isAdmin, deleteHandler, downloadHandler]
  );
  return (
    <Paper sx={{ height: "100%", width: type === "users" ? 1000 : 700 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        disableColumnFilter
        disableColumnMenu
        disableColumnSorting
        disableColumnResize
        sx={{ border: 0 }}
        onRowClick={(params) => {
          const userId = params.row.id;
          type === "users" ? navigate(`${availableRoutes.DASHBOARD}/${userId}`) : null;
        }}
      />
    </Paper>
  );
}
