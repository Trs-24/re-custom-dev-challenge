import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import styles from "./AddUser.module.scss";
import { availableRoutes } from "../../routes/availableRoutes";
import { useCallback, useEffect, useState } from "react";
import { warningToast } from "../../utils/toastHandlers";
import { authService } from "../../api/services";
import useAuthorization from "../../hooks/useAuthorization";
import { UserRole } from "../../api/User";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);

  const navigate = useNavigate();

  const { isAdmin } = useAuthorization();

  const registrationHandler = useCallback(() => {
    if (name && email && password && validator.isEmail(email) && role) {
      authService.register({ name, email, password, role }).then(({ access_token }) => {
        if (access_token) {
          navigate(availableRoutes.DASHBOARD);
        }
      });
    } else {
      warningToast("Invalid user data");
    }
  }, [email, password, role, name]);

  useEffect(() => {
    if (!isAdmin) navigate(availableRoutes.DASHBOARD);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.text}>
          <IconButton onClick={() => navigate(availableRoutes.DASHBOARD)}>
            <ArrowBackIosIcon sx={{ color: "#fff" }} />
          </IconButton>
          Add User
        </div>
        <div className={styles.inputs}>
          <TextField
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
            label="Email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiFilledInput-root": { color: "#fff" },
              "& .MuiFormLabel-root": { color: "#fff" },
            }}
          />
          <TextField
            type="password"
            label="Password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiFilledInput-root": { color: "#fff" },
              "& .MuiFormLabel-root": { color: "#fff" },
            }}
          />
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
        </div>
        <div className={styles.buttons}>
          <Button
            data-testid="add-user-button"
            startIcon={<PersonAddAltIcon />}
            onClick={registrationHandler}
          >
            Add User
          </Button>
        </div>
      </div>
    </div>
  );
}
