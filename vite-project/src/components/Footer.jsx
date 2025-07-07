import wLogo from ".././images/wLogo.svg";

export function Footer() {
  return (
    <footer className="bg-neutral-500 text-white px-16 py-12">

      <div className="flex justify-between flex-wrap gap-12">
        <div className="flex flex-col max-w-sm gap-2">
          <img src={wLogo} alt="Logo UTFPR" className="w-60" />

          <p className="text-sm">Via Rosalina Maria dos Santos, 1233 - Vila Carolo</p>
          <p className="text-sm">87301-899 Campo Mourão PR Brasil</p>
          <p className="text-sm">+55 (44) 3518-1400</p>
        </div>
      </div>


      <div className="text-center mt-4 text-xs">
        © {new Date().getFullYear()} UTFPR. Todos os direitos reservados.
      </div>
    </footer>
  );
}
