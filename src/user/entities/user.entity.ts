import { Area } from "src/area/entities/area.entity";
import { State } from "src/state/entities/state.entity";
import { UserType } from "src/user-type/entities/user-type.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  cedula: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  phone: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password: string;

  @Column()
  position: string;

  @Column()
  photo: string;

  @ManyToOne(() => UserType, (userType) => userType.users)
  @JoinColumn({ name: "userTypeId" })
  userType: UserType;

  @ManyToOne(() => Area, (area) => area.users)
  area: Area;

  @ManyToOne(() => State)
  @JoinColumn({ name: "stateId" })
  state: State;

  // @OneToMany(() => Report, (report) => report.owner)
  // reports: Report[];

  // @OneToMany(() => ReportDelivery, (delivery) => delivery.user)
  // deliveries: ReportDelivery[];

  // @OneToMany(() => ReportHistory, (history) => history.user)
  // histories: ReportHistory[];
}
