import express from "express";
const app = express();
const port = 4000;

type User = {
  id: number;
  firstName: string;
  lastName?: string;
  username: string;
};

type UserListResponse = {
  users: User[];
};

app.get("/users", (req, res) => {
  const usersList: UserListResponse = {
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
