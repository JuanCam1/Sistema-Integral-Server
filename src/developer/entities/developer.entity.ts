import { Config } from "src/config/entities/config.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Developer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  companyId: string;

  @ManyToOne(() => Config, (config) => config.developers)
  config: Config;
}
