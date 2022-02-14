import {instance} from './api';

export const todosAPI = {

    fetchTodos(): Promise<ITodo[]> {
        return instance
            .get<ITodo[]>('/todos')
            .then(res => res.data)
            .catch(err => err)
    },

    createTodo(userId: number, id: number, title: string, completed: boolean): Promise<ITodo> {
        return instance
            .post<ITodo>('/todos', {userId, id, title, completed})
            .then(res => res.data)
            .catch(err => err)
    },

    editTodo(userId: number, id: number, title: string, completed: boolean): Promise<ITodo> {
        return instance
            .put<ITodo>(`/todos/${id}`, {userId, id, title, completed})
            .then(res => res.data)
            .catch(err => err)
    },

    deleteTodo(id: number): Promise<{}> {
        return instance
            .delete<{}>(`/todos/${id}`)
            .then(res => res.data)
            .catch(err => err)
    },
};

export interface ITodo {
    userId: number
    id: number
    title: string
    completed: boolean
}