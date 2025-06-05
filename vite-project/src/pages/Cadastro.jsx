import React, { useState } from 'react';
import axios from 'axios';

export function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado para armazenar login, senha e confirmação de senha
  const [cadastro, setCadastro] = useState({
    login: "",
    senha: "",
    resenha: ""
  });

  // Atualiza o campo correspondente em `cadastro` quando o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCadastro((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Função disparada ao clicar em “Cadastrar”
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validações simples
    if (!cadastro.login.trim()) {
      setError("O campo 'login' não pode ficar vazio.");
      return;
    }

    if (cadastro.senha.length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    if (cadastro.senha !== cadastro.resenha) {
      setError("As senhas não conferem.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/insert", {
        login: cadastro.login,
        senha: cadastro.senha,
        table: "autor"
      });
      alert("Cadastro feito com sucesso!");
      setCadastro({
        login: "",
        senha: "",
        resenha: ""
      });
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setError("Não foi possível concluir o cadastro. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white flex justify-center items-start pt-40">
      <form
        className="w-full max-w-md bg-gray-50 p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6">Cadastro de Usuário</h2>

        {error && (
          <div className="mb-4 text-red-600">
            {error}
          </div>
        )}

        {/* Login */}
        <label className="block mb-2" htmlFor="login">
          Insira o login:
        </label>
        <input
          id="login"
          name="login"
          type="text"
          placeholder="Digite seu login"
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={cadastro.login}
          onChange={handleChange}
        />

        {/* Senha */}
        <label className="block mb-2" htmlFor="senha">
          Insira a senha:
        </label>
        <input
          id="senha"
          name="senha"
          type="password"
          placeholder="Digite sua senha"
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={cadastro.senha}
          onChange={handleChange}
        />

        {/* Resenha */}
        <label className="block mb-2" htmlFor="resenha">
          Redigite a senha:
        </label>
        <input
          id="resenha"
          name="resenha"
          type="password"
          placeholder="Redigite a senha"
          className="w-full border border-gray-300 px-3 py-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={cadastro.resenha}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none`}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
