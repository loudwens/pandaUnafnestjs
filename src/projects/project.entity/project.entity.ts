import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Task } from 'src/tasks/task.entity/task.entity';
import { User } from 'src/users/user.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToMany(() => User, user => user.projects)
  @JoinTable()
  members: User[];

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];
}
