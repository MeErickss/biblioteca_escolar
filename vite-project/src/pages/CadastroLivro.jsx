import React, { useState } from 'react';
import axios from 'axios';

export function CadastroLivro() {
  const [titulo, setTitulo] = useState('');
  const [autores, setAutores] = useState('');
  const [edicao, setEdicao] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [isbn, setIsbn] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const data = {
      titulo,
      edicao,
      datapublicacao: `${anoPublicacao}-01-01`,
      id_categoria: categoria,
      isbn,
      // autores: precisa de endpoint separado ou lógica adicional
    };

    try {
      const resp = await axios.post('http://localhost:5000/api/insert', {
        table: 'livro',
        data
      });
      setMessage({ type: 'success', text: 'Livro cadastrado com sucesso!' });
      // limpa o formulário
      setTitulo('');
      setAutores('');
      setEdicao('');
      setAnoPublicacao('');
      setCategoria('');
      setIsbn('');
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Falha ao cadastrar o livro.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-full bg-gray-100 p-28">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Cadastro de Livro
        </h1>

        {message && (
          <div
            className={`p-3 mb-4 rounded ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
          {/* Campos principais */}
          <div className="col-span-2 space-y-5">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                placeholder="Título do livro"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="autores" className="block text-sm font-medium text-gray-700 mb-1">
                Autor(es)
              </label>
              <input
                id="autores"
                type="text"
                value={autores}
                onChange={e => setAutores(e.target.value)}
                placeholder="Separe por vírgula"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>

            <div className="grid gap-4 grid-cols-2">
              <div>
                <label htmlFor="edicao" className="block text-sm font-medium text-gray-700 mb-1">
                  Edição
                </label>
                <input
                  id="edicao"
                  type="text"
                  value={edicao}
                  onChange={e => setEdicao(e.target.value)}
                  placeholder="1ª, 2ª..."
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="anoPublicacao" className="block text-sm font-medium text-gray-700 mb-1">
                  Ano de publicação
                </label>
                <input
                  id="anoPublicacao"
                  type="number"
                  value={anoPublicacao}
                  onChange={e => setAnoPublicacao(e.target.value)}
                  placeholder="2023"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                id="categoria"
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="1">Ficção</option>
                <option value="2">Não-ficção</option>
                <option value="3">Ciência</option>
                <option value="4">Biografia</option>
              </select>
            </div>
          </div>

          {/* Espaço para upload de capa (se quiser implementar depois) */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Capa do livro</label>
            <div className="h-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:border-yellow-400 transition-colors">
              <div className="text-center">
                {/* ícone e instruções */}
                <svg
                  className="mx-auto h-10 w-10 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 8l-3-3m3 3l3-3"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-600">Arraste a capa ou clique para selecionar</p>
              </div>
            </div>
          </div>

          {/* ISBN e descrição */}
          <div className="col-span-3 space-y-5">
            <div>
              <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
                ISBN
              </label>
              <input
                id="isbn"
                type="text"
                value={isbn}
                onChange={e => setIsbn(e.target.value)}
                placeholder="978-3-16-148410-0"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="col-span-3 flex justify-end gap-4 pt-4">
            <button
              type="reset"
              onClick={() => {
                setTitulo(''); setAutores(''); setEdicao('');
                setAnoPublicacao(''); setCategoria(''); setIsbn('');
                 setMessage(null);
              }}
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
