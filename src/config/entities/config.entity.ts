import { Developer } from "src/developer/entities/developer.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Config {
  @PrimaryColumn()
  id: number;

  @Column()
  version: string;

  @Column()
  company: string;

  @Column()
  contact: string;

  @Column()
  email: string;

  @OneToMany(() => Developer, (developer) => developer.config)
  developers: Developer[];
}
