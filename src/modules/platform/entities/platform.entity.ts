import { Exclude } from "class-transformer";
import { Company } from "src/modules/company/entities/company.entity";
import { State } from "src/modules/state/entities/state.entity";
import { Task } from "src/modules/task/entities/task.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Platform {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true }) name: string;
  @Column()
  website: string;

  @Exclude()
  @Column({ default: false })
  isDeleted: boolean;

  @Exclude()
  @Column({ default: 1 })
  stateId: number;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn({ name: "stateId" })
  state: State;

  @ManyToOne(
    () => Company,
    (company) => company.platforms,
    { eager: true },
  )
  @JoinColumn({ name: "companyId" })
  company: Company;

  @OneToMany(
    () => Task,
    (task) => task.platform,
  )
  tasks: Task[];
}
