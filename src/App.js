import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] =useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Digite um CEP válido!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setCep(response.data)
      setInput("");

    } catch (error) {

      alert("Ops, erro ao buscar: " + error.message);
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">CEP Finder</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="DIGITE SEU CEP . . ."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='white' />
        </button>
      </div> 

      {Object.keys(cep).length > 0 && ( 
            <main className='main'>
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>

          </main>

      )}
      
    </div>
  );
}

export default App;
