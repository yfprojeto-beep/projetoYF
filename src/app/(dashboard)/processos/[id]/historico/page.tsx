"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface HistoryEntry {
  id: string;
  date: string;
  user: string;
  dept: string;
  content: string;
  status?: string;
}

export default function HistoricoPage(props: { params: Promise<{ id: string }> }) {
  const params = React.use(props.params);
  const processId = params.id;
  
  const [note, setNote] = useState("");
  const [deptNote, setDeptNote] = useState("Operacional");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filtros
  const [filterDept, setFilterDept] = useState("Todos");
  const [filterDate, setFilterDate] = useState("");

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = new URL(`/api/processos/${processId}/historico`, window.location.origin);
      if (filterDept && filterDept !== "Todos") url.searchParams.append("dept", filterDept);
      if (filterDate) url.searchParams.append("date", filterDate);

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      } else {
        console.error("Failed to fetch history");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  }, [processId, filterDept, filterDate]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleAddNote = async () => {
    if (!note || note === "<p><br></p>") return;
    
    try {
      const res = await fetch(`/api/processos/${processId}/historico`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: note, dept: deptNote })
      });

      if (res.ok) {
        setNote("");
        fetchHistory(); // Recarrega o histórico
      } else {
        console.error("Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="historico-page">
      <div className="detail-header flex justify-between items-center mb-8">
        <div className="breadcrumb-nav">
          <nav className="text-muted mb-1 text-xs">
            <Link href="/dashboard">INÍCIO</Link> / <Link href="/processos">PROCESSOS</Link> / <Link href={`/processos/${processId}`}>EDITAR PROCESSO</Link>
          </nav>
          <h1>Histórico do Processo <span className="text-muted ml-2 text-lg">#{processId}</span></h1>
        </div>
        <Link href={`/processos/${processId}`} className="yf-btn-secondary">VOLTAR</Link>
      </div>

      {/* Editor Case */}
      <div className="note-editor bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold uppercase">Adicionar Observação ao Histórico</h3>
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-muted uppercase">Departamento:</label>
            <select className="yf-select text-sm py-1" value={deptNote} onChange={e => setDeptNote(e.target.value)}>
              <option value="Central">Central</option>
              <option value="Operacional">Operacional</option>
              <option value="Análise">Análise</option>
              <option value="Financeiro">Financeiro</option>
            </select>
          </div>
        </div>
        <div className="quill-wrapper">
          <ReactQuill theme="snow" value={note} onChange={setNote} style={{ height: "150px", marginBottom: "50px" }} />
        </div>
        <div className="flex justify-end">
           <button className="yf-btn-primary" onClick={handleAddNote}>ANOTAR NO HISTÓRICO</button>
        </div>
      </div>

      {/* Filtros da Tabela */}
      <div className="filters-bar bg-white p-4 rounded-lg shadow-sm mb-4 flex gap-4 items-end">
        <div className="filter-group flex-1">
          <label className="block text-xs font-bold mb-1 text-muted uppercase">Filtrar por Departamento</label>
          <select className="yf-select w-full" value={filterDept} onChange={e => setFilterDept(e.target.value)}>
            <option value="Todos">Todos os Departamentos</option>
            <option value="Central">Central</option>
            <option value="Operacional">Operacional</option>
            <option value="Análise">Análise</option>
            <option value="Financeiro">Financeiro</option>
          </select>
        </div>
        <div className="filter-group flex-1">
          <label className="block text-xs font-bold mb-1 text-muted uppercase">Filtrar por Data</label>
          <input type="date" className="yf-input w-full" value={filterDate} onChange={e => setFilterDate(e.target.value)} />
        </div>
        <button 
          className="yf-btn-secondary h-[42px]" 
          onClick={() => { setFilterDept("Todos"); setFilterDate(""); }}
        >
          Limpar Filtros
        </button>
      </div>

      {/* Timeline Table */}
      <div className="history-timeline bg-white rounded-lg shadow-sm overflow-hidden min-h-[300px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-[200px] text-muted">Carregando histórico...</div>
        ) : (
          <table className="yf-table w-full">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>DATA / HORA</th>
                <th style={{ width: "15%" }}>USUÁRIO</th>
                <th style={{ width: "15%" }}>DEPARTAMENTO</th>
                <th>HISTÓRICO</th>
                <th style={{ width: "10%" }}>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-muted">Nenhum histórico encontrado.</td>
                </tr>
              ) : (
                history.map(entry => (
                  <tr key={entry.id}>
                    <td className="font-medium text-xs text-muted">{entry.date}</td>
                    <td className="font-bold">{entry.user}</td>
                    <td><span className="dept-tag">{entry.dept}</span></td>
                    <td>
                      <div dangerouslySetInnerHTML={{ __html: entry.content }} className="history-text" />
                      {entry.status && <span className="status-badge mt-1 inline-block">{entry.status}</span>}
                    </td>
                    <td>
                      <button className="text-muted hover:text-red-600 transition-colors" title="Editar log">✏️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <style jsx>{`
        .dept-tag {
          font-size: 10px;
          font-weight: 800;
          padding: 3px 8px;
          background: rgba(188, 0, 45, 0.05);
          border: 1px solid rgba(188, 0, 45, 0.1);
          border-radius: 4px;
          color: var(--yf-red);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .history-text {
          font-size: 13px;
          line-height: 1.5;
          color: var(--yf-black);
        }
        .history-text p { margin-bottom: 0.5em; }
        .history-text p:last-child { margin-bottom: 0; }
        .h-[42px] { height: 42px; }
        .min-h-[300px] { min-height: 300px; }
        .inline-block { display: inline-block; }
        
        /* Utils base */
        .mb-1 { margin-bottom: 4px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-8 { margin-bottom: 32px; }
        .bg-white { background: white; }
        .p-4 { padding: 16px; }
        .p-6 { padding: 24px; }
        .p-8 { padding: 32px; }
        .rounded-lg { border-radius: 8px; }
        .shadow-sm { box-shadow: var(--shadow); }
        .w-full { width: 100%; }
        .flex-1 { flex: 1; }
        .gap-2 { gap: 8px; }
        .gap-4 { gap: 16px; }
        .text-center { text-align: center; }
      `}</style>
    </div>
  );
}
