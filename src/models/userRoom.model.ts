import { DataTypes, Model, BelongsToGetAssociationMixin } from "sequelize";
import sequelize from "../database";
import User from "./user.model";
import Room from "./room.model";

class UserRoom extends Model {
  public userId!: number;
  public roomId!: number;
  public focusMode!: boolean;

  public getUser!: BelongsToGetAssociationMixin<User>;
  public getRoom!: BelongsToGetAssociationMixin<Room>;

  public User?: User;
}

UserRoom.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
      field: "userId",
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Room, key: "id" },
      field: "roomId",
    },
    focusMode: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "UserRoom",
    tableName: "UserRooms",
    timestamps: false,
  }
);

UserRoom.belongsTo(User, { foreignKey: "userId" });
UserRoom.belongsTo(Room, { foreignKey: "roomId" });

export default UserRoom;
