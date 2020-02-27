import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterLoad, AfterInsert, BeforeInsert, Unique } from 'typeorm';
import moment from 'moment';
import bcrypt, { hash } from 'bcrypt';
import { Note } from './Note';
import { Task } from './Task';

const date = moment().format();

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column()
    password: string;
    
    @Unique(["email"])
    @Column()
    email: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(type => Note, note => note.user)
    notes: Note[];

    @OneToMany(type => Task, task => task.user)
    tasks: Task[];

    @Column({ default: date })
    created_at: string
}