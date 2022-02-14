import {ITodo, todosAPI} from '../../api/todos-api';
import {TAppThunk} from '../store';

const SET_TODOS = 'todolist/todosReducer/SET_TODOS';
const EDIT_TODO = 'todolist/todosReducer/EDIT_TODO';
const CREATE_TODO = 'todolist/todosReducer/CREATE_TODO';
const DELETE_TODO = 'todolist/todosReducer/DELETE_TODO';
const INITIAL_STATE = { todos: [] };

export const todosReducer = (state: ITodosState = INITIAL_STATE, action: TTodosActions) => {
    switch (action.type) {
        case SET_TODOS:
            return {
                ...state,
                ...action.payload
            }
        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(i => i.id === action.todo.id ? action.todo : i)
            }
        case CREATE_TODO:
            return {
                ...state,
                todos: [action.todo, ...state.todos]
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(i => i.id !== action.id)
            }
        default:
            return state;
    }
};

const setTodosAC = (todos: ITodo[]) => ({type: SET_TODOS, payload: {todos}} as const);
const createTodoAC = (todo: ITodo) => ({type: CREATE_TODO, todo} as const);
const editTodoAC = (todo: ITodo) => ({type: EDIT_TODO, todo} as const);
const deleteTodoAC = (id: number) => ({type: DELETE_TODO, id} as const);

export const fetchTodos = (): TAppThunk => async dispatch => {
    try {
        const response = await todosAPI.fetchTodos();

        dispatch(setTodosAC(response));

    } catch (err) {
        console.error(err);
    }
};

export const createTodo = (title: string): TAppThunk => async dispatch => {
    try {
        const id = Date.now();

        await todosAPI.createTodo(1, id, title, false);

        dispatch(createTodoAC({userId: 1, id, title, completed: false}));

    } catch (err) {
        console.error(err);
    }
};

export const editTodo = (id: number, title: string, completed: boolean): TAppThunk => async dispatch => {
    try {
        await todosAPI.createTodo(1, id, title, completed);

        dispatch(editTodoAC({userId: 1, id, title, completed}));

    } catch (err) {
        console.error(err);
    }
};

export const deleteTodo = (id: number): TAppThunk => async dispatch => {
    try {
        await todosAPI.deleteTodo(id);

        dispatch(deleteTodoAC(id));

    } catch (err) {
        console.error(err);
    }
};

interface ITodosState { todos: ITodo[] }

export type TTodosActions =
    | TSetTodos
    | TCreateTodo
    | TEditTodoAC
    | TDeleteTodo;

type TSetTodos = ReturnType<typeof setTodosAC>
type TCreateTodo = ReturnType<typeof createTodoAC>
type TEditTodoAC = ReturnType<typeof editTodoAC>
type TDeleteTodo = ReturnType<typeof deleteTodoAC>