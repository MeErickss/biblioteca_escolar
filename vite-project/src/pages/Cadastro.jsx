import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cadastroCrud, setCadastroCrud] = useState();

  const [cadastroTable, setCadastroTable] = useState();

  const [tabelas, setTabelas] = useState([]);

  // Busca os nomes das tabelas ao carregar o componente
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tables");
        setTabelas(res.data);
      } catch (err) {
        console.error("Erro ao buscar tabelas:", err);
        setError("Erro ao buscar tabelas do banco.");
      }
    };
    fetchTables();
  }, []);

  const handleChangeTable =   (e) => {
    setCadastroTable(e)
  };

  const handleChangeCrud = (e) => {
    setCadastroCrud(e)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      setLoading(true);
      await axios.get("http://localhost:5000/api/tables");
      alert("Cadastro feito com sucesso!");
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
        <h2 className="text-2xl font-semibold mb-6">Cadastro de {cadastroTable.charAt(0).toUpperCase() + cadastroTable.slice(1).toLowerCase() || "Tabela"}</h2>

        {/* Select de tabelas */}
        <label className="block mb-2" htmlFor="table">
          Selecione a tabela:
        </label>
        <select
          id="table"
          name="table"
          value={cadastroTable}
          onChange={(e)=> handleChangeTable(e.target.value)}
          className="w-1/2 border border-gray-300 px-3 py-2 rounded mb-4"
        >
          <option value="">-- Escolha uma tabela --</option>
          {tabelas.map((tabela) => (
            <option key={tabela} value={tabela}>
              {tabela}
            </option>
          ))}
        </select>

        <select
          id="table"
          name="table"
          value={cadastroCrud}
          onChange={(e)=> handleChangeCrud(e.target.value)}
          className="w-1/2 border border-gray-300 px-3 py-2 rounded mb-4"
        >
          <option value="">-- Escolha um CRUD --</option>
          <option value="delete"> DELETE </option>
          <option value="insert"> INSERT </option>
          <option value="update"> UPDATE </option>
        </select>

        {error && (
          <div className="mb-4 text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
