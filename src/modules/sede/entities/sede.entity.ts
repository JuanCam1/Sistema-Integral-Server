import { Exclude } from "class-transformer";
import { Area } from "src/modules/area/entities/area.entity";
import { State } from "src/modules/state/entities/state.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Sede {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;

  @Column()
  ubication: string;

  @Exclude()
  @Column({ default: false })
  isDeleted: boolean;

  @Exclude()
  @Column({ default: 1 })
  stateId: number;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn({ name: "stateId" })
  state: State;

  @OneToMany(() => Area, (area) => area.sede)
  areas: Area[];
}
