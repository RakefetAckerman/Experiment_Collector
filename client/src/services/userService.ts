import { UserBoundary } from "../bounderies/user/UserBoundary";

interface UserService {
  createUser(reqUserBoundary: UserBoundary): Promise<UserBoundary>;
  login(
    reqUserBoundary: UserBoundary
  ): Promise<{ jwtToken: string; body: UserBoundary; expirationCookie: Date }>;
  updateUser(
    userEmail: string,
    userPlatform: string,
    updateUser: UserBoundary
  ): Promise<UserBoundary>;
  getAllUsers(userEmail: string, userPlatform: string): Promise<UserBoundary[]>;
  deleteAllUsers(
    userEmail: string,
    userPlatform: string
  ): Promise<{ n: number; deletedCount: number; ok: number }>;
}

export default UserService;
