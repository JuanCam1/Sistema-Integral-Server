import { Area } from "src/modules/area/entities/area.entity";
import { CompanyPlatform } from "src/modules/company-platform/entities/company-platform.entity";
import { Periodicity } from "src/modules/periodicity/entities/periodicity.entity";
import { ReportHistory } from "src/modules/report-history/entities/report-history.entity";
import { User } from "src/modules/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  date_from: Date;

  @Column({ nullable: true })
  date_to: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(
    () => Area,
    (area) => area.tasks,
  )
  @JoinColumn({ name: "areaId" })
  area: Area;

  @ManyToOne(
    () => CompanyPlatform,
    (cp) => cp.tasks,
  )
  @JoinColumn({ name: "companyPlatformId" })
  companyPlatform: CompanyPlatform;

  @ManyToOne(
    () => User,
    (user) => user.tasks,
  )
  @JoinColumn({ name: "supervisorId" })
  user: User;

  @ManyToOne(
    () => User,
    (user) => user.tasks,
  )
  @JoinColumn({ name: "userId" })
  supervisedTasks: User;

  @ManyToOne(
    () => Periodicity,
    (p) => p.tasks,
  )
  @JoinColumn({ name: "periodicityId" })
  periodicity: Periodicity;

  @OneToMany(
    () => ReportHistory,
    (rh) => rh.task,
  )
  reportHistories: ReportHistory[];
}
