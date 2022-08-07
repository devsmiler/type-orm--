import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Classes } from "./Class";
import { Project } from "./Project";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany((type) => Project, (project) => project.student)
    projects: Project[];

    @ManyToMany(() => Classes)
    @JoinTable()
    classes: Classes[];
}
