import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import './produtos.css';

function Produtos() {
  const navigate = useNavigate();

  // Produtos predefinidos
  const initialProducts = [
    { id: 1, name: "Produto A", price: 100.0 },
    { id: 2, name: "Produto B", price: 150.0 },
    { id: 3, name: "Produto C", price: 200.0 },
    { id: 4, name: "Produto D", price: 250.0 },
    { id: 5, name: "Produto E", price: 300.0 },
  ];

  const [products, setProducts] = useState([]);

  // Carrega produtos do localStorage ou usa os predefinidos
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const allProducts = [...initialProducts, ...savedProducts.filter(
      (p) => !initialProducts.some((ip) => ip.name === p.name)
    )]; // Evita duplicar produtos predefinidos
    setProducts(allProducts);
    localStorage.setItem('products', JSON.stringify(allProducts));
  }, []);

  const deleteProduct = (index) => {
    const productName = products[index].name;

    // Impede a exclusão dos produtos A, B, C, D e E
    const protectedProducts = ["Produto A", "Produto B", "Produto C", "Produto D", "Produto E"];
    if (protectedProducts.includes(productName)) {
      alert(`O produto ${productName} não pode ser excluído.`);
      return;
    }

    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="container">
      <h1 className="title">Produtos Disponíveis</h1>

      {products.length > 0 ? (
        <ul>
          {products.map((product, index) => (
            <li key={product.id || index} className="produto-item">
              <span>
                {product.name} - R$ {product.price.toFixed(2)}
              </span>
              {/* Botão de exclusão só aparece se o produto não for protegido */}
              {!["Produto A", "Produto B", "Produto C", "Produto D", "Produto E"].includes(product.name) && (
                <button className="delete-button" onClick={() => deleteProduct(index)}>
                  Excluir
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto cadastrado.</p>
      )}

      <div className="actions">
        <button className="action-button" onClick={() => navigate('/cadastros')}>
          Cadastrar Produto
        </button>
        <button className="action-button" onClick={() => navigate('/')}>
          Voltar ao Login
        </button>
      </div>
    </div>
  );
}

export default Produtos;
