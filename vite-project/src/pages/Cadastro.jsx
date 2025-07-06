import React, { useState, useEffect } from "react";
import axios from "axios";
import { CadastroForm } from "../components/CadastroForm";

export function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cadastroTable, setCadastroTable] = useState("");
  const [tabelas, setTabelas] = useState([]);
  const [rows, setRows] = useState([]);

  // Operações CRUD
  const [toDelete, setToDelete] = useState(null);
  const [toUpdate, setToUpdate] = useState(null);
  const [toInsert, setToInsert] = useState(null);

  // 1) busca lista de tabelas
  useEffect(() => {
    axios.get("http://localhost:5000/api/tables")
      .then(res => setTabelas(res.data))
      .catch(() => setError("Erro ao buscar tabelas."));
  }, []);

  // 2) carrega dados da tabela selecionada
  useEffect(() => {
    if (!cadastroTable) return;
    axios.get("http://localhost:5000/api/select", { params: { table: cadastroTable } })
      .then(res => setRows(res.data))
      .catch(() => setError("Erro ao buscar registros."));
  }, [cadastroTable]);

  // 3) delete
  useEffect(() => {
    if (toDelete == null) return;
    setLoading(true);
    axios.delete("http://localhost:5000/api/delete", { data:{ table: cadastroTable, id: toDelete } })
      .then(() => setRows(rows.filter(r => r.id !== toDelete)))
      .catch(() => setError("Falha ao remover."))
      .finally(() => { setLoading(false); setToDelete(null); });
  }, [toDelete, cadastroTable, rows]);

  // 4) update (objeto completo)
  useEffect(() => {
    if (!toUpdate) return;
    setLoading(true);
    axios.put("http://localhost:5000/api/update", { table: cadastroTable, data: toUpdate })
      .then(() => {
        // Atualiza localmente a própria linha inteira
        setRows(rows.map(r => (r.id === toUpdate.id ? toUpdate : r)));
      })
      .catch(() => setError("Falha ao atualizar."))
      .finally(() => {
        setLoading(false);
        setToUpdate(null);
      });
  }, [toUpdate, cadastroTable, rows]);

  // 5) insert
  useEffect(() => {
    if (!toInsert) return;
    setLoading(true);
    axios.post("http://localhost:5000/api/insert", { table: cadastroTable, data: toInsert })
      .then(() => axios.get("http://localhost:5000/api/select", { params: { table: cadastroTable } }))
      .then(res => setRows(res.data))
      .catch(() => setError("Falha ao inserir."))
      .finally(() => { setLoading(false); setToInsert(null); });
  }, [toInsert, cadastroTable]);

  return (
    <div className="p-12">
      <h1 className="text-3xl mb-4">
        Cadastro de <span className="capitalize">{cadastroTable || '...'}</span>
      </h1>
      {error && <p className="text-red-600">{error}</p>}

      <div className="flex justify-center items-center w-full gap-4">
        <span className="font-bold text-black text-xl">Selecione uma Tabela: </span>
        <select
          value={cadastroTable}
          onChange={e => setCadastroTable(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">-- selecione --</option>
          {tabelas.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {cadastroTable && (
        <CadastroForm
          rows={rows}
          onDelete={id => setToDelete(id)}
          onUpdate={rowObj => setToUpdate(rowObj)}
          onInsert={newData => setToInsert(newData)}
          loading={loading}
        />
      )}
    </div>
  );
}
