import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

export function HistoricoEmprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect (() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/emprestimos')
      .then(res => {
        setEmprestimos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Não foi possível carregar o histórico.');
        setLoading(false);
      });
  },[])

  const dadosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return emprestimos.filter(e =>
      e.livro.toLowerCase().includes(termo) ||
      e.status.toLowerCase().includes(termo)
    );
  }, [busca, emprestimos]);

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  const handleDevolver = async (id) => {
  try {
    // mandamos status e data_devolucao
    await axios.put('http://localhost:5000/api/update', {
      table: 'emprestimo',
      data: {
        id,
        status: 'CONCLUIDO',                        // ou 'DEVOLVIDO', como preferir
        data_devolucao: new Date().toISOString().split('T')[0] // só a data YYYY‑MM‑DD
      }
    });
  } catch (err) {
    console.error('Erro ao devolver:', err);
  } finally{
    window.location.reload()
  }
};

  return (
    <div className="flex flex-col items-center w-screen bg-gray-100 p-28">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header com título e busca */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Histórico de Empréstimos</h2>
          <div className="relative">
            <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar livro ou status"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Grid de dados */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <svg className="animate-spin h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span className="ml-2 text-gray-600">Carregando histórico...</span>
          </div>
        ) : (
          <div className="grid grid-cols-6 justify-center items-center gap-4 text-left font-medium text-gray-700 border-b border-gray-200 pb-2">
            <div>Livro</div>
            <div>Data Empréstimo</div>
            <div>Data Prevista</div>
            <div>Data Devolução</div>
            <div>Status</div>
            <div>Devolver</div>
          </div>
        )}

        {!loading && (
          <div className="space-y-2">
            {dadosFiltrados.map((e, i) => (
              <div
                key={i}
                className="grid grid-cols-6 gap-4 items-center justify-center bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <div className="text-gray-600 text-sm">{e.livro}</div>
                <div className="text-gray-600 text-sm">{e.dataemprestimo}</div>
                <div className="text-gray-600 text-sm">{e.datadevolucaoprevista}</div>
                <div className="text-gray-600 text-sm">{e.datadevolucaoreal || '-'}</div>
                <div>
                  <span className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                    e.status === 'Devolvido' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>{e.status}</span>
                </div>
                {e.status != 'Devolvido' && <div>
                  <button onClick={() => handleDevolver(e.id)} className='inline-block p-2 text-sm cursor-pointer font-medium rounded-lg bg-indigo-500 text-white'>Devolver</button>
                </div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
