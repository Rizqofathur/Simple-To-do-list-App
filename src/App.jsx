import { useState } from 'react';
import './app.css'

function App() {
  const [ activity, setActivity ] = useState('');
  const [ todos, setTodos ] = useState([]);
  const [ edit, setEdit ] = useState({});
  const [ message, setMessage ] = useState('');

  function getId(){
   return Date.now();
  }

  function cancelEditHandler() {
    setEdit({});
    setActivity('');
  }



  function saveTodoHandler( event ){
    event.preventDefault();
    if(!activity){
      return setMessage('please fill out this field!');
    }
    setMessage('');
    if( edit.id ){
      const updatedTodo = {
        ...edit,
        activity
      };

      const editTodoIndex = todos.findIndex( function( todo ){
        return todo.id == edit.id;
      } );

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;

      setTodos(updatedTodos);
      return cancelEditHandler();
    }

   

    setTodos( [...todos, {
      id : getId(),
      activity : activity,
      done : false
    }] );
    setActivity('');
  }

  function editItemHandler( todo ){
    setActivity( todo.activity );
    setEdit( todo );
  }

  function doneTodoHandler( todo ){
    const updatedTodo = {
      ...todo,
      done : todo.done ? false : true
    }
    
    const editTodoIndex = todos.findIndex(function (currentTodo) {
      return currentTodo.id == todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  }

  function removeItemHandler( itemId ){
    const filteredItem = todos.filter( function( todo ){
      return todo.id !== itemId;
    } )

    setTodos( filteredItem );
    if( edit.id ){ cancelEditHandler(); }
  }


  return (
    <>
      <div className="container">
        <div className="container-wrap">
          <h3>To do list App</h3>
          <div className="wrapper">
            <form className="form-input" onSubmit={ saveTodoHandler }>
              <div className="input-group">
                <input type="text" placeholder="add an activity..." value={activity} onChange={(event) => setActivity(event.target.value)} />
              </div>
              <div className="button">
                <button type="submit">{edit.id ? 'Save change' : 'Add item'}</button>
                { edit.id && <button onClick={ cancelEditHandler }>Cancel</button>}
              </div>
            </form>
            { message && <p className="text-warning">{ message }</p> }
            <div className="list-results">
              <h3>Today&apos;s activity : </h3>
              { todos.length > 0 ? 
              (<ul className="list-item">
                {todos.map((todo) => (
                  <div key={todo.id} className="item">
                    <p className="item-text">
                      <input 
                        type="checkbox" 
                        style={{marginRight : 6}} 
                        onChange={ doneTodoHandler.bind(this, todo) }
                        checked= { todo.done }
                       />
                      {todo.activity + ' '}
                      ({ todo.done ? 'Finish' : 'Unfinish'})
                    </p>
                    <div className="button-wrapper">
                      <button className="edit-button" onClick={editItemHandler.bind(this, todo)}>
                        Edit
                      </button>
                      <button className="delete-button" onClick={removeItemHandler.bind(this, todo.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </ul>) 
              : <p>Add the activity</p>
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
