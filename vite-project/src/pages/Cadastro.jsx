import React, { useState, useEffect } from "react";
import axios from "axios";
import { CadastroForm } from "../components/CadastroForm";

export function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cadastroTable, setCadastroTable] = useState("");
  const [tabelaSelecionada, setTabelaSelecionada] = useState([]);
  const [tabelas, setTabelas] = useState([]);

  // Busca os nomes das tabelas
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tables");
        setTabelas(res.data);
      } catch {
        setError("Erro ao buscar tabelas do banco.");
      }
    })();
  }, []);

  // Busca as colunas da tabela selecionada
  useEffect(() => {
    if (!cadastroTable) return;
    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/select", {
          params: { table: cadastroTable },
        });
        setTabelaSelecionada(res.data);
        console.log(res.data)
      } catch {
        setError("Erro ao buscar colunas do banco.");
      }
    })();
  }, [cadastroTable]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      // trocar pela rota real de insert/update/delete
      await axios.post("http://localhost:5000/api/tables", { /* payload */ });
      alert("Operação realizada com sucesso!");
    } catch {
      setError("Não foi possível concluir. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-start py-16 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">
          Cadastro de <span className="capitalize">{cadastroTable || "..."}</span>
        </h2>

        {/* selects */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="table" className="block text-sm font-medium mb-1">
              Selecione a tabela
            </label>
            <select
              id="table"
              value={cadastroTable}
              onChange={(e) => setCadastroTable(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Escolha uma tabela --</option>
              {tabelas.map((tabela) => (
                <option key={tabela} value={tabela}>
                  {tabela}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* campos dinâmicos */}
        {tabelaSelecionada.length > 0 && (
          <div className="grid gap-6">
            <CadastroForm handleSubmit={handleSubmit} tabelaSelecionada={tabelaSelecionada}/>
          </div>
        )}

        {/* botão de ação */}
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Enviando..." : "Confirmar"}
        </button>
      </form>
    </div>
  );
}
