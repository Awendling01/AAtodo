"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_1 = require("./data");
const app = express_1.default();
app.use(cors_1.default());
const port = 4000;
app.get("/users", (_req, res) => {
    const usersList = {
        users: data_1.users,
    };
    res.send(usersList);
});
app.get("/todos", (_req, res) => {
    const todosList = {
        todos: {
            completed: data_1.todos.filter((todo) => todo.completed),
            incomplete: data_1.todos.filter((todo) => !todo.completed),
        },
    };
    res.send(todosList);
});
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map