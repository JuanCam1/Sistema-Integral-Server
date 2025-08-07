import { Company } from "src/modules/company/entities/company.entity";
import { Platform } from "src/modules/platform/entities/platform.entity";
import { Task } from "src/modules/task/entities/task.entity";
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class CompanyPlatform {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Platform, (p) => p.companyPlatforms)
  @JoinColumn({ name: "platformId" })
  platform: Platform;

  @ManyToOne(() => Company, (c) => c.companyPlatforms)
  @JoinColumn({ name: "companyId" })
  company: Company;

  @OneToMany(() => Task, (task) => task.companyPlatform)
  tasks: Task[];
}
