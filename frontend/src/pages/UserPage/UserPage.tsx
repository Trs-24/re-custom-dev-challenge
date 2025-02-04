import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import styles from "./UserPage.module.scss";
import { useCallback, useEffect, useState } from "react";
import { User, UserRole } from "../../api/User";
import { reportService, userService } from "../../api/services";
import useAuthorization from "../../hooks/useAuthorization";
import DataTable from "../../components/Table";
import { useNavigate, useParams } from "react-router";
import { availableRoutes } from "../../routes/availableRoutes";
import BarChart from "../../components/BarChart";

export default function UserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);
  const [activity, setActivity] = useState<User["activity"]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [totalLogins, setTotalLogins] = useState(0);
  const [totalDownloads, setTotalDownloads] = useState(0);

  const { isAuthorized, isAdmin } = useAuthorization();

  const navigate = useNavigate();

  const { id } = useParams();

  const fetchUser = useCallback(() => {
    if (!isAuthorized || !id) return;

    userService.getOne(id).then((userWithStatistics) => {
      const user = userWithStatistics.user;
      setTotalDownloads(userWithStatistics.totalDownloads);
      setTotalLogins(userWithStatistics.totalLogins);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setActivity(user.activity);
      setUser(user);
    });
  }, [isAuthorized, isAdmin, id]);

  const downloadReport = useCallback(() => {
    if (!isAuthorized || !id) return;
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
  }, [id, isAuthorized]);

  const deleteUser = useCallback(() => {
    if (!isAuthorized || !id || !isAdmin) return;
    userService.delete(id).then(() => navigate(availableRoutes.DASHBOARD));
  }, [isAuthorized, isAdmin, id, navigate]);

  const saveHandler = useCallback(() => {
    setIsEditing(false);

    if (!isAuthorized || !id) return;
    const userToUpdate: Partial<User> = {};

    if (name && name !== user?.name) userToUpdate.name = name;
    if (email && email !== user?.email) userToUpdate.email = email;
    if (role && role !== user?.role) userToUpdate.role = role;

    if (Object.keys(userToUpdate).length === 0) return;
    userService.update(id, userToUpdate).then(fetchUser);
  }, [user, isAuthorized, isAdmin, id, name, email, role, fetchUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.text}>
          <IconButton onClick={() => navigate(availableRoutes.DASHBOARD)}>
            <ArrowBackIosIcon sx={{ color: "#fff" }} />
          </IconButton>
          UserPage
        </div>
        <div className={styles.user}>
          {isEditing ? (
            <div className={styles.user_edit}>
              <TextField
                data-testid="edit-user-name"
                label="Name"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  "& .MuiFilledInput-root": { color: "#fff" },
                  "& .MuiFormLabel-root": { color: "#fff" },
                }}
              />
              <TextField
                data-testid="edit-user-email"
                label="Email"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiFilledInput-root": { color: "#fff" },
                  "& .MuiFormLabel-root": { color: "#fff" },
                }}
              />
              {isAdmin && (
                <FormControl
                  fullWidth
                  sx={{
                    "& .MuiSelect-select": { color: "#fff" },
                    "& .MuiFormLabel-root": { color: "#fff" },
                  }}
                >
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role-select"
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    variant="filled"
                  >
                    <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                    <MenuItem value={UserRole.USER}>User</MenuItem>
                  </Select>
                </FormControl>
              )}
              <Button startIcon={<SaveIcon />} onClick={saveHandler}>
                Save changes
              </Button>
            </div>
          ) : (
            <div className={styles.user_info}>
              <div>Name: {user?.name}</div>
              <div>Email: {user?.email}</div>
              <div>Role: {user?.role}</div>
              <Button
                data-testid="edit-user-button"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
              >
                Edit user data
              </Button>
            </div>
          )}
        </div>
        <div className={styles.chart}>
          <h3>Statistic</h3>
          <BarChart downloads={totalDownloads} logins={totalLogins} />
        </div>
        <div className={styles.activity}>
          <h3>Recent activity</h3>
          <DataTable
            type="activity"
            rows={activity}
            isAdmin={isAdmin}
            downloadHandler={downloadReport}
            deleteHandler={isAdmin ? deleteUser : undefined}
          />
        </div>
      </div>
    </div>
  );
}
