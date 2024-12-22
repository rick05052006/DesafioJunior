import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Cadastros() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const saveProduct = (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!name || isNaN(price) || price <= 0) {
      alert('Preencha os campos corretamente.');
      return;
    }

    // Obter a lista de produtos existente no localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Criar o novo produto
    const newProduct = { id: Date.now(), name, price: parseFloat(price) };

    // Adicionar o novo produto à lista
    const updatedProducts = [...products, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Redirecionar para a página de produtos
    navigate('/produtos');
  };

  return (
    <div className="container">
      <h1>Cadastrar Produto</h1>
      <form onSubmit={saveProduct}>
        <label className="label">Nome do Produto:</label>
        <input
          type="text"
          className="input"
          placeholder="Digite o nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="label">Preço:</label>
        <input
          type="number"
          className="input"
          placeholder="Digite o preço do produto"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
        <button type="submit" className="save-button">
          Salvar Produto
        </button>
      </form>
    </div>
  );
}

export default Cadastros;
