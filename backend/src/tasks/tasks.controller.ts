import { Body, Controller, Get, Param, Post, Delete, Patch,Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Post()
  async agregarTask(@Body() newTask: CreateTaskDto): Promise<Task> {
    return await this.tasksService.agregarTask( newTask.fecha, newTask.puntuacion, newTask.titulo, newTask.descripcion);
  }

  @Delete(':id')
  async borrarTasks(@Param('id') id: string): Promise<string> {
    await this.tasksService.borrarTasks({ id });
    return 'Task deleted successfully';
  }

  @Patch(':id')
  async actualizarTask(@Param('id') id: string, @Body() updatedFields: UpdateTaskDto): Promise<Task> {
    return await this.tasksService.actualizarTask(id, updatedFields);
  }

  @Get('filter-by-date')
  async buscar(@Query('filterDate') filterDate: Date | null) {
    return this.tasksService.buscar(filterDate);
  }
}
