import axios from "axios";
import { ITodo } from "../types/ITodo";

//GET
export const getTodos = async (): Promise<ITodo[] | []> => {
    try {
        let res = await axios.get<{ todos: ITodo[] }>('http://localhost:3000/api/todo/get/getall',
            {
                headers: { 'Cache-control': 'no-cache' }
            });
            console.log("res",res);
            
        return res.data.todos;
    }
    catch (error) {
        console.error(error)
        return [];
    }

}

//GET BY ID
export const getTodoById = async (id: string): Promise<ITodo | null> => {
    try {
        let res = await axios.get<{ todo: ITodo }>(`http://localhost:3000/api/todo/get/${id}`,
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        return res.data.todo;
    }
    catch (error) {
        console.error(error)
        return null;
    }

}



//DELETE BY ID
export const deleteTodoById = async (id: string): Promise<ITodo | null> => {
    try {
        let res = await axios.delete<{ todo: ITodo }>(`http://localhost:3000/api/todo/delete/${id}`,
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        return res.data.todo;
    }
    catch (error) {
        console.error(error)
        return null;
    }

}


//UPDATE BY ID
export const updateTodoById = async (id: string, newTodo: Partial<ITodo>): Promise<ITodo | null> => {
    try {
        let res = await axios.put<{ todo: ITodo }>(`http://localhost:3000/api/todo/put/${id}`,
            newTodo,
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        return res.data.todo;
    }
    catch (error) {
        console.error(error)
        return null;
    }

}

//CREATE 
export const createTodo = async (task: string): Promise<Partial<ITodo>| ITodo | null> => {
    try {
        let res = await axios.post(`http://localhost:3000/api/todo/post`,
            { task },
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        console.log("in create todo actions", task);
        console.log("res.data.todo", res.data.todo);
        console.log("res",res);
        if (res.data.status === 500) {
            console.error("Server error creating todo:", res.data.message);
            return null;
        }
        if (res.data.todo)
            return res.data.todo;
        else
            return null;
    }
    catch (error) {
        console.error(error)
        return null;
    }

}


