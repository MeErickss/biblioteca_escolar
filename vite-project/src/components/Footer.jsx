import wLogo from ".././images/wLogo.svg";
import { UpOutlined } from '@ant-design/icons';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-neutral-500 text-white px-16 py-12">

      <div className="flex justify-between flex-wrap gap-12">
        <div className="flex flex-col max-w-sm gap-2">
          <img src={wLogo} alt="Logo UTFPR" className="w-60" />
          <p className="text-sm">Via Rosalina Maria dos Santos, 1233 - Vila Carolo</p>
          <p className="text-sm">87301-899 Campo Mourão PR Brasil</p>
          <p className="text-sm">+55 (44) 3518-1400</p>
        </div>
      </div>

      {/* Botão "Voltar ao topo" */}
      <button
        onClick={scrollToTop}
        className="absolute right-8 top-8 bg-neutral-200 hover:brightness-90 p-6 rounded-full shadow-md transition cursor-pointer"
        aria-label="Voltar ao topo"
      >
        <UpOutlined style={{color:'black'}} />
      </button>

      <div className="text-center mt-12 text-xs">
        © {new Date().getFullYear()} UTFPR. Todos os direitos reservados.
      </div>
    </footer>
  );
}
