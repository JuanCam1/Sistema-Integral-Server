import { Area } from "src/area/entities/area.entity";
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
export class Sede {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  ubication: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: "stateId" })
  state: State;

  @OneToMany(() => Area, (area) => area.sede)
  @JoinColumn({ name: "areaId" })
  areas: Area[];
}
