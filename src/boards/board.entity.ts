import { User } from "src/auth/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { BoardStatusValue } from "./boardStatus.type";

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatusValue;

  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
