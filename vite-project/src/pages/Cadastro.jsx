import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { CadastroForm } from "../components/CadastroForm";

export function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cadastroTable, setCadastroTable] = useState("");
  const [tabelas, setTabelas] = useState([]);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // CRUD states
  const [toDelete, setToDelete] = useState(null);
  const [toUpdate, setToUpdate] = useState(null);
  const [toInsert, setToInsert] = useState(null);

  // 1) busca lista de tabelas
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tables")
      .then((res) => setTabelas(res.data))
      .catch(() => setError("Erro ao buscar tabelas."));
  }, []);

  // 2) carrega dados da tabela selecionada
  useEffect(() => {
    if (!cadastroTable) {
      setRows([]);
      return;
    }
    axios
      .get("http://localhost:5000/api/select", { params: { table: cadastroTable } })
      .then((res) => {
        setRows(res.data);
        setSearchTerm(""); // reset pesquisa
      })
      .catch(() => setError("Erro ao buscar registros."));
  }, [cadastroTable]);

  // 3) delete
  useEffect(() => {
    if (toDelete == null) return;
    setLoading(true);
    axios
      .delete("http://localhost:5000/api/delete", {
        data: { table: cadastroTable, id: toDelete },
      })
      .then(() => setRows((r) => r.filter((row) => row.id !== toDelete)))
      .catch(() => setError("Falha ao remover."))
      .finally(() => {
        setLoading(false);
        setToDelete(null);
      });
  }, [toDelete, cadastroTable]);

  // 4) update
  useEffect(() => {
    if (!toUpdate) return;
    setLoading(true);
    axios
      .put("http://localhost:5000/api/update", { table: cadastroTable, data: toUpdate })
      .then(() => {
        setRows((r) => r.map((row) => (row.id === toUpdate.id ? toUpdate : row)));
      })
      .catch(() => setError("Falha ao atualizar."))
      .finally(() => {
        setLoading(false);
        setToUpdate(null);
      });
  }, [toUpdate, cadastroTable]);

  // 5) insert
  useEffect(() => {
    if (!toInsert) return;
    setLoading(true);
    axios
      .post("http://localhost:5000/api/insert", { table: cadastroTable, data: toInsert })
      .then(() => axios.get("http://localhost:5000/api/select", { params: { table: cadastroTable } }))
      .then((res) => setRows(res.data))
      .catch(() => setError("Falha ao inserir."))
      .finally(() => {
        setLoading(false);
        setToInsert(null);
      });
  }, [toInsert, cadastroTable]);

  // Filtra rows por searchTerm
  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    const term = searchTerm.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
  }, [rows, searchTerm]);

  return (
    <div className="mt-12 p-12">
      {error && <p className="text-red-600">{error}</p>}

      <h1 className="text-3xl mb-4 text-center">
        Cadastro de <span className="capitalize">{cadastroTable || "..."}</span>
      </h1>

      <div className="flex flex-row justify-evenly items-center w-full gap-4 mb-6">
        <div>
          <span className="font-bold text-black text-xl">Selecione uma Tabela: </span>
          <select
            value={cadastroTable}
            onChange={(e) => setCadastroTable(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">-- selecione --</option>
            {tabelas.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xl font-bold" htmlFor="search">
            Pesquisa:{" "}
          </label>
          <input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-sm p-2"
            type="text"
            placeholder="Pesquisar..."
          />
        </div>
      </div>

      {cadastroTable && (
        <CadastroForm
          rows={filteredRows}
          onDelete={(id) => setToDelete(id)}
          onUpdate={(rowObj) => setToUpdate(rowObj)}
          onInsert={(newData) => setToInsert(newData)}
          loading={loading}
        />
      )}
    </div>
  );
}
