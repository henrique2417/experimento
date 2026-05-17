import React, { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // 1. Adicionar item
  const handleAddTodo = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue(''); // Limpa o campo de entrada
  };

  // 2. Marcar como concluído (Toggle)
  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 3. Remover item
  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>Minha Lista de Tarefas</h2>

      {/* Formulário para adicionar item */}
      <form onSubmit={handleAddTodo} style={styles.form}>
        <input
          type="text"
          placeholder="Digite uma nova tarefa..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Adicionar
        </button>
      </form>

      {/* Lista de tarefas */}
      <ul style={styles.list}>
        {todos.length === 0 ? (
          <p style={styles.emptyMessage}>Nenhuma tarefa por aqui ainda!</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} style={styles.listItem}>
              <span
                onClick={() => handleToggleComplete(todo.id)}
                style={{
                  ...styles.todoText,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : '#000',
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleRemoveTodo(todo.id)}
                style={styles.removeButton}
              >
                Excluir
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

// Estilos inline simples para visualização imediata
const styles = {
  container: {
    maxWidth: '400px',
    margin: '30px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
  },
  form: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px 0 0 4px',
    outline: 'none',
  },
  addButton: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  todoText: {
    flex: 1,
    cursor: 'pointer',
    userSelect: 'none',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#777',
    fontStyle: 'italic',
  },
};