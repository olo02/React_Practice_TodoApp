import { useRef, useCallback, useReducer } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );

    default:
      return todos;
  }
}

const App = () => {
  // 변형 useState
  //const [todos, setTodos] = useState(createBulkTodos);

  // 변형2 useReducer
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  //   [
  //   // 기본 data
  //   {
  //     id: 1,
  //     text: '정처기 문제 풀이',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '블로그 업로드',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: '깃 커밋',
  //     checked: false,
  //   },
  // ]

  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    //setTodos((todos) => [].concat(todos.unshift(todo)));
    dispatch({ type: 'INSERT', todo });
    //todos.unshift(todo);
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id, text, checked) => {
    const todochk = {
      id: id,
      text: text,
      checked: checked,
    };
    if (!todochk.checked) {
      //setTodos(todos.filter((todo) => todo.id !== id));
      //todos.push(todochk);
    }
    dispatch({ type: 'TOGGLE', id, text, checked });
    console.log(todochk);
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
