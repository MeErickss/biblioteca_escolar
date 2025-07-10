import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Select, Button } from "antd";


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
    <div className="flex flex-col m-12 p-24">
      <h1 className="text-center text-3xl font-bold text-black">Cadastro de Divida</h1>
      <div className="flex justify-between items-center flex-wrap w-full h-full mb-10">
        <div className="flex flex-row w-[20rem] gap-2">
          <Select className="flex w-[10rem] h-full"/>
          <Button type="primary">Todos</Button>
          <Button type="primary" color="danger">Ativos</Button>
        </div>
        <Button type="primary" color="danger">Adicionar</Button>
      </div>
      <input type="text" className="border-2 border-neutral-400 outline-none focus:border-blue-300 rounded-sm px-2" placeholder="Pesquisar..."/>
      <div>
        
      </div>
    </div>
  );
}
