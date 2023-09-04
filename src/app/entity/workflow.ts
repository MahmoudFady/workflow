import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, Min } from "class-validator";

@Entity()
export default class Workflow {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  wf_name: string;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
