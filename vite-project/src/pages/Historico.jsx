import { HistoricoDividas } from "./HistoricoDividas";
import { HistoricoEmprestimos } from "./HistoricoEmprestimos";

export function Historico() {
  return (
    <div className="flex flex-col items-center w-full h-1/2 bg-gray-100">
      {/* Container principal com largura fixa */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="bg-white rounded-2xl shadow-lg p-2">
          <HistoricoDividas />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-2">
          <HistoricoEmprestimos />
        </div>
      </div>
    </div>
  );
}
