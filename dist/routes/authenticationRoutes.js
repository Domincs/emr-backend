"use strict";
// src/routes/authenticationRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const response_1 = require("../common/response");
const services_1 = require("../modules/userManagement/services");
const services_2 = require("../modules/authentication/services");
const router = express_1.default.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created
 *       '500':
 *         description: Server Error
 */
router.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        const user = await services_1.UserService.createUser(userData);
        (0, response_1.sendResponse)(res, { status: response_1.StatusCode.Created, data: user });
    }
    catch (error) {
        (0, response_1.sendResponse)(res, { status: response_1.StatusCode.ServerError, message: error.message });
    }
});
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Log in with the provided credentials and receive a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '401':
 *         description: Unauthorized
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await services_2.AuthenticationService.login(username, password);
        (0, response_1.sendResponse)(res, { status: response_1.StatusCode.Success, data: { token } });
    }
    catch (error) {
        (0, response_1.sendResponse)(res, { status: response_1.StatusCode.Unauthorized, message: error.message });
    }
});
/**
 * @swagger
 * /auth/profile/{userId}:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile of the user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties here for updating user profile
 *     responses:
 *       '200':
 *         description: Success
 *       '401':
 *         description: Unauthorized
 */
router.put('/profile/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const userData = req.body;
        const updatedUser = await services_1.UserService.updateProfile(userId, userData);
        res.status(200).json(updatedUser);
        (0, response_1.sendResponse)(res, { status: response_1.StatusCode.Success, data: { ...updatedUser } });
    }
    catch (error) {
        (0, response_1.sendResponse)(res, { status: response_1.StatusCode.Unauthorized, message: error.message });
    }
});
/**
 * @swagger
 * /auth/permissions/{userId}:
 *   put:
 *     summary: Set user permissions
 *     description: Set permissions for the user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to set permissions for
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionGroupId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Success
 *       '401':
 *         description: Unauthorized
 */
router.put('/permissions/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const { permissionGroupId } = req.body;
        await services_1.UserService.setPermission(userId, permissionGroupId);
        (0, response_1.sendResponse)(res, { status: response_1.StatusCode.Success, message: 'Permissions set successfully' });
    }
    catch (error) {
        (0, response_1.sendResponse)(res, { status: response_1.StatusCode.Unauthorized, message: error.message });
    }
});
exports.default = router;
