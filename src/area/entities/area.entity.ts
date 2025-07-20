import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Area {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  flat: string;

  @Column()
  extension: string;

  @Column({ default: 1 })
  active: number;

  // @ManyToOne(() => Sede, (sede) => sede.areas)
  // @JoinColumn({ name: 'sedeId' })
  // sede: Sede;

  // @OneToMany(() => User, (user) => user.area)
  // users: User[];

  // @OneToMany(() => Report, (report) => report.area)
  // reports: Report[];
}
