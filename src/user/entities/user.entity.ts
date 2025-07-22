import { Area } from "src/area/entities/area.entity";
import { Image } from "src/image/entities/image.entity";
import { ReportHistory } from "src/report-history/entities/report-history.entity";
import { State } from "src/state/entities/state.entity";
import { Task } from "src/task/entities/task.entity";
import { UserType } from "src/user-type/entities/user-type.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  profile: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => UserType, (userType) => userType.users)
  @JoinColumn({ name: "userTypeId" })
  userType: UserType;

  @ManyToOne(() => Area, (area) => area.users)
  @JoinColumn({ name: "areaId" })
  area: Area;

  @ManyToOne(() => Image, (img) => img.users)
  @JoinColumn({ name: "imageId" })
  image: Image;

  @ManyToOne(() => State)
  @JoinColumn({ name: "stateId" })
  state: State;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Task, (task) => task.supervisedTasks)
  supervisedTasks: Task[];

  @OneToMany(() => ReportHistory, (rp) => rp.user)
  reportHistories: ReportHistory[];

  @OneToMany(() => ReportHistory, (rp) => rp.supervisor)
  supervisedReportsHistories: ReportHistory[];
}
