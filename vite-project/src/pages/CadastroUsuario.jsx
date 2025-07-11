import React from 'react';

export function CadastroUsuario() {
  return (
    <div className="flex items-center justify-center w-screen h-full bg-gray-100 p-28">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Cadastrar de Usuário</h1>
        <form className="space-y-5">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Nome completo"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="papel" className="block text-sm font-medium text-gray-700 mb-1">Papel</label>
            <select
              id="papel"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option>Aluno</option>
              <option>Professor</option>
              <option>Administrador</option>
            </select>
          </div>
          <div className="flex items-center gap-2 space-x-2">
            <input
              id="desabilitado"
              type="checkbox"
              className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
            />
            <label htmlFor="desabilitado" className="text-sm text-black">Desabilitado</label>
          </div>
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              id="descricao"
              rows={4}
              placeholder="Breve descrição"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Salvar
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
