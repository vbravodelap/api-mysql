import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Note } from './Note';
import { Task } from './Task';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToMany(type => Note, note => note.user)
    notes: Note[];

    @OneToMany(type => Task, task => task.user)
    tasks: Task[];
}