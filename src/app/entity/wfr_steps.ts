import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Wf_requests from "./workflow_request";
import Wf_steps from "./wf_steps";
import Wf_case from "./wf_case";
import Wf_request_data from "./wf_request_data";

@Entity()
export default class Wfr_steps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  wfrs_send_time: string;

  @Column({ nullable: false })
  wfrs_receive_time: string;
  @Column({ nullable: false })
  wfrs_is_finished: boolean;


  @ManyToOne(() => Wf_requests, (wf) => wf.id, { nullable: false })
  wfr_id: Wf_requests;

  @ManyToOne(() => Wf_case, (wf) => wf.id, { nullable: false })
  @JoinColumn()
  wf_case_id: Wf_case;

  @ManyToOne(() => Wf_steps, (wf) => wf.id, { nullable: false })
  wf_step_id: Wf_steps;
  
  @ManyToOne(() => Wf_request_data, (wfr_data) => wfr_data.id, {
    nullable: false,
  })
  @JoinColumn()
  wfr_data: Wf_request_data;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
