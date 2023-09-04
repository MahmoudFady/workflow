import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length, Min } from "class-validator";
import Role from "./roles";

@Entity()
export default class Citizens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  second_name: string;

  @Column({ nullable: false })
  third_name: string;

  @Column({ nullable: false })
  fourth_name: string;

  @Column({ nullable: false })
  nationality: string;

  @Column({ nullable: false , unique:true})
  passport_or_id: number;

  @Column({ nullable: false ,unique:true})
  email: string;

  @Column({ nullable: false ,unique:true})
  phone_number: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  job_title: string;

  @Column({
    nullable: false,
    type: "enum",
    enum: ["male", "female"],
    default: "male",
  })
  gender: string;

  @Column({ nullable: false })
  
  password: string;

  @ManyToOne(() => Role, { nullable: false })
  role_id: Role;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
