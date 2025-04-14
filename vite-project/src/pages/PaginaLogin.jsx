import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Ellipse1 from ".././images/Ellipse1.svg";
import Ellipse2 from ".././images/Ellipse2.svg";
import Ellipse3 from ".././images/Ellipse3.svg";

export function PaginaLogin() {
  const navigate = useNavigate();
  const classInput = {
    classname: "w-96 border-2 border-gray-400 rounded-sm focus:outline-0 p-3 px-4",
    classnameError: "w-96 border-2 border-red-500 rounded-sm focus:outline-0 p-3 px-4"
  };

  // estado para controlar os valores e erros
  const [inputValues, setInputValues] = useState({
    login: "",
    senha: ""
  });

  const [inputErrors, setInputErrors] = useState({
    login: false,
    senha: false
  });

  // função para lidar com mudança de input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // atualiza o valor digitado
    setInputValues(prev => ({
      ...prev,
      [name]: value
    }));

    // verifica se ficou vazio e atualiza erro
    setInputErrors(prev => ({
      ...prev,
      [name]: value.trim() === ""
    }));
  };

  const handleLogin = () => {
    if (inputValues.login === "admin" && inputValues.senha === "0000") {
      navigate("/home"); // muda para a URL que você quiser
    } else {
      alert("Login ou senha incorretos!");
      setInputValues(prev => ({
        ...prev,login:"",senha:""
      }))
      setInputErrors(prev => ({
        ...prev,login:true,senha:true
      }))
    }
  }
  

  return (
    <div className="flex flex-wrap justify-center items-center w-screen h-screen bg-white">
      <img className="fixed top-[2rem] right-[2rem]" src={Ellipse1} />
      <img className="fixed bottom-[7rem] left-[0rem]" src={Ellipse2} />
      <img className="fixed bottom-[-22rem] right-[2rem]" src={Ellipse3} />
      <div className="flex flex-wrap flex-col gap-18 justify-center items-center text-center w-4/12 h-9/12 rounded-2xl bg-neutral-50 opacity-75">
        <header className='w-full text-5xl'><strong>Bibliotecário</strong></header>
        <main>
          <div className='flex flex-col w-full gap-6'>
            <div className='flex flex-col text-start'>
              <input
                name="login"
                value={inputValues.login}
                onChange={handleInputChange}
                className={inputErrors.login ? classInput.classnameError : classInput.classname}
                placeholder='Login'
                type="text"
              />
              {inputErrors.login && <span className='text-red-600 text-sm'><strong>Preencha os valores corretamente!</strong></span>}
            </div>
            <div className='flex flex-col text-start'>
              <input
                name="senha"
                value={inputValues.senha}
                onChange={handleInputChange}
                className={inputErrors.senha ? classInput.classnameError : classInput.classname}
                placeholder='Senha'
                type="password"
              />
              {inputErrors.senha && <span className='text-red-600 text-sm'><strong>Preencha os valores corretamente!</strong></span>}
            </div>
            <button className='cursor-pointer w-30 h-5 self-end text-sm hover:text-blue-600 hover:border-b-2'>Esqueceu a senha?</button>
          </div>
        </main>
        <button onClick={handleLogin} className='cursor-pointer w-96 h-14 bg-yellow-500 rounded-sm text-2xl'>Entrar</button>
      </div>
    </div>
  );
}
