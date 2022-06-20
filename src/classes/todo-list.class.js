import { Todo } from "./todo.class";

export class TodoList{
    constructor()
    {
       this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        this.todos = this.todos.filter(todo=> todo.id!=id);
        this.guardarLocalStorage();
    }

    marcarCompletado( id ){

        for (const iterator of this.todos) {
            if(iterator.id==id){
                iterator.completado=!iterator.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }

    eliminarCompletados( ){
        this.todos = this.todos.filter(todo=> !todo.completado);   
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo',JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos=localStorage.getItem('todo')
                    ?JSON.parse(localStorage.getItem('todo')).map(Todo.fromJson)
                    :[];
        //this.todos=this.todos.map(obj=> Todo.fromJson);
    }
}