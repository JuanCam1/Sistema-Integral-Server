import { Exclude } from "class-transformer";
import { Area } from "src/modules/area/entities/area.entity";
import { Image } from "src/modules/image/entities/image.entity";
import { ReportHistory } from "src/modules/report-history/entities/report-history.entity";
import { State } from "src/modules/state/entities/state.entity";
import { Task } from "src/modules/task/entities/task.entity";
import { UserType } from "src/modules/user-type/entities/user-type.entity";
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

  @Exclude()
  @Column()
  password: string;

  @Column()
  profile: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Exclude()
  @Column({ default: false })
  isDeleted: boolean;

  @Exclude()
  @Column()
  userTypeId: string;

  @Exclude()
  @Column({ nullable: true })
  areaId: string;

  @Exclude()
  @Column({ nullable: true })
  imageId: string;

  @Exclude()
  @Column()
  stateId: number;

  @ManyToOne(() => UserType, (userType) => userType.users, { eager: true })
  @JoinColumn({ name: "userTypeId" })
  userType: UserType;

  @ManyToOne(() => Area, (area) => area.users, { eager: true, nullable: true })
  @JoinColumn({ name: "areaId" })
  area: Area | null;

  @ManyToOne(() => Image, (img) => img.users, { eager: true })
  @JoinColumn({ name: "imageId" })
  image: Image;

  @ManyToOne(() => State, { eager: true })
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
