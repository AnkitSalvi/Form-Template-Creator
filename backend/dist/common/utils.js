"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJsonFile = readJsonFile;
exports.writeJsonFile = writeJsonFile;
const fs_1 = __importDefault(require("fs"));
function readJsonFile(filePath) {
    if (!fs_1.default.existsSync(filePath)) {
        return [];
    }
    const data = fs_1.default.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}
function writeJsonFile(filePath, data) {
    fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
//# sourceMappingURL=utils.js.map