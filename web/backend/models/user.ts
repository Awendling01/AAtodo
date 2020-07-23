import { Sequelize, DataTypes } from "sequelize";
import Todo from "./todo";
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    fullName: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ["firstName", "lastName"]),
      get: () => {
        return `${this.firstName} ${this.lastName}`;
      },
      set: (_value) => {
        throw new Error("User.fullName is a read-only attribute");
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

User.hasMany(Todo, { foreignKey: "userId" });

export default User;
