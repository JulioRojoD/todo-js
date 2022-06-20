import './styles.css';
import {Todo,TodoList} from './classes'
import { crearTodoHtml,updatePendientes } from './js/componentes';

export const todoList=new TodoList();

todoList.todos.forEach(todo => crearTodoHtml(todo));
updatePendientes(todoList.todos.filter(ele=> !ele.completado).length);


//const tarea=new Todo('Aprender JS');
//todoList.nuevoTodo(tarea);

console.log({todoList});

//crearTodoHtml(tarea);
