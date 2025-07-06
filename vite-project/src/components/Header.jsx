import { Reinaldo } from "./Reinaldo/Reinaldo"
import Logo from ".././images/Logo.svg"
import User from ".././images/User.svg"
import UTFPR from ".././images/UTFPR.svg"
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <div className="absolute z-50">
      <header className='flex flex-wrap justify-between px-16 py-4 w-[99vw] h-1/6 bg-neutral-300'>
        <div className="flex flex-row gap-12">
          <img width={160} src={Logo} alt="Logo" />
          <img width={360} src={UTFPR} alt="UTFPR" />
        </div>

        <NavLink to="/login" className="cursor-pointer">
          <div className="bg-yellow-400 w-12 h-12 flex items-center justify-center rounded-md shadow-md">
            <img src={User} alt="User" className="w-8 h-8" />
          </div>
        </NavLink>
      </header>

      <Reinaldo />
    </div>
  );
}
