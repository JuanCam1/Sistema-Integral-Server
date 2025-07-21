import { ReportHistory } from "src/report-history/entities/report-history.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReportState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ReportHistory, (rp) => rp.reportState)
  reportHistories: ReportHistory[];
}
