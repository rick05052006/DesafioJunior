import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook de navegação
import "./style.css";

const Home = () => {
  // Simulação de usuários cadastrados
  const users = [
    { email: "ryan@teste.com", password: "123456" },
    { email: "ryan2@teste.com", password: "654321" },
  ];

  // Estados para os campos e mensagens
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hook de navegação
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }

    // Validação de senha
    if (password.length < 6) {
      setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Verifica se o usuário existe
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      setErrorMessage("");
      // Redireciona para a página de produtos
      navigate("/produtos");
    } else {
      setErrorMessage("E-mail ou senha incorretos.");
    }
  };

  const handleCadastro = () => {
    // Navega para a página de cadastro
    navigate("/cadastros");
  };

  return (
    <div className="container" id="login-screen">
      <p className="title">Faça seu login</p>

      {/* Formulário de login */}
      <label htmlFor="email" className="label">
        E-mail:
      </label>
      <input
        type="text"
        id="email"
        className="input"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password" className="label">
        Senha:
      </label>
      <input
        type="password"
        id="password"
        className="input"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="login-button2" onClick={handleLogin}>
        Entrar
      </button>

      {errorMessage && (
        <h5 id="error-message" style={{ color: "red" }}>
          {errorMessage}
        </h5>
      )}

      <br />

      <button className="button-cadastro" onClick={handleCadastro}>
        Cadastrar produto
      </button>
    </div>
  );
};

export default Home;
