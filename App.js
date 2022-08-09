import React from 'react';
import {render} from 'react-dom';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

let id = 0;

const ToDo = props => (
  <li>
    <input type="checkbox" checked={props.checked} onChange={props.onToggle}/>
    <button onClick={props.onDelete}>delete</button>
    <span>{props.todo.text}</span>
  </li>
)

export default class App extends React.Component {
  constructor(){
    super()
    this.state={
      todo: [],
    }
  }

  toggleTodo(id){
    this.setState({
      todo: this.state.todo.map(todo => {
        if(todo.id !== id){
          return todo
        }
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        }
      })
    })
  }

  removeTodo(id){
    this.setState({
      todo: this.state.todo.filter(todo => todo.id !== id)
    })
  }  

  addTodo(){
    const text = prompt("TODO text please!")
    this.setState({
      todo: [...this.state.todo, {id: id++, text: text, checked: false}],
    })
  }
  render(){
    return(
      <div>
        <div>
         ToDo count: {this.state.todo.length} 
        </div>
        <div>
          unchecked Count: {this.state.todo.filter(todo => todo.checked === false).length}
        </div>
      <button onClick={()=>this.addTodo()}>
        Add TODO
      </button>
      <ul>
        {this.state.todo.map(todo => (<ToDo
          onToggle={()=>this.toggleTodo(todo.id)}
          onDelete={()=>this.removeTodo(todo.id)}
          todo={todo} />)
        )}
      </ul>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));