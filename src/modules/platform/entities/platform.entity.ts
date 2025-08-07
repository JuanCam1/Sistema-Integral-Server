import { CompanyPlatform } from "src/modules/company-platform/entities/company-platform.entity";
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
export class Platform {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  website: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: 1 })
  stateId: number;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn({ name: "stateId" })
  state: State;

  @OneToMany(() => CompanyPlatform, (cp) => cp.platform)
  companyPlatforms: CompanyPlatform[];
}
