import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface PingAttributes {
  id: string;
  fromUserId: string;
  toUserId: string;
  roomId: string;
}

interface PingCreationAttributes extends Optional<PingAttributes, "id"> {}

class Ping
  extends Model<PingAttributes, PingCreationAttributes>
  implements PingAttributes
{
  public id!: string;
  public fromUserId!: string;
  public toUserId!: string;
  public roomId!: string;
}

Ping.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fromUserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    toUserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Ping" }
);

export default Ping;
