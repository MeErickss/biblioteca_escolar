---

##  Descrição do Projeto

Sistema para gerenciamento de uma biblioteca, com foco na organização de livros, histórico de empréstimos e gerenciamento de usuários (alunos e professores). O sistema possui filtros de busca, controle de multas, autenticação de bibliotecários e o simpático mascote **Reinaldo** auxiliando na experiência do usuário.

---

##  Instruções de Instalação e Execução

###  Banco de Dados 

// 

### Backend (Node.js)

```bash
cd vite-project
cd server
npm install
node server.js
```

* As rotas da API ficarão acessíveis em ` a `

### Frontend (Vite + React)

```bash
cd vite-project
npm install
npm run dev
```

* O projeto será aberto em `http://localhost:5173`

---

## Estrutura do Projeto

```
/BIBLIOTECA_ESCOLAR
|
|-- server/                 # Backend Node.js
|   |-- index.js
|   |-- recommendation.js
|   |-- server.js
|
|-- vite-project/          # Frontend React
|   |-- src/
|       |-- assets/        # Logos e arquivos estáticos
|       |-- components/    # Componentes reutilizáveis (Header, Footer, etc)
|       |-- pages/         # Páginas principais (Cadastro, Login, Home...)
|       |-- images/        # Arquivos SVG (mascote Reinaldo, ícones, etc)
|       |-- App.jsx
|       |-- main.jsx
|
|-- README.md
|-- vite.config.js
|-- package.json
```

---

## Funcionalidades a serem Implementadas 

* Cadastro, edição e consulta de livros
* Upload da imagem da capa do livro
* Categoria e subcategoria de livros (ex: Computação > IA)
* Marcar livros como indisponíveis (sem excluí-los)
* Cadastro e controle de usuários (aluno ou professor)
* Regras de empréstimo com limite e multa
* Autenticação exclusiva para bibliotecários
* Filtros por título, autor e categoria
* Consulta ao histórico de empréstimos e devoluções
* Notificações por e-mail (via API externa)
* Layout responsivo e mascote interativo, Reinaldo o guaxinim

---

## Exemplos de Uso

//

### Prints e Telas

// 

---

> Projeto desenvolvido nas disciplinas de **Desenvolvimento Web 3 (TI24J)** e **Projeto Integrador** pelos alunos Erick Alair e Julia Stela
> UTFPR - Campo Mourão | 2025
