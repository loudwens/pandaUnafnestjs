import { Project } from 'src/projects/project.entity/project.entity';
import { Task } from 'src/tasks/task.entity/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;


  @ManyToMany(() => Project, project => project.members)
  projects: Project[];
  

  @OneToMany(() => Task, task => task.assignedTo)
  tasks: Task[];
}
