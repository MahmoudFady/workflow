import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToOne,
  Generated,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import workflow from "./workflow";
import Wf_request_status from "./wf_request_status";
import Citizens from "./citizens";
import Wf_request_data from "./wf_request_data";

@Entity()
export default class Wf_requests {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  wf_request_time: Date;
  // need to add auto increment 
  @Column()
  wfr_no: number;

  @ManyToOne(() => Wf_request_status, (wfr_status) => wfr_status.id, {
    nullable: false,
  })
  wf_request_status: Wf_request_status;
  @ManyToOne(() => workflow, (wf) => wf.id, { nullable: false })
  workflow: workflow;
  @OneToOne(() => Wf_request_data, (wfr_data) => wfr_data.id, {
    nullable: false,
  })
  @JoinColumn()
  wfr_data: Wf_request_data;
  @ManyToOne(() => Citizens, (citizen) => citizen.id, { nullable: false })
  citizen: Citizens;

  @UpdateDateColumn()
  updatedAt: Date;
}
