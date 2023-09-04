import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Button, Container, Typography, Grid, TextField} from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { format } from 'date-fns';



// INTERFACE 
interface Task {
    id: string;
    fecha: Date;
    puntuacion: string;
    titulo: string;
    descripcion: string;
    
  }

// ESTILOS 
 
  const FormContainer = styled(Container)({
    border: '2px solid',
    borderColor: 'black',
    borderRadius: '20px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#C9D6FE' 
    
  });
  
  const TaskContainer = styled('div')({
    border: '2px solid',
    borderColor: 'black',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '10px',
    backgroundColor: '#DBE3FC' 
  });
  
  const MarginButton = styled(Button)({
    margin: '2px',
  marginInline: '28px',
  borderRadius: '20px',
  border: '2px solid',

  });
  
  const PaddedTextField = styled(TextField)({
    width: '100%',
    backgroundColor: '#E3F2FA' 

  });
  const PaddedSelect = styled('select')({
    width: '100%',
    backgroundColor: '#E3F2FA',
    padding: '8px',
    borderRadius: '4px', 
    border: '1px solid #ccc', 
  });


const Calificaciones = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [originalTasks, setOriginalTasks] = useState<Task[]>([]); 
    const [filterDate, setFilterDate] = useState<Date | null>(null)
    const [newTask, setNewTask] = useState<{ fecha: Date; puntuacion: string;  titulo: string; descripcion: string; }>({
        fecha: new Date(2023, 7, 29),
        puntuacion:'',
        titulo: '',
        descripcion: '',
    });
    const [editarFecha, setEditarFecha] = useState('');
    const [editarPuntuacion, setEditarPuntuacion] = useState('');
    const [editarTitulo, setEditarTitulo] = useState('');
    const [editarDescripcion, setEditarDescripcion] = useState('');
    const [taskIdToEdit, setTaskIdToEdit] = useState('');

