import { Sequelize } from "sequelize";
import { DB_CONNECTION_URI } from "./config";

const sequelize = new Sequelize(DB_CONNECTION_URI);

export default sequelize;
