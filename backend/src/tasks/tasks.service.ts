import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Task } from './task.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async agregarTask( fecha:Date, puntuacion:string, titulo: string, descripcion: string): Promise<Task> {
    const task = this.taskRepository.create({
      id: uuidv4(),
      fecha,
      puntuacion, 
      titulo,
      descripcion,
    });

    return this.taskRepository.save(task);
  }

  async borrarTasks({ id }: { id: string; }): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async getTaskById(id: string): Promise<Task | null> {
    const options: FindOneOptions<Task> = {
      where: { id },
    };

    return this.taskRepository.findOne(options);
  }

  async actualizarTask(id: string, updatedFields: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updatedFields);

    return this.getTaskById(id);
  }

  async buscar(filterDate: Date | null): Promise<Task[]> {
    const allTasks = await this.getAllTasks();

    if (!filterDate) {
      return allTasks;
    }

    return allTasks.filter(task => {
      const taskDate = new Date(task.fecha);
      return taskDate.toISOString().split('T')[0] === filterDate.toISOString().split('T')[0];
    });
  }


}
