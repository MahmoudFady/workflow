import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Citizens from "./citizens";
import Employees from "./employees";
@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false ,unique:true})
  name: string;

  @OneToMany(() => Citizens, (citizen) => citizen.id, { nullable: false })
  citizens: Citizens[];

  @OneToMany(() => Employees, (employee) => employee.id, { nullable: false })
  employees: Employees[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
