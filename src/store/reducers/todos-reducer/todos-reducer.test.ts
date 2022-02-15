import {
    createTodo,
    createTodoAC, deleteTodo,
    deleteTodoAC,
    disableTodoAC, editTodo,
    editTodoAC,
    enableTodoAC, fetchTodos,
    setTodosAC, testAC,
    todosReducer
} from './todos-reducer';
import {todosAPI} from '../../../api/todos-api';

jest.mock('../../../api/todos-api');

describe('Todos reducer test`s', () => {

    it('should be set todos', () => {
        const state = {
            todos: [],
            disabledTodos: []
        };

        const result = todosReducer(state, setTodosAC([
            {id: 1, userId: 1, title: 'first', completed: false},
            {id: 2, userId: 1, title: 'second', completed: true},
        ]));

        expect(result.todos.length).toBe(2);
        expect(result).not.toBe(state);
    });

    it('should be create todo', () => {
        const state = {
            todos: [{id: 1, userId: 1, title: 'first', completed: false}],
            disabledTodos: []
        };

        const result = todosReducer(state, createTodoAC({
            id: 2,
            userId: 1,
            title: 'test',
            completed: true
        }));

        expect(result.todos.length).toBe(2);
        expect(result.todos[0].title).toBe('test');
        expect(result).not.toBe(state);
    });

    it('should be edit todo', () => {
        const state = {
            todos: [
                {id: 1, userId: 1, title: 'first', completed: false},
                {id: 2, userId: 1, title: 'second', completed: true},
            ],
            disabledTodos: []
        };

        const result = todosReducer(state, editTodoAC({
            id: 2,
            userId: 1,
            title: 'test',
            completed: true
        }));

        expect(result.todos.length).toBe(2);
        expect(result.todos[1].title).toBe('test');
        expect(result).not.toBe(state);
    });

    it('should be delete todo', () => {
        const state = {
            todos: [
                {id: 1, userId: 1, title: 'first', completed: false},
                {id: 2, userId: 1, title: 'second', completed: true},
            ],
            disabledTodos: []
        };

        const result = todosReducer(state, deleteTodoAC(2));

        expect(result.todos.length).toBe(1);
        expect(result.todos[0].title).toBe('first');
        expect(result).not.toBe(state);
    });

    it('should be disable todo', () => {
        const state = {
            todos: [],
            disabledTodos: [1]
        };

        const result = todosReducer(state, disableTodoAC(2));

        expect(result.disabledTodos.length).toBe(2);
        expect(result.disabledTodos[1]).toBe(2);
        expect(result).not.toBe(state);
    });

    it('should be enable todo', () => {
        const state = {
            todos: [],
            disabledTodos: [1, 2]
        };

        const result = todosReducer(state, enableTodoAC(1));

        expect(result.disabledTodos.length).toBe(1);
        expect(result.disabledTodos[0]).toBe(2);
        expect(result).not.toBe(state);
    });

    it('should be render with someone else`s action', () => {
        const state = {
            todos: [{id: 1, userId: 1, title: 'first', completed: false}],
            disabledTodos: [1, 2]
        };

        const result = todosReducer(state, testAC());

        expect(result.todos.length).toBe(1);
        expect(result.disabledTodos.length).toBe(2);
        expect(result).toBe(state);
    });
});

describe('Todos thunks test`s', () => {

    const todosAPIMock = todosAPI as jest.Mocked<typeof todosAPI>;

    todosAPIMock.fetchTodos.mockReturnValue(Promise.resolve([
        {id: 1, userId: 1, title: 'first', completed: false},
        {id: 2, userId: 1, title: 'second', completed: true},
    ]));

    todosAPIMock.createTodo.mockReturnValue(Promise.resolve({
        id: 1,
        title: 'test',
        completed: true,
        userId: 2
    }));

    it('fetch todos', async () => {
        const thunk = fetchTodos();
        const dispatch = jest.fn();
        const getState = jest.fn();

        await thunk(dispatch, getState, {});

        expect(dispatch).toBeCalledTimes(1);
    });

    it('create todos', async () => {
        const thunk = createTodo('test', 234);
        const dispatch = jest.fn();
        const getState = jest.fn();

        await thunk(dispatch, getState, {});

        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(createTodoAC({
            id: 234,
            title: 'test',
            completed: false,
            userId: 1
        }));
    });

    it('edit todo', async () => {
        const thunk = editTodo(234, 'test', true);
        const dispatch = jest.fn();
        const getState = jest.fn();

        await thunk(dispatch, getState, {});

        expect(dispatch).toBeCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, disableTodoAC(234));
        expect(dispatch).toHaveBeenNthCalledWith(2, editTodoAC({
            userId: 1,
            id: 234,
            title: 'test',
            completed: true
        }));
        expect(dispatch).toHaveBeenNthCalledWith(3, enableTodoAC(234));
    });

    it('delete todo', async () => {
        const thunk = deleteTodo(234);
        const dispatch = jest.fn();
        const getState = jest.fn();

        await thunk(dispatch, getState, {});

        expect(dispatch).toBeCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, disableTodoAC(234));
        expect(dispatch).toHaveBeenNthCalledWith(2, deleteTodoAC(234));
        expect(dispatch).toHaveBeenNthCalledWith(3, enableTodoAC(234));
    });
});