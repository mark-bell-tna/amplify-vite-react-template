import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();
const nameId = 100123;
  const fetchData = async() => {
     console.log("Fetching data");
     //setFetching(true);
     let data;
     let url = process.env.REACT_APP_API_ROOT + 'name?nameid=' + nameId;
     console.log(url);
     const response = await(fetch(process.env.REACT_APP_API_ROOT + 'name?nameid=' + nameId));
     if(!response.ok) {
       throw new Error('Bad response: ' + response.status);
      }
      data = await(response.json());
     console.log(data);
     //setFetching(false);
   }

function App() {
  const { signOut } = useAuthenticator();
  fetchData();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
