import { getElementError } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import api from './services/api';
// import { v4 as uuidv4 } from 'uuid'
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
     api.get('repositories').then(response => {
    setRepositories(response.data)
    });
  }, [])

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title:`Repository Nr. ${repositories.length + 1}`,
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);

    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))}
      </ul>

    
    </div>
  );
}

export default App;
