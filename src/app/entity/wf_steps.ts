import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length, Min } from "class-validator";
import workflow from "./workflow";
import Workflow from "./workflow";

@Entity()
export default class Wf_steps {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Workflow, (workflow) => workflow.id, { nullable: false })
  workflow: Workflow;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
