import { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init)
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos) || [])
    }, [todos])



    const handleNewTodo = (todo) => {
        // 1
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch(action);
        // 1) creo la accion y se la mando al reducer para hacer el dispatch
        // 2) esta accion va a caer en el reducer e indica que tengo la accion, tengo el caso de uso y valida para regresar como un nuevo state
    }

    const handleDeletTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

    return {
        todos,
        todosCount:  todos.length,
        pendingTodosCount:  todos.filter(todo => !todo.done).length,
        handleDeletTodo,
        handleToggleTodo,
        handleNewTodo
    }
}

