"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function readJsonFile(filePath) {
    if (!fs_1.default.existsSync(filePath)) {
        return [];
    }
    const data = fs_1.default.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}
function login(email, password) {
    const users = readJsonFile(path_1.default.join(__dirname, "../db/users.json"));
    const user = users["users"].find((u) => u.email === email);
    if (!user) {
        return null; // User not found
    }
    // This is just a placeholder for real password checking
    if (user.password === password) {
        return user;
    }
    return null; // Invalid password
}
//# sourceMappingURL=auth-controller.js.map