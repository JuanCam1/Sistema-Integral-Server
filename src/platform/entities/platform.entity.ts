import { Company } from "src/company/entities/company.entity";
import { State } from "src/state/entities/state.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Platform {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  website: string;

  @ManyToOne(() => Company, (company) => company.platforms)
  @JoinColumn({ name: "companyId" })
  company: Company;

  @ManyToOne(() => State)
  @JoinColumn({ name: "stateId" })
  state: State;

  // @OneToMany(() => Report, (report) => report.platform)
  // reports: Report[];
}
