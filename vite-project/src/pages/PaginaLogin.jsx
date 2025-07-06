import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ellipse1 from '../images/Ellipse1.svg';
import Ellipse2 from '../images/Ellipse2.svg';
import Ellipse3 from '../images/Ellipse3.svg';
import axios from 'axios';
import loadingGif from '../images/loading.gif';

export function PaginaLogin() {
  const navigate = useNavigate();
  const [locatorios, setLocatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const classInput = {
    normal: 'w-96 border-2 border-gray-400 rounded-sm focus:outline-0 p-3 px-4',
    error: 'w-96 border-2 border-red-500 rounded-sm focus:outline-0 p-3 px-4'
  };

  // estado para controlar os valores e erros de input
  const [inputValues, setInputValues] = useState({ login: '', senha: '' });
  const [inputErrors, setInputErrors] = useState({ login: false, senha: false });

  // erro de credenciais
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const fetchLocatorios = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/select', {
          params: { table: 'locatorio' }
        });
        console.log(response.data)
        setLocatorios(response.data);
      } catch (err) {
        console.error('Erro ao buscar locatórios:', err);
        setFetchError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocatorios();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prev => ({ ...prev, [name]: value }));
    setInputErrors(prev => ({ ...prev, [name]: value.trim() === '' }));
    if (authError) setAuthError(false);
  };

  const verifyCredentials = (users, { login, senha }) => {
    const user = users.find(u => u.email === login);
    if (!user) return false;
    return user.senha === senha;
  };

  const handleLogin = () => {
    // campos vazios? bloqueia
    const emptyLogin = inputValues.login.trim() === '';
    const emptySenha = inputValues.senha.trim() === '';
    setInputErrors({ login: emptyLogin, senha: emptySenha });
    if (emptyLogin || emptySenha) return;

    // verifica credenciais
    const valid = verifyCredentials(locatorios, inputValues);
    if (valid) {
      localStorage.setItem('login', true)
      navigate('/');
    } else {
      setAuthError(true);
      setInputValues({ login: '', senha: '' });
      setInputErrors({ login: true, senha: true });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-white">
        <img src={loadingGif} alt="Carregando..." />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-red-500 text-center mt-4">
        <p>Erro ao carregar dados. Tente novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center w-screen h-screen bg-white">
      <img className="fixed bottom-[25rem] right-[2rem]" src={Ellipse1} alt="bg" />
      <img className="fixed bottom-[7rem] right-[55rem]" src={Ellipse2} alt="bg" />
      <img className="fixed bottom-[-22rem] right-[2rem]" src={Ellipse3} alt="bg" />

      <div className="flex flex-col gap-18 justify-center items-center text-center w-4/12 h-9/12 rounded-2xl bg-neutral-50 opacity-75 p-8">
        <header className="w-full text-5xl mb-6"><strong>Bibliotecário</strong></header>

        <main className="flex flex-col w-full gap-6">
          <div className="flex flex-col text-start">
            <input
              name="login"
              value={inputValues.login}
              onChange={handleInputChange}
              className={inputErrors.login ? classInput.error : classInput.normal}
              placeholder="Login"
              type="text"
            />
            {inputErrors.login && <span className="text-red-600 text-sm">Preencha o login corretamente!</span>}
          </div>

          <div className="flex flex-col text-start">
            <input
              name="senha"
              value={inputValues.senha}
              onChange={handleInputChange}
              className={inputErrors.senha ? classInput.error : classInput.normal}
              placeholder="Senha"
              type="password"
            />
            {inputErrors.senha && <span className="text-red-600 text-sm">Preencha a senha corretamente!</span>}
          </div>

          {authError && <div className="text-red-600 text-sm">Login ou senha incorretos!</div>}

          <button className="self-end text-sm hover:text-blue-600 hover:border-b-2">Esqueceu a senha?</button>
        </main>

        <button
          onClick={handleLogin}
          className="w-96 h-14 bg-yellow-500 rounded-sm text-2xl mt-6 hover:bg-yellow-600 disabled:opacity-50"
          disabled={inputValues.login === '' || inputValues.senha === ''}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
