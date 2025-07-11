import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';

export function HistoricoDividas() {
  const [dividas, setDividas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/select', { params: { table: 'divida' } })
      .then(res => setDividas(res.data))
      .catch(() => setError('Não foi possível carregar as dívidas.'))
      .finally(() => setLoading(false));
  }, []);

  // Filtra dívidas com base no termo de busca
  const filteredDividas = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return dividas.filter(div =>
      div.nome.toLowerCase().includes(term) ||
      div.id_emprestimo.toString().includes(term) ||
      div.status.toLowerCase().includes(term) ||
      div.multa.toString().includes(term)
    );
  }, [dividas, searchTerm]);

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-screen bg-gray-100 p-28">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Histórico de Dívidas</h1>

        {/* Busca */}
        <div className="relative w-64 mx-auto">
          <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar Nome, Empréstimo ou Status"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>

        {/* Cabeçalho grid */}
        <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
          <div>Usuário</div>
          <div>Atraso</div>
          <div>Status</div>
          <div>Multa</div>
          <div>Data Geração</div>
          <div>Data Prevista</div>
        </div>

        {/* Linhas */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <svg className="animate-spin h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span className="ml-2 text-gray-600">Carregando dívidas...</span>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDividas.map(div => (
              <div
                key={div.id}
                className="grid grid-cols-6 gap-4 items-center bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <div className="text-gray-600 text-sm">{div.nome}</div>
                <div className="text-gray-600 text-sm">{`${div.atraso} dias`}</div>
                <div className="text-gray-800 text-sm font-semibold uppercase border-b-2 border-orange-400 w-1/2">{div.status}</div>
                <div className="text-gray-600 text-sm border-b-2 border-green-400 w-1/2">{`${div.multa} R$`}</div>
                <div className="text-gray-600 text-sm">{new Date(div.data_geracao).toLocaleString()}</div>
                <div className="text-gray-600 text-sm">{new Date(div.data_devolucao_prevista).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
