import UserBoundary from "../../boundaries/user/UserBoundary.js"
import UserModel from "../../models/UserModel.js"
import Roles from "../../utils/UserRole.js"
import createHttpError from "http-errors";

const userConverter = {
    toBoundary: (userModel) => {
        const role = userModel.role;
    
        console.log(Object.values(Roles));

        if (!Object.values(Roles).includes(userModel.role))
            throw new createHttpError.BadRequest("Invalid user role");

        const userBoundary = new UserBoundary(
            userModel.userId.platform,
            userModel.userId.email,
            userModel.role,
            userModel.username,
            userModel.userDetails
        );

        console.log("Converted user to boundary");

        return userBoundary;
    },
    toModel: (userBoundary) => {
        const role = userBoundary.role;
        const invertedRoles = Object.fromEntries(
            Object.entries(Roles).map(([key, value]) => [value, key])
        );
        const mappedRole = Roles[invertedRoles[role]]; // Get the mapped role value from the Roles enum

        if (!mappedRole) {
            throw new createHttpError.BadRequest("Invalid user role");
        }

        const userModel = new UserModel({
            userId: {
                platform: userBoundary.userId.platform,
                email: userBoundary.userId.email
            },
            role: mappedRole, // Use the mapped role value
            username: userBoundary.username,
            userDetails: userBoundary.userDetails
        });

        console.log("Converted user to model");

        return userModel;
    }
};
export default userConverter;
