import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from 'src/projects/project.entity/project.entity';
import { User } from 'src/users/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status?: string;

  @ManyToOne(() => Project, project => project.tasks)
  project: Project;

  @ManyToOne(() => User, user => user.tasks)
  assignedTo: User;
}
