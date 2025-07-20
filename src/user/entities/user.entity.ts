// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   cedula: string;

//   @Column()
//   names: string;

//   @Column()
//   lastnames: string;

//   @Column()
//   phone: string;

//   @Column({ unique: true, nullable: true })
//   email: string;

//   @Column()
//   password: string;

//   @Column()
//   position: string;

//   @Column({ default: 1 })
//   state: number;

//   @Column()
//   photo: string;

//   @Column({ nullable: true })
//   profile: string;

//   @ManyToOne(() => Area, (area) => area.users)
//   @JoinColumn({ name: 'areaId' })
//   area: Area;

//   @ManyToOne(() => User)
//   @JoinColumn({ name: 'supervisorId' })
//   supervisor: User;

//   @OneToMany(() => Report, (report) => report.owner)
//   reports: Report[];

//   @OneToMany(() => ReportDelivery, (delivery) => delivery.user)
//   deliveries: ReportDelivery[];

//   @OneToMany(() => ReportHistory, (history) => history.user)
//   histories: ReportHistory[];
// }
