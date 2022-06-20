 import {Todo} from '../classes'
 import {todoList} from '../index.js'
 const divTodoList=document.querySelector('.todo-list');
 const txtInput=document.querySelector('.new-todo');
 const borraTodo=document.querySelector('.clear-completed')

 const filtro=document.querySelector('.filters');
 const anchorFiltros=document.querySelectorAll('.filtro');

 const cp = document.querySelector('#CP');

export const crearTodoHtml=(todo)=>{

    const htmlTodo=`
    <li class="${todo.completado?'completed':''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado?'checked':''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div= document.createElement('div');
    div.innerHTML=htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
} 

txtInput.addEventListener('keyup',(event)=>{
    if(event.keyCode===13 && txtInput.value.length>0){
        const nuevoTodo=new Todo(txtInput.value);
        txtInput.value='';
        todoList.nuevoTodo(nuevoTodo);
        updatePendientes(todoList.todos.filter(elemt=> !elemt.completado).length);
        crearTodoHtml(nuevoTodo);       
    }
});

divTodoList.addEventListener('click',(event)=>{
    
    const nombreElemento=event.target.localName;
    const todoElemento=event.target.parentElement.parentElement;
    const todoId=todoElemento.getAttribute('data-id');
    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        updatePendientes(todoList.todos.filter(elemt=> !elemt.completado).length);
        todoElemento.classList.toggle('completed');
    }
    if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        updatePendientes(todoList.todos.filter(elemt=> !elemt.completado).length);
        divTodoList.removeChild(todoElemento);
    }
});

export const updatePendientes=(cant)=>{
    cp.innerHTML=cant;
}

borraTodo.addEventListener('click',()=>{
    anchorFiltros.forEach(element => element.classList.remove('selected'));
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length-1; i>=0;i--){
        const elemento=divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
    updatePendientes(todoList.todos.length);
});

filtro.addEventListener('click',(event)=>{
    const text=event.target.text;
    if(!text) {return;}

    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado=elemento.classList.contains('completed');
        switch (text) {
            case 'Pendientes':{
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            }
            case 'Completados':{
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
            }
            default:
                break;
        }    
    }
});
