import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  path: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @OneToMany(() => User, (user) => user.userType)
  users: User[];
}
