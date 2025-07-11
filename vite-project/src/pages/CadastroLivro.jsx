import React from 'react';

export function CadastroLivro() {
  return (
    <div className="flex items-center justify-center w-screen h-full bg-gray-100 p-28">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Cadastro de Livro</h1>
        <form className="grid grid-cols-3 gap-6">
          {/* Left columns: inputs (maior) */}
          <div className="col-span-2 space-y-5">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                id="titulo"
                type="text"
                placeholder="Título do livro"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="autores" className="block text-sm font-medium text-gray-700 mb-1">Autor(es)</label>
              <input
                id="autores"
                type="text"
                placeholder="Nome do(s) autor(es)"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>

            <div className="grid gap-4 grid-cols-2">
              <div>
                <label htmlFor="edicao" className="block text-sm font-medium text-gray-700 mb-1">Edição</label>
                <input
                  id="edicao"
                  type="text"
                  placeholder="1ª, 2ª..."
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="anoPublicacao" className="block text-sm font-medium text-gray-700 mb-1">Ano de publicação</label>
                <input
                  id="anoPublicacao"
                  type="number"
                  placeholder="2023"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                id="categoria"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option>Selecione uma categoria</option>
                <option>Ficção</option>
                <option>Não-ficção</option>
                <option>Ciência</option>
                <option>Biografia</option>
              </select>
            </div>
          </div>

          {/* Right column: image upload (menor) */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Capa do livro</label>
            <div className="h-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:border-yellow-400 transition-colors">
              <div className="text-center">
                <svg
                  className="mx-auto h-10 w-10 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 8l-3-3m3 3l3-3" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">Arraste a imagem da capa aqui ou clique para selecionar</p>
              </div>
            </div>
          </div>

          {/* Full width fields */}
          <div className="col-span-3 space-y-5">
            <div>
              <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
              <input
                id="isbn"
                type="text"
                placeholder="978-3-16-148410-0"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                id="descricao"
                rows={4}
                placeholder="Breve descrição do livro"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-3 flex justify-end gap-4 space-x-3 pt-4">
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}