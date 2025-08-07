import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
