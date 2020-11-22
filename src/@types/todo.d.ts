export type TodoStatus = 'complete' | 'unComplete';

export type TodoItem = {
  _id: string;
  name: string;
  status: TodoStatus;
};

export type TodoList = Array<TodoItem>;