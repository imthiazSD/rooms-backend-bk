import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface UserAttributes {
  id: string;
  username: string;
  password: string;
  status: string;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "status"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public username!: string;
  public password!: string;
  public status!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "offline",
    },
  },
  { sequelize, modelName: "User" }
);

export default User;
