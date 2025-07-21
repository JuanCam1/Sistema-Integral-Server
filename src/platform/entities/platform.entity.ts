import { CompanyPlatform } from "src/company-platform/entities/company-platform.entity";
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
export class Platform {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  website: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: "stateId" })
  state: State;

  @OneToMany(() => CompanyPlatform, (cp) => cp.platform)
  companyPlatforms: CompanyPlatform[];
}
