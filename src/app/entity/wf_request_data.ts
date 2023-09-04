import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Wf_requests from "./workflow_request";
import Wfr_steps from "./wfr_steps";
@Entity()
export default class Wf_request_data {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  organization: string;
  @Column({ nullable: false })
  branch: string;
  @Column({ nullable: false })
  full_name: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  phone_number: string;
  @Column({ nullable: false })
  job_title: string;
  @Column({ nullable: false })
  address: string;
  @Column({ nullable: false })
  gender: string;
  @Column({ nullable: false })
  governorate: string;
  @Column({ nullable: false })
  id_img: string;
  @Column({ nullable: false })
  certificate_expired_period: string;
  @Column({ nullable: false })
  certificate_name: string;
  @Column({ nullable: false })
  total_price: number;
  @OneToOne(() => Wf_requests, (wfr) => wfr.id, { nullable: false })
  wf_request: Wf_requests;
  @OneToMany(() => Wfr_steps, (wfr_steps) => wfr_steps.id, { nullable: false })
  wfr_step_id: Wfr_steps[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
