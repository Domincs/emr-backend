"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const models_1 = require("../userManagement/models");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.AuthenticationService = {
    login: async (username, password) => {
        try {
            const user = await models_1.User.findOne({
                where: { username, password },
                include: [{ model: models_1.PermissionGroup, include: [models_1.Permissions] }] // Include permission groups and their associated permissions
            });
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const permissions = user.permissionGroups?.map((permissionGroup) => ({
                groupName: permissionGroup.name,
                permissions: permissionGroup.permissions?.map(permission => permission.name)
            }));
            const token = (0, jsonwebtoken_1.sign)({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
            return { token, permissions };
        }
        catch (error) {
            throw new Error('Error logging in');
        }
    },
};
