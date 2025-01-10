import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity('users') // Table name in the database
@Unique(['username']) // Ensure unique usernames
@Unique(['email']) // Ensure unique emails
export class User {
    @PrimaryGeneratedColumn() // Automatically generate a unique ID
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;



    @Column({ default: true }) // Default value for active status
    isActive: boolean;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER }) // Role field
    role: UserRole;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt?: Date;
}