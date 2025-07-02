import React from "react";

export function CadastroForm({ tabelaSelecionada, onUpdate, onDelete }) {
  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-8 text-center">Cadastro</h2>

      <div className="space-y-6">
        {tabelaSelecionada.map((item, rowIndex) => {
          const entries = Object.entries(item);

          return (
            <div
              key={rowIndex}
              className="
                grid 
                gap-4 
                pb-4 
                border-b 
                last:border-b-0
                grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
              "
            >
              {entries.map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <label
                    htmlFor={`${rowIndex}-${key}`}
                    className="mb-1 text-sm font-medium capitalize"
                  >
                    {key.replace("_", " ")}
                  </label>

                  {typeof value === "boolean" ? (
                    <input
                      id={`${rowIndex}-${key}`}
                      name={key}
                      type="checkbox"
                      defaultChecked={value}
                      disabled={key.toLowerCase() === "id"}
                      className={
                        "h-5 w-5 rounded-sm " +
                        (key.toLowerCase() === "id"
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-indigo-600")
                      }
                    />
                  ) : (
                    <input
                      id={`${rowIndex}-${key}`}
                      name={key}
                      type="text"
                      defaultValue={value}
                      disabled={key.toLowerCase() === "id"}
                      className={
                        "border rounded-md p-2 focus:outline-none focus:ring-2 " +
                        (key.toLowerCase() === "id"
                          ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                          : "border-gray-300 focus:ring-indigo-500")
                      }
                    />
                  )}
                </div>
              ))}

              {/* Coluna de Ações */}
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  title="Editar"
                  className="text-xl hover:text-indigo-600"
                  onClick={() => onUpdate(item)}
                >
                  🖊️
                </button>
                <button
                  type="button"
                  title="Excluir"
                  className="text-xl hover:text-red-600"
                  onClick={() => onDelete(item)}
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
