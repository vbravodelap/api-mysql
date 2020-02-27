import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Task {
    
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    expireDate: string;

    @ManyToOne(type => User, user => user.tasks)
    user: User

}