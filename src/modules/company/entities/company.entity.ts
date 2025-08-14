import { Exclude } from "class-transformer";
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
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ default: 1 })
  stateId: number;

  @Exclude()
  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn({ name: "stateId" })
  state: State;

  @OneToMany(
    () => CompanyPlatform,
    (cp) => cp.company,
  )
  companyPlatforms: CompanyPlatform[];
}