;
    useEffect(() => {
        fetchTasks();
      }, []);


    
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
      setNewTask({ fecha: new Date(2023, 7, 29), puntuacion:'', titulo: '', descripcion: '' });
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
    }else if (name === 'editarFecha') {
      setEditarFecha(value);
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
          fecha: editarFecha,
          puntuacion: editarPuntuacion,
          titulo: editarTitulo,
          descripcion: editarDescripcion,
        }),
      });
      setTaskIdToEdit('');
      setEditarFecha('');
      setEditarPuntuacion('');
      setEditarTitulo('');
      setEditarDescripcion('');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  
  
  const restoreOriginalTasks = () => {
    setTasks([...originalTasks]);
  };
   const restoreButton = (
    <Button variant="contained" color="primary" onClick={restoreOriginalTasks}>
      Restaurar
    </Button>
  );

 
  const buscar = async () => {
    try {
      if (filterDate) {
        const formattedDate = format(filterDate, 'yyyy-MM-dd');
        const response = await fetch(
          `http://localhost:3000/tasks/filter-by-date?filterDate=${formattedDate}`,
          { mode: 'cors' }
        );
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching filtered tasks:', error);
    }
  };
// RETURN DE REACT 
  
return (
  
 
  <Container maxWidth="sm">
  <Typography variant="h3" component="h2" align="center" m={2} color={'red'}>
    Reseñas
  </Typography>
  <h2>Buscar Reseña por Fecha</h2>
  <PaddedTextField
    type="date"
    value={filterDate ? filterDate.toISOString().split('T')[0] : ''}
    onChange={(event) => {
      const selectedDate = new Date(event.target.value);
      setFilterDate(selectedDate);
    }}
  />
  
  <Button variant="contained" color="primary" onClick={buscar}>
        Buscar
      </Button>
  
  {originalTasks.length > 0 && restoreButton}
  <br></br>
  <br></br>

                  <Grid container spacing={2}>
                    {tasks.length > 0 ? (
                      tasks.map((task) => (
                        <Grid item xs={12} key={task.id}>
                          <TaskContainer>
                            <hr></hr>
                            <Typography variant="h6" component="p">
                              Fecha: {new Date(task.fecha).toISOString().split('T')[0]}
                            </Typography>
                            <Typography variant="h6" component="p">
                              Titulo: {task.titulo}
                            </Typography>
                            <Typography variant="h6" component="p">
                              Puntuacion: {task.puntuacion}
                            </Typography>
                            <Typography variant="h6" component="p">
                              Descripcion: {task.descripcion}
                            </Typography>
                            <hr></hr>

                          {task.id === taskIdToEdit ? (
                            <><h3>Editar Fecha: </h3>
            
                    <PaddedTextField
                      type="date"
                      name="editarFecha"
                      value={editarFecha || task.fecha}
                      onChange={handleEditInputTextChange}
                      placeholder="Nueva Fecha"
                      required  style={{ margin: '2px', marginBottom: '2px', marginLeft:'2px' }}
                    />
                  <h3>Editar Puntucion: </h3>
                   <PaddedSelect name="editarPuntuacion" value={editarPuntuacion|| task.puntuacion } onChange={handleEditSelectChange} 
                   required style={{ marginTop: '2px', padding: '2px' }}>
                      <option value="">Seleccione una puntuación</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </PaddedSelect>
                    <h3>Editar Titulo: </h3>
                    <PaddedTextField
                      type="text"
                      name="editarTitulo"
                      value={editarTitulo || task.titulo}
                      onChange={handleEditInputTextChange}
                      placeholder="Nuevo título"
                      required  style={{ margin: '2px', marginBottom: '2px', marginLeft:'2px' }}
                    />
                      <h3>Editar Descripcion: </h3>
                    <PaddedTextField
                    
                      type="text"
                      name="editarDescripcion"
                      value={editarDescripcion || task.descripcion}
                      onChange={handleEditInputTextChange}
                      placeholder="Nueva descripción"
                      required/>
                      <br></br>
                      <br></br>
                  <MarginButton variant="contained" color="warning" onClick={() => location.reload()}>
                  <SaveIcon /> Cancelar
                </MarginButton>
                  </>      
                ) : null}
                  <br></br>
                  <br></br>
                <MarginButton   variant="contained" color="error" onClick={() => borrarTasks(task.id)}>
                <DeleteIcon /> Eliminar
                </MarginButton> 
              
                {task.id === taskIdToEdit ? (
                  <MarginButton variant="contained" color="success" onClick={() => actualizarTask(task.id)}>
                      <SaveIcon />  Guardar
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
        <hr></hr>
        <h4>Fecha:</h4>
        <PaddedTextField
            type="date"
            id="outlined-basic"
            variant="outlined"
            name="fecha"
            placeholder="fecha"
            value={newTask.fecha.toISOString().split('T')[0]}
            onChange={handleInputChange}
            required
          />
            
      <h4>Selecione una puntuacion:</h4>
        <label htmlFor="puntuacion" ></label>
          <PaddedSelect id="puntuacion" name="puntuacion" value={newTask.puntuacion} onChange={handleInputChange2} 
          required style={{ marginTop: '12px', padding: '12px' }}>

            <option value=" 1 ">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </PaddedSelect>
          <h4>Ingrese  un Titulo:</h4>
          <PaddedTextField
            type="text"
            id="outlined-basic3"
            variant="outlined"
            name="titulo"
            placeholder="Título"
            value={newTask.titulo}
            onChange={handleInputChange}
            required
          />
          <h4>Ingrese  Una Descripcion:</h4>
          <PaddedTextField
            id="outlined-basic4"
            type="text"
            variant="outlined"
            name="descripcion"
            placeholder="Descripción"
            value={newTask.descripcion}
            onChange={handleInputChange}
            required
       
          />
          <br></br>
          <br></br>
          <MarginButton variant="contained" color="success" type="submit">
          <AddIcon />  Agregar
          </MarginButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Calificaciones;