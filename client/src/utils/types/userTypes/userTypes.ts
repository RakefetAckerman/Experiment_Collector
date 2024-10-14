enum UserTypes {
    Prolific = "Prolific",
    Student = "Student",
    Researcher = "Researcher",
    Admin = "Admin",
  }
  
  export default UserTypes;

export interface SerializedUser {
    userId: { platform: string, email: string };
    role: string;
    username?: string;
}