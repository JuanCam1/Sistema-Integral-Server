import { Manual } from "src/modules/manual/entities/manual.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  normativity: string;

  @Column()
  signature: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => Manual, (p) => p.reports)
  @JoinColumn({ name: "manualId" })
  manual: Manual;
}
