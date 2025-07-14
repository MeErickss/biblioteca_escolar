import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export function Cadastro() {
  const [tabelas, setTabelas] = useState([]);
  const [cadastroTable, setCadastroTable] = useState(null);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [columns, setColumns] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/tables')
      .then(res => setTabelas(res.data.map(tbl => ({ value: tbl, label: tbl }))));
  }, []);

  useEffect(() => {
    if (!cadastroTable) {
      setRows([]); setColumns([]); setFormData({});
      return;
    }
    axios.get('http://localhost:5000/api/select', { params: { table: cadastroTable } })
      .then(res => {
        setRows(res.data);
        const cols = res.data.length ? Object.keys(res.data[0]) : [];
        setColumns(cols);
        const init = {};
        cols.forEach(c => { if (c !== 'id') init[c] = ''; });
        setFormData(init);
      });
  }, [cadastroTable]);

  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    const term = searchTerm.toLowerCase();
    return rows.filter(r =>
      Object.values(r).some(v => String(v).toLowerCase().includes(term))
    );
  }, [rows, searchTerm]);

  const handleAdd = () => {
    if (cadastroTable === 'livro') navigate('/cadastrolivro');
    else if (cadastroTable === 'locatorio') navigate('/cadastrousuario');
    else axios.post('http://localhost:5000/api/insert', { table: cadastroTable, data: formData })
      .then(() => refreshRows());
  };

  const handleEdit = id => {
    if (cadastroTable === 'livro') navigate(`/cadastrolivro/${id}`);
    else if (cadastroTable === 'locatorio') navigate(`/cadastrousuario/${id}`);
  };

  const handleDelete = id => {
    axios.delete('http://localhost:5000/api/delete', { data: { table: cadastroTable, id } })
      .then(() => refreshRows());
  };

  function refreshRows() {
    axios.get('http://localhost:5000/api/select', { params: { table: cadastroTable } })
      .then(res => setRows(res.data));
  }

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-gray-100 p-28">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Cadastro Dinâmico</h1>

        <div className="grid grid-cols-3 items-center gap-4">
          <Select
            className="w-48"
            placeholder="Selecione tabela"
            options={tabelas}
            value={cadastroTable}
            onChange={setCadastroTable}
          />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 flex-1"
          />
          <button
            onClick={handleAdd}
            disabled={!cadastroTable}
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusOutlined className="mr-2" /> Adicionar
          </button>
        </div>

        <div className="space-y-2">
          {filteredRows.map(row => (
            <div
              key={row.id}
              className="flex justify-between items-center bg-gray-200 p-4 rounded-lg"
            >
              <div className="flex-1">
                {columns.map(col => (
                  <span key={col} className="mr-4">
                    <strong>{col}:</strong> {String(row[col])}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <EditOutlined
                  onClick={() => handleEdit(row.id)}
                  className="cursor-pointer text-gray-600 hover:text-gray-900"
                />
                <DeleteOutlined
                  onClick={() => handleDelete(row.id)}
                  className="cursor-pointer text-red-600 hover:text-red-800"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
