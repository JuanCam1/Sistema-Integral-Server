import { Config } from "src/modules/config/entities/config.entity";
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

  @Column({ default: 1 })
  configId: number;

  @ManyToOne(
    () => Config,
    (config) => config.developers,
  )
  config: Config;
}
