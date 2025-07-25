import { Sede } from "src/sede/entities/sede.entity";
import { State } from "src/state/entities/state.entity";
import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Area {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  flat: string;

  @Column()
  extension: string;

  @Column()
  stateId: number;

  @Column()
  sedeId: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => State)
  @JoinColumn({ name: "stateId" })
  state: State;

  @ManyToOne(() => Sede, (sede) => sede.areas)
  @JoinColumn({ name: "sedeId" })
  sede: Sede;

  @OneToMany(() => User, (user) => user.area)
  users: User[];

  @OneToMany(() => Task, (task) => task.area)
  tasks: Task[];
}
