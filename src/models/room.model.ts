import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface RoomAttributes {
  id: string;
  name: string;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, "id"> {}

class Room
  extends Model<RoomAttributes, RoomCreationAttributes>
  implements RoomAttributes
{
  public id!: string;
  public name!: string;
}

Room.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, modelName: "Room" }
);

export default Room;
