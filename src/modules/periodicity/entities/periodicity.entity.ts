import { Exclude } from "class-transformer";
import { State } from "src/modules/state/entities/state.entity";
import { Task } from "src/modules/task/entities/task.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Periodicity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Exclude()
  @Column({ default: 1 })
  stateId: number;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn({ name: "stateId" })
  state: State;

  @OneToMany(
    () => Task,
    (task) => task.periodicity,
  )
  tasks: Task[];
}
