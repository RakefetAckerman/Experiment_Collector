import { UserIdBoundaryImpl } from "./UserIdBoundary";

interface UserBoundaryImpl {
  userId: UserIdBoundaryImpl;
  role: string;
  username?: string;
  userDetails: object;
  equals(other: UserBoundaryImpl): boolean;
}

export type { UserBoundaryImpl };

class UserBoundary implements UserBoundaryImpl {
  constructor(
    public userId: UserIdBoundaryImpl,
    public role: string,
    public userDetails: object,
    public username?: string
  ) {}

  equals(other: UserBoundaryImpl): boolean {
    if (this === other) return true;
    if (other === null || this.constructor !== other.constructor) return false;
    return this.userId.equals(other.userId);
  }
}

export { UserBoundary };
