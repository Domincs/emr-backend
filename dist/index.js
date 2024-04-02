"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationRoutes_1 = __importDefault(require("./routes/authenticationRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerSpec_1 = __importDefault(require("./swaggerSpec"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Session configuration
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
// Initialize Passport.js and restore authentication state if available
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Serve Swagger documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec_1.default));
// Authentication routes
app.use('/auth', authenticationRoutes_1.default);
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};
// Use error handling middleware
app.use(errorHandler);
// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
