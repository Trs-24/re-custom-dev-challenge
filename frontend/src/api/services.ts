import AuthAPI from "./Auth";
import ReportAPI from "./Report";
import { privateRequest, publicRequest } from "./request";
import UserAPI from "./User";

export const authService = new AuthAPI(publicRequest);
export const userService = new UserAPI(privateRequest);
export const reportService = new ReportAPI(privateRequest);
