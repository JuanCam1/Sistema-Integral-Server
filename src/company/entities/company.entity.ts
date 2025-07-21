import { Platform } from "src/platform/entities/platform.entity";
import { State } from "src/state/entities/state.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: "stateId" })
  state: State;

  @OneToMany(() => Platform, (platform) => platform.company)
  platforms: Platform[];
}
