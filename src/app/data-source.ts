import "reflect-metadata";
import { DataSource } from "typeorm";
import Workflow from "./entity/workflow";
import Role from "./entity/roles";
import wf_steps from "./entity/wf_steps";
import Wf_actions from "./entity/wf_actions";
import Wf_case from "./entity/wf_case";
import Wf_request_data from "./entity/wf_request_data";
import Wf_request_status from "./entity/wf_request_status";
import Wf_requests from "./entity/workflow_request";
import Citizens from "./entity/citizens";
import Employees from "./entity/employees";
import Wfr_steps from "./entity/wfr_steps";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST_SQL,
  port: +process.env.PORT_SQL,
  username: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DATABASE,
  logging: true,
  synchronize: true,
  entities: [Workflow,
    Role, wf_steps, Wf_actions, Wf_case, Wf_request_data,
    Wf_request_status, Wf_requests,Citizens ,Employees , Wfr_steps],
});

