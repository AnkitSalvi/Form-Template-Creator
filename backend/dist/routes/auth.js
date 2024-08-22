"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_1 = require("../controllers/auth-controller");
/**
 * @swagger
 *  /api/auth/login:
 *  post:
 *      tags:
 *        - auth
 *      summary: login for an user
 *      description: login for a user
 *      operationId: login
 *      requestBody:
 *        content:
 *          application/json:
 *           schema:
 *                 $ref: '#/components/schemas/login'
 *      security:
 *        - Bearer: []
 *      responses:
 *        '200':
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/login'
 *        '405':
 *          description: Invalid input
 */
//Method to login for a created user
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Assuming login function is imported
    const user = (0, auth_controller_1.login)(email, password);
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
    res.status(200).json(Object.assign(Object.assign({}, user), { isLogin: true }));
}));
exports.default = router;
//# sourceMappingURL=auth.js.map