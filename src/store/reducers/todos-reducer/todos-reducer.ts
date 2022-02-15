import {ITodo, todosAPI} from '../../../api/todos-api';
import {TAppThunk} from '../../store';

const SET_TODOS = 'todolist/todosReducer/SET_TODOS';
const EDIT_TODO = 'todolist/todosReducer/EDIT_TODO';
const CREATE_TODO = 'todolist/todosReducer/CREATE_TODO';
const DELETE_TODO = 'todolist/todosReducer/DELETE_TODO';
const DISABLE_TODO = 'todolist/todosReducer/DISABLE_TODO';
const ENABLE_TODO = 'todolist/todosReducer/ENABLE_TODO';
const TEST_ACTION = 'todolist/todosReducer/TEST_ACTION';
const INITIAL_STATE = {
    todos: [],
    disabledTodos: []
};

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
        case DISABLE_TODO:
            return {
                ...state,
                disabledTodos: [...state.disabledTodos, action.id]
            }
        case ENABLE_TODO:
            return {
                ...state,
                disabledTodos: state.disabledTodos.filter(i => i !== action.id)
            }
        default:
            return state;
    }
};

export const setTodosAC = (todos: ITodo[]) => ({type: SET_TODOS, payload: {todos}} as const);
export const createTodoAC = (todo: ITodo) => ({type: CREATE_TODO, todo} as const);
export const editTodoAC = (todo: ITodo) => ({type: EDIT_TODO, todo} as const);
export const deleteTodoAC = (id: number) => ({type: DELETE_TODO, id} as const);
export const disableTodoAC = (id: number) => ({type: DISABLE_TODO, id} as const);
export const enableTodoAC = (id: number) => ({type: ENABLE_TODO, id} as const);
export const testAC = () => ({type: TEST_ACTION} as const);

export const fetchTodos = (): TAppThunk => async dispatch => {
    try {
        const response = await todosAPI.fetchTodos();

        dispatch(setTodosAC(response));

    } catch (err) {
        console.error(err);
    }
};

export const createTodo = (title: string, id?: number): TAppThunk => async dispatch => {
    try {
        const uniqueId = id || Date.now();

        await todosAPI.createTodo(1, uniqueId, title, false);

        dispatch(createTodoAC({userId: 1, id: uniqueId, title, completed: false}));

    } catch (err) {
        console.error(err);
    }
};

export const editTodo = (id: number, title: string, completed: boolean): TAppThunk => async dispatch => {
    try {
        dispatch(disableTodoAC(id));

        await todosAPI.editTodo(1, id, title, completed);

        dispatch(editTodoAC({userId: 1, id, title, completed}));
        dispatch(enableTodoAC(id));
    } catch (err) {
        console.error(err);
    }
};

export const deleteTodo = (id: number): TAppThunk => async dispatch => {
    try {
        dispatch(disableTodoAC(id));
        await todosAPI.deleteTodo(id);

        dispatch(deleteTodoAC(id));
        dispatch(enableTodoAC(id));
    } catch (err) {
        console.error(err);
    }
};

interface ITodosState {
    todos: ITodo[]
    disabledTodos: number[]
}

export type TTodosActions =
    | TSetTodosAC
    | TCreateTodoAC
    | TEditTodoAC
    | TDeleteTodoAC
    | TDisableTodoAC
    | TEnableTodoAC
    | TTestAC;

type TSetTodosAC = ReturnType<typeof setTodosAC>;
type TCreateTodoAC = ReturnType<typeof createTodoAC>;
type TEditTodoAC = ReturnType<typeof editTodoAC>;
type TDeleteTodoAC = ReturnType<typeof deleteTodoAC>;
type TDisableTodoAC = ReturnType<typeof disableTodoAC>;
type TEnableTodoAC = ReturnType<typeof enableTodoAC>;
type TTestAC = ReturnType<typeof testAC>;