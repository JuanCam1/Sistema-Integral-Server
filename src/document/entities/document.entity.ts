import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Document {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  file_url: string;
}
