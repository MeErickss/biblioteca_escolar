import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
export function CadastroUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    registroAcademico: '',
    nome: '',
    senha: '',
    datanasc: '',             // YYYY-MM-DD
    email: '',
    telefone: '',
    id_cargo: '',
    ativo: true,
    podeEmprestar: false,
  });
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // carrega cargos e, em edição, dados do usuário
  useEffect(() => {
    // 1) buscar lista de cargos
    axios
      .get('/api/select', { params: { table: "cargo" } })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.error('Erro ao carregar cargos:', err));

    if (!id) return;

    setLoading(true);
    // 2) buscar locatório específico
    axios
      .get('/api/select', { params: { table: 'locatorio' } })
      .then(res => {
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.rows)
            ? res.data.rows
            : [];
        const u = list.find(r => r.id === Number(id));
        if (u) {
          setForm({
            registroAcademico: u.registro_academico,
            nome: u.nome,
            senha: '',
            datanasc: u.datanasc,
            email: u.email,
            telefone: u.telefone,
            id_cargo: 1,
            ativo: u.ativo,
            podeEmprestar: u.pode_emprestar,
          });
        }
      })
      .catch(err => setError('Falha ao carregar dados do usuário.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      table: 'locatorio',
      data: id
        ? { id: Number(id), ...form }
        : { ...form },
    };

    const req = id
      ? axios.put('/api/update', payload)
      : axios.post('/api/insert', payload);

    req
      .then(() => navigate(-1))
      .catch(err => setError('Falha ao salvar usuário.'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center w-screen h-full bg-gray-100 p-28">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {id ? 'Editar Usuário' : 'Cadastro de Usuário'}
        </h1>

        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Registro Acadêmico */}
          <div>
            <label htmlFor="registroAcademico" className="block text-sm font-medium text-gray-700 mb-1">
              Registro Acadêmico
            </label>
            <input
              id="registroAcademico"
              name="registroAcademico"
              type="text"
              value={form.registroAcademico}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>

          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              value={form.senha}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              {...(!id ? { required: true } : {})}
            />
          </div>

          {/* Data de Nascimento */}
          <div>
            <label htmlFor="datanasc" className="block text-sm font-medium text-gray-700 mb-1">
              Data de Nascimento
            </label>
            <input
              id="datanasc"
              name="datanasc"
              type="date"
              value={form.datanasc}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>

          {/* E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              value={form.telefone}
              onChange={handleChange}
              placeholder="(XX) XXXXX-XXXX"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

        

          {/* Ativo e Pode Emprestar */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="ativo"
                checked={form.ativo}
                onChange={handleChange}
                className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
              />
              <span className="text-sm text-gray-700">Ativo</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="podeEmprestar"
                checked={form.podeEmprestar}
                onChange={handleChange}
                className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
              />
              <span className="text-sm text-gray-700">Pode Emprestar</span>
            </label>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}