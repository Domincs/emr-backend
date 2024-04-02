"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// src/modules/userManagement/service.ts
const models_1 = require("./models");
exports.UserService = {
    createUser: async (userData) => {
        try {
            const user = await models_1.User.create(userData);
            return user;
        }
        catch (error) {
            throw new Error('Error creating user');
        }
    },
    updateProfile: async (userId, userData) => {
        try {
            const user = await models_1.User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            await user.update(userData);
            return user;
        }
        catch (error) {
            throw new Error('Error updating profile');
        }
    },
    setPermission: async (userId, permissionGroupId) => {
        try {
            // Logic to associate user with permission group
        }
        catch (error) {
            throw new Error('Error setting permission');
        }
    },
};
