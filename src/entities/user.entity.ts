import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  user_id!: string;

  @Column("varchar")
  username!: string;

  @Column("varchar")
  phone!: string;

  @Column("varchar")
  email!: string;

  @Column("text")
  password!: string;

  @Column("text")
  address!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;
}
