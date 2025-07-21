import { State } from "src/state/entities/state.entity";
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

  @ManyToOne(() => State)
  @JoinColumn({ name: "stateId" })
  state: State;

  // @ManyToOne(() => Sede, (sede) => sede.areas)
  // @JoinColumn({ name: 'sedeId' })
  // sede: Sede;

  @OneToMany(() => User, (user) => user.area)
  users: User[];

  // @OneToMany(() => Report, (report) => report.area)
  // reports: Report[];
}
