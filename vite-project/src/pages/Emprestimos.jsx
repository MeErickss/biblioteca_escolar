// HistoricoEmprestimos.jsx

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Table, Input, Badge, Card, Spin, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { useParams } from 'react-router-dom';

export function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [busca, setBusca]             = useState('');
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const { usuarioId }                 = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/emprestimos/${usuarioId}`)
      .then(res => {
        setEmprestimos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Não foi possível carregar o histórico.');
        setLoading(false);
      });
  }, [usuarioId]);

  const fetchTodos = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/emprestimos`)
      .then(res => {
        setEmprestimos(res.data);
        console.log(res.data)
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Não foi possível carregar o histórico.');
        setLoading(false);
      });
  };

  const dadosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return emprestimos.filter(e =>
      e.livro.toLowerCase().includes(termo) ||
      e.status.toLowerCase().includes(termo)
    );
  }, [busca, emprestimos]);

  const columns = [
    { title: 'Livro',               dataIndex: 'livro',                  key: 'livro' },
    { title: 'Data do Empréstimo',  dataIndex: 'dataemprestimo',         key: 'dataEmprestimo' },
    { title: 'Data Prevista',       dataIndex: 'datadevolucaoprevista',  key: 'dataDevolucaoPrevista' },
    { title: 'Data Devolução Real', dataIndex: 'datadevolucaoreal',      key: 'dataDevolucaoReal' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const color = status === 'Devolvido' ? 'green' : 'gold';
        return <Badge color={color} text={status} />;
      },
    },
  ];

  if (error) {
    return (
      <Alert
        type="error"
        message={error}
        style={{ marginTop: 32, maxWidth: 600, margin: '32px auto' }}
      />
    );
  }

  return (
    <div className='flex w-full justify-center items-center flex-col gap-4'>
      <Spin
        spinning={loading}
        tip="Carregando histórico..."
        style={{ marginTop: 32 }}
      >
        <Card
          className="w-[100rem] mt-8 p-6 bg-white rounded-2xl shadow-lg"
          styles={{ header: { borderBottom: 'none' } }}
          title={
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Histórico de Empréstimos</h2>
              <Input
                placeholder="Buscar livro ou status"
                prefix={<SearchOutlined />}
                value={busca}
                onChange={e => setBusca(e.target.value)}
                style={{ width: 240 }}
                allowClear
              />
            </div>
          }
        >
          <Table
            dataSource={dadosFiltrados.map((e, i) => ({ ...e, key: i }))}
            columns={columns}
            pagination={false}
            className="mt-4"
          />
        </Card>
      </Spin>

      <button
        onClick={fetchTodos}
        className='bg-blue-500 rounded-lg p-4 tex-sm text-white hover:brightness-90'
      >
        Mostrar todos Empréstimos
      </button>
    </div>
  );
}
