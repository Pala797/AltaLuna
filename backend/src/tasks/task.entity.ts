import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task { 
  @PrimaryGeneratedColumn('uuid') 
  id: string; 

  @Column()
  puntuacion: string;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;
}
