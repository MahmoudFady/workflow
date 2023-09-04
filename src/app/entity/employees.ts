import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, Min } from "class-validator";
import Role from "./roles";

@Entity()
export default class Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false, unique: true })
  username: string;
  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Role, (role) => role.employees, { nullable: false })
  role_id: Role;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
