import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export function Cadastro() {
  const [tabelas, setTabelas] = useState([]);
  const [cadastroTable, setCadastroTable] = useState(null);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/tables')
      .then(res => setTabelas(res.data.map(tbl => ({ value: tbl, label: tbl }))))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!cadastroTable) return setRows([]);
    axios.get('http://localhost:5000/api/select', { params: { table: cadastroTable } })
      .then(res => setRows(res.data))
      .catch(err => console.error(err));
  }, [cadastroTable]);

  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    const term = searchTerm.toLowerCase();
    return rows.filter(row =>
      Object.values(row).some(val => String(val).toLowerCase().includes(term))
    );
  }, [rows, searchTerm]);

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-gray-100 p-28">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Cadastro de Dívida</h1>

        {/* Controles de seleção e filtros */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 gap-2">
            <Select
              className="w-48"
              placeholder="Selecione tabela"
              options={tabelas}
              value={cadastroTable}
              onChange={setCadastroTable}
            />
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              All
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Online
            </button>
          </div>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <PlusOutlined className="mr-2" /> Adicionar
          </button>
        </div>

        {/* Campo de pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        />

        {/* Lista de registros */}
        <div className="space-y-4">
          {filteredRows.map(row => (
            <div
              key={row.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg"
            >
              <div>
                <p className="text-sm font-semibold text-white uppercase">{row.status}</p>
                <p className="text-gray-300">multa: {row.multa}</p>
              </div>
              <div className="flex items-center space-x-4">
                <EditOutlined className="text-gray-400 hover:text-white cursor-pointer" />
                <DeleteOutlined className="text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
