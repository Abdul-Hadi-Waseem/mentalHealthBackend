

import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "DoctorProfile"})
export class DoctorEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  college: string;

  @Column()
  course:string;

}