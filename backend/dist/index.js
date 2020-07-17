"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 4000;
app.get("/users", (req, res) => {
    const usersList = {
        users: [
            {
                id: 0,
                firstName: "John",
                lastName: "Hill",
                username: "DeathstarNovember",
            },
            {
                id: 1,
                firstName: "Andrew",
                lastName: "Wendling",
                username: "goHikeCo1",
            },
            {
                id: 2,
                firstName: "Ali",
                lastName: "Wendling",
                username: "household6",
            },
        ],
    };
    res.send(usersList);
});
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map