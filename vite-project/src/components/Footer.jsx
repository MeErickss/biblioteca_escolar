import wLogo from "../../public/wLogo.svg"

export function Footer() {
  return (
    <div className="absolute w-full h-96 bg-neutral-500 text-white py-30 px-12">
        <div className="text-end">Telefone</div>
        <footer className='grid grid-rows-1 grid-cols-4'>
            <img width={310} src={wLogo} alt="whiteLogo" />
            <div>a</div>
            <div>b</div>
            <div>c</div>
        </footer>
      <div className="text-center">a</div>
    </div>
  );
}