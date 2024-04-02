"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGroup = exports.Permissions = exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class User extends sequelize_1.Model {
    id;
    username;
    first_name;
    last_name;
    password;
    email;
    createdAt;
    updatedAt;
    permissionGroups;
    // Define associations here
    static associations;
}
exports.User = User;
class Permissions extends sequelize_1.Model {
    id;
    name;
    description;
    createdAt;
    updatedAt;
}
exports.Permissions = Permissions;
class PermissionGroup extends sequelize_1.Model {
    id;
    name;
    description;
    createdAt;
    updatedAt;
    // Define associations here
    static associations;
    permissions;
    getPermissions;
}
exports.PermissionGroup = PermissionGroup;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'User',
});
Permissions.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Permissions',
});
PermissionGroup.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'PermissionGroup',
});
// Define associations after model initialization
User.hasMany(PermissionGroup);
PermissionGroup.belongsToMany(Permissions, { through: 'GroupPermission' });
PermissionGroup.belongsToMany(User, { through: 'UserPermissionGroup' });
PermissionGroup.belongsToMany(Permissions, { through: 'GroupPermission' });
// Define custom methods or associations (optional)
PermissionGroup.prototype.getPermissions = async function () {
    return this.getPermissions(); // Implement logic to fetch permissions
};
