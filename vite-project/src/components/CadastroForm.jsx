// src/components/CadastroForm.jsx
import React, { useState, useEffect } from "react";
import { PlusOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";

export function CadastroForm({ rows, onDelete, onUpdate, onInsert, loading }) {
  const [editableRows, setEditableRows] = useState([]);
  const [newRows, setNewRows] = useState([]);

  // Sincroniza estado local com props.rows
  useEffect(() => {
    setEditableRows(rows.map(r => ({ ...r })));
  }, [rows]);

  const sampleCols = rows.length ? Object.keys(rows[0]) : [];
  // Garante não negativo
  const numDataCols = Math.max(sampleCols.length - 2, 0);

  // Grid columns: id(80px), data... (1fr cada), ativo(60px), ações(60px)
  const gridTemplate = [
    '80px',
    ...Array(numDataCols).fill('1fr'),
    '60px',
    '60px'
  ].join(' ');

  const handleFieldChange = (idx, col, val) => {
    const copy = [...editableRows];
    copy[idx][col] = val;
    setEditableRows(copy);
  };

  const addEmptyRow = () => {
    const empty = sampleCols.reduce(
      (acc, col) => ({ ...acc, [col]: col === 'id' ? null : (col === 'ativo' ? false : '') }),
      {}
    );
    setNewRows([...newRows, empty]);
  };

  const handleNewChange = (i, col, val) => {
    const copy = [...newRows];
    copy[i][col] = val;
    setNewRows(copy);
  };

  const submitNew = i => {
    const { id, ...payload } = newRows[i];
    onInsert(payload);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="space-y-4 bg-neutral-300 p-8 rounded-lg ">

        {/* Linhas existentes */}
        {editableRows.map((item, idx) => (
          <div
            key={item.id}
            className="grid items-center gap-4 pb-4 border-b last:border-b-0"
            style={{ gridTemplateColumns: gridTemplate }}
          >
            {sampleCols.map(col => (
              <div key={col} className="flex flex-col">
                <label className={col == "ativo" ? "text-sm text-center font-medium mb-1 capitalize" :"text-sm font-medium mb-1 capitalize"}>
                  {col.replace(/_/g, ' ')}
                </label>
                {typeof item[col] === 'boolean' ? (
                  <input
                    type="checkbox"
                    checked={!!item[col]}
                    onChange={e => handleFieldChange(idx, col, e.target.checked)}
                    className="h-4 w-4 text-indigo-600 rounded-sm self-center"
                  />
                ) : (
                  <input
                    type={typeof item[col] === 'number' ? 'number' : 'text'}
                    value={item[col] ?? ''}
                    disabled={col === 'id'}
                    onChange={e => handleFieldChange(idx, col, e.target.value)}
                    className={
                      (col === 'id'
                        ? 'bg-gray-100 cursor-not-allowed'
                        : 'border-black bg-white focus:ring-blue-500') +
                      ' border rounded-md p-2 focus:outline-none focus:ring-2 w-full'
                    }
                  />
                )}
              </div>
            ))}

            {/* Botões Ações */}
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium mb-1">Ações</label>
              <div className="flex space-x-2">
                <button
                  disabled={loading}
                  onClick={() => onUpdate(editableRows[idx])}
                  className="p-1 hover:text-green-600"
                ><EditFilled style={{ color: 'orange' }}/></button>
                <button
                  disabled={loading}
                  onClick={() => onDelete(item.id)}
                  className="p-1 hover:text-red-600"
                ><DeleteFilled style={{ color: 'red' }} /></button>
              </div>
            </div>
          </div>
        ))}

        {/* Novas linhas de insert */}
        {newRows.map((nr, i) => (
          <div
            key={i}
            className="grid items-center gap-4 pb-4 border-b last:border-b-0"
            style={{ gridTemplateColumns: gridTemplate }}
          >
            {sampleCols.map(col => (
              <div key={col} className="flex flex-col">
                <label className="text-sm font-medium mb-1 capitalize">
                  {col.replace(/_/g, ' ')}
                </label>
                {col === 'ativo' ? (
                  <input
                    type="checkbox"
                    checked={!!nr[col]}
                    onChange={e => handleNewChange(i, col, e.target.checked)}
                    className="h-4 w-4 text-indigo-600 rounded-sm self-center"
                  />
                ) : (
                  <input
                    type={col === 'id' ? 'number' : 'text'}
                    value={nr[col] ?? ''}
                    onChange={e => handleNewChange(i, col, e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                )}
              </div>
            ))}

            <div className="flex flex-col items-center">
              <label className="text-sm font-medium mb-1">Ações</label>
              <button
                disabled={loading}
                onClick={() => submitNew(i)}
                className="p-1 hover:text-green-600"
              ><PlusOutlined style={{ color: 'green' }} /></button>
            </div>
          </div>
        ))}

        <button
          onClick={addEmptyRow}
          disabled={loading}
          className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
        >
          Adicionar linha
        </button>
      </div>
    </div>
  );
}