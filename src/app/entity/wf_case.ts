import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Workflow from "./workflow";
import Wf_steps from "./wf_steps";
@Entity()
export default class Wf_case {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  wf_case_name: string;

  @ManyToOne(() => Workflow, (workflow) => workflow.id, { nullable: false })
  workflow: Workflow;

  @ManyToOne(() => Wf_steps, (wf_step) => wf_step.id, { nullable: false })
  wf_step: Wf_steps;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
