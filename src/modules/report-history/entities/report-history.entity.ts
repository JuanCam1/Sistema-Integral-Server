import { Task } from "src/modules/task/entities/task.entity";
import { User } from "src/modules/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ReportHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  shipping_date: Date;

  @Column()
  revision_date: Date;

  @Column()
  state_revision: string;

  @Column()
  comment: string;

  @Column()
  version: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  was_sent: boolean;

  @Column()
  was_approved: boolean;

  @ManyToOne(
    () => Task,
    (task) => task.reportHistories,
  )
  @JoinColumn({ name: "taskId" })
  task: Task;

  @ManyToOne(
    () => User,
    (user) => user.reportHistories,
  )
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(
    () => User,
    (user) => user.supervisedReportsHistories,
  )
  @JoinColumn({ name: "supervisorId" })
  supervisor: User;
}
