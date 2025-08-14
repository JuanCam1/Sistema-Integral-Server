import { Report } from "src/modules/report/entities/report.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manual {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type: string;

  @Column()
  value: string;

  @OneToMany(
    () => Report,
    (report) => report.manual,
  )
  reports: Report[];
}
