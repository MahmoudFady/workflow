import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import workflow from "./workflow";
import wf_steps from "./wf_steps";
import Wf_case from "./wf_case";
import Role from "./roles";

@Entity()
export default class Wf_actions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false,unique:true})
  wf_action_name: string;

  @ManyToOne(() => workflow, { nullable: false })
  workflow: workflow;

  @ManyToOne(() => wf_steps, (wf_steps) => wf_steps.id, { nullable: false })
  wf_step: wf_steps;

  @ManyToOne(() => Wf_case, (wf_case) => wf_case.id, { nullable: false })
  wf_case: Wf_case;

  @ManyToMany(() => Role, (role) => role.id, { nullable: false })
  @JoinTable()
  role: Role[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
