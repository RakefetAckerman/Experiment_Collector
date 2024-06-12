import axios from "axios";
import UserService from "./userService";
import { UserBoundary } from "../bounderies/user/UserBoundary";

const backendURL: string | undefined =
  process.env.VITE_ENV === "env"
    ? process.env.VITE_REACT_APP_BACKEND_DEV_URL
    : process.env.VITE_REACT_APP_BACKEND_PROD_URL;

let entryBaseUrl = backendURL + "/entry";

const userService: UserService = {
  createUser: function (reqUserBoundary: UserBoundary): Promise<UserBoundary> {
    throw new Error("Function not implemented.");
  },
  login: function (
    reqUserBoundary: UserBoundary
  ): Promise<{ jwtToken: string; body: UserBoundary; expirationCookie: Date }> {
    throw new Error("Function not implemented.");
  },
  updateUser: function (
    userEmail: string,
    userPlatform: string,
    updateUser: UserBoundary
  ): Promise<UserBoundary> {
    throw new Error("Function not implemented.");
  },
  getAllUsers: function (
    userEmail: string,
    userPlatform: string
  ): Promise<UserBoundary[]> {
    throw new Error("Function not implemented.");
  },
  deleteAllUsers: function (
    userEmail: string,
    userPlatform: string
  ): Promise<{ n: number; deletedCount: number; ok: number }> {
    throw new Error("Function not implemented.");
  },
};

export default userService;
