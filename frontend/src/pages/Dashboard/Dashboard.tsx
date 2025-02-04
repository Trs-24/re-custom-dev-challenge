import styles from "./Dashboard.module.scss";
import { useCallback, useEffect, useState } from "react";
import { User } from "../../api/User";
import { reportService, userService } from "../../api/services";
import useAuthorization from "../../hooks/useAuthorization";
import Table from "../../components/Table";
import { Button, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeAccessToken } from "../../utils/storageHandlers";
import { useNavigate } from "react-router";
import { availableRoutes } from "../../routes/availableRoutes";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);

  const { isAuthorized, isAdmin, userId, setIsAuthorized } = useAuthorization();

  const navigate = useNavigate();

  const fetchUsers = useCallback(() => {
    if (!isAuthorized || !userId) return;

    if (isAdmin) {
      userService.getAll().then(setUsers);
    } else {
      userService.getOne(userId).then((userWithStatistics) => setUsers([userWithStatistics.user]));
    }
  }, [isAuthorized, isAdmin, userId]);

  const downloadReport = useCallback((id: string) => {
    reportService.download(id).then((res) => {
      const { headers, data } = res;

      const fileName = headers["content-disposition"]?.split("filename=")[1];
      const fileURL = URL.createObjectURL(data);

      const alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = fileName;
      alink.click();
      URL.revokeObjectURL(fileURL);
    });
  }, []);

  const deleteUser = useCallback(
    (id: string) => {
      userService.delete(id).then(() => fetchUsers());
    },
    [fetchUsers]
  );

  const logoutHandler = useCallback(() => {
    removeAccessToken();
    setIsAuthorized(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, isAuthorized]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <IconButton sx={{ position: "absolute", top: -40, right: 40 }} onClick={logoutHandler}>
          <LogoutIcon sx={{ color: "white" }} />
        </IconButton>
        <div className={styles.text}>Dashboard</div>
        {isAdmin && (
          <Button
            startIcon={<PersonAddAltIcon />}
            onClick={() => navigate(availableRoutes.ADD_USER)}
          >
            Add user
          </Button>
        )}
        <div className={styles.users}>
          <Table
            type="users"
            rows={users}
            isAdmin={isAdmin}
            downloadHandler={downloadReport}
            deleteHandler={isAdmin ? deleteUser : undefined}
          />
        </div>
      </div>
    </div>
  );
}
