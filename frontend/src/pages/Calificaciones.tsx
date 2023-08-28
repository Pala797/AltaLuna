import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Button, Container, Typography, Grid, TextField, Input } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


// INTERFACE 
interface Task {
    id: string;
    puntuacion: string;
    titulo: string;
    descripcion: string;
    
  }

// ESTILOS 
 
  const FormContainer = styled(Container)({
    border: '1px solid',
    borderColor: 'primary.main',
    borderRadius: '4px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#C9D6FE' 
    
  });
  
  const TaskContainer = styled('div')({
    border: '1px solid',
    borderColor: 'primary.main',
    borderRadius: '4px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#DBE3FC' 
  });
  
  const MarginButton = styled(Button)({
    margin: '2px',
  marginInline: '30px',
  borderRadius: '20px',
  border: '2px solid',

  });
  
  const PaddedTextField = styled(TextField)({
    marginRight: '10px',
    marginBottom: '10px',
    width: '100%',
    backgroundColor: '#E3F2FA' 

  });


// ESTADOS DE REACT  -->> USESTATE Y -->> USEEFFECT

const Calificaciones = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<{ puntuacion: string;  titulo: string; descripcion: string; }>({
        puntuacion:'',
        titulo: '',
        descripcion: '',
    });
    const [editarPuntuacion, setEditarPuntuacion] = useState('');
    const [editarTitulo, setEditarTitulo] = useState('');
    const [editarDescripcion, setEditarDescripcion] = useState('');
    const [taskIdToEdit, setTaskIdToEdit] = useState('');
    useEffect(() => {
        fetchTasks();
      }, []);

// MANEJADORES O RESPUESTA A EVENTOS.
    
const fetchTasks = async () => {
        try {
          const response = await fetch('http://localhost:3000/tasks', { mode: 'cors' });
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };


const borrarTasks = async (taskId: string) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const handleInputChange2 = (event: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const agregarTask = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      setNewTask({ puntuacion:'', titulo: '', descripcion: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
  
    if (name === 'editarPuntuacion') {
      setEditarPuntuacion(value);
    }
  };
  
  const handleEditInputTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    if (name === 'editarTitulo') {
      setEditarTitulo(value);
    } else if (name === 'editarDescripcion') {
      setEditarDescripcion(value);
    }
  };
  
  
  


  const actualizarTask = async (taskId: string) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          puntuacion: editarPuntuacion,
          titulo: editarTitulo,
          descripcion: editarDescripcion,
        }),
      });
      setTaskIdToEdit('');
      setEditarPuntuacion('');
      setEditarTitulo('');
      setEditarDescripcion('');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

// RETURN DE REACT 
  

return (
 
    <Container   maxWidth="sm">
      <Typography variant="h3" component="h2" align="center" m={2}  color={'red'}>
        Reseñas
      </Typography>
      <Grid container spacing={2}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} key={task.id}>
              <TaskContainer >
                
                <Typography  variant="h6" component="p">
                  Titulo: {task.titulo}
                </Typography>
                <Typography variant="h6" component="p">
                  Puntuacion: {task.puntuacion}
                </Typography>
                <Typography variant="h6" component="p">
                  Descripcion: {task.descripcion}
                </Typography>
                {task.id === taskIdToEdit ? (
                  <>
                  <h3>Editar Puntucion: </h3>
                   <select name="editarPuntuacion" value={editarPuntuacion|| task.puntuacion } onChange={handleEditSelectChange} 
                   required style={{ marginTop: '2px', padding: '2px' }}>
                      <option value="">Seleccione una puntuación</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <h3>Editar Titulo: </h3>
                    <Input
                      type="text"
                      name="editarTitulo"
                      value={editarTitulo || task.titulo}
                      onChange={handleEditInputTextChange}
                      placeholder="Nuevo título"
                      required  style={{ margin: '2px', marginBottom: '2px', marginLeft:'2px' }}
                    />
                      <h3>Editar Descripcion: </h3>
                    <Input
                    
                      type="text"
                      name="editarDescripcion"
                      value={editarDescripcion || task.descripcion}
                      onChange={handleEditInputTextChange}
                      placeholder="Nueva descripción"
                      required
/>
                  </>
              
                ) : null}
                <MarginButton   variant="contained" color="error" onClick={() => borrarTasks(task.id)}>
                <DeleteIcon /> Eliminar
                </MarginButton> 
                {task.id === taskIdToEdit ? (
                  <MarginButton variant="contained" color="success" onClick={() => actualizarTask(task.id)}>
                    Guardar
                  </MarginButton>
                ) : (
                  <MarginButton variant="contained" onClick={() => setTaskIdToEdit(task.id)}>
                   <EditIcon />   Modificar
                  </MarginButton>
                )}
              </TaskContainer>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" component="p">
              No hay reseñas disponibles.
            </Typography>
          </Grid>
        )}
      </Grid>
      <FormContainer>
        <form  onSubmit={agregarTask}>
        <h2>Agregar Reseña</h2>
            
        <label htmlFor="puntuacion" style={{ fontSize: '50px' }}></label>
          <select id="outlined-basic" name="puntuacion" value={newTask.puntuacion} onChange={handleInputChange2} 
          required style={{ marginTop: '12px', padding: '12px' }}>

            <option value="">Seleccione una puntuación</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
         
          <PaddedTextField
            type="text"
            label="Titulo"
            id="outlined-basic"
            variant="outlined"
            name="titulo"
            placeholder="Título"
            value={newTask.titulo}
            onChange={handleInputChange}
            required
          />

          <PaddedTextField
            id="outlined-basic"
            label="Descripción"
            type="text"
            variant="outlined"
            name="descripcion"
            placeholder="Descripción"
            value={newTask.descripcion}
            onChange={handleInputChange}
            required
          />
          <MarginButton variant="contained" color="success" type="submit">
          <AddIcon />  Agregar
          </MarginButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Calificaciones;