import { Reinaldo } from "./Reinaldo/Reinaldo"
import Logo from ".././images/Logo.svg"
import User from ".././images/User.svg"
import UTFPR from ".././images/UTFPR.svg"
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FormOutlined, HistoryOutlined } from "@ant-design/icons";


export function Header() {
  const navigate = useNavigate();
  return (
    <div className="absolute z-50">
      <header className='flex flex-wrap justify-between px-16 py-4 w-[99vw] h-1/6 bg-neutral-300'>
        <div className="flex flex-row gap-12">
            <img onClick={() => navigate("/")} width={160} src={Logo} alt="Logo"/>
            <img width={360} src={UTFPR} alt="UTFPR" />
        </div>
        <div className="flex flex-row justify-center items-center">
          {localStorage.getItem('login') && (
            <div className="flex flex-row gap-8 w-34">
              <NavLink to="/emprestimos" className="cursor-pointer">
                <HistoryOutlined style={{ fontSize: '40px' }} />
              </NavLink>

              <NavLink to="/cadastro" className="cursor-pointer">
                <FormOutlined style={{ fontSize: '40px' }} />
              </NavLink>
            </div>
          )}
          <NavLink to="/login" className="cursor-pointer">
            <img src={User} alt="User" />
          </NavLink>
        </div>
      </header>

      <Reinaldo />
    </div>
  );
}
