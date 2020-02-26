import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Note {
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    description: string;

    @Column()
    status: boolean;

    @ManyToOne(type => User, user => user.notes)
    user: User
}