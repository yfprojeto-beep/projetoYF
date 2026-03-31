"use client";

import React, { useState } from "react";
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

export default function HistoricoPage({ params }: { params: { id: string } }) {
  const [note, setNote] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: "1", date: "31/03/2026 11:29", user: "ALICE", dept: "Central", content: "Processo aberto no sistema.", status: "Aberto" },
    { id: "2", date: "31/03/2026 14:15", user: "JOÃO D.", dept: "Análise", content: "Iniciada análise documental preliminar.", status: "Em Andamento" },
  ]);

  const handleAddNote = () => {
    if (!note) return;
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      user: "USUÁRIO YF",
      dept: "Operacional",
      content: note,
    };
    setHistory([newEntry, ...history]);
    setNote("");
  };

  return (
    <div className="historico-page">
      <div className="detail-header flex justify-between items-center mb-8">
        <div className="breadcrumb-nav">
          <nav className="text-muted mb-1 text-xs">
            <Link href="/dashboard">INÍCIO</Link> / <Link href="/processos">PROCESSOS</Link> / <Link href={`/processos/${params.id}`}>EDITAR PROCESSO</Link>
          </nav>
          <h1>Histórico do Processo <span className="text-muted ml-2 text-lg">#{params.id}</span></h1>
        </div>
        <Link href={`/processos/${params.id}`} className="yf-btn-secondary">VOLTAR</Link>
      </div>

      {/* Editor Case */}
      <div className="note-editor bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-sm font-bold mb-4">ADICIONAR OBSERVAÇÃO AO HISTÓRICO</h3>
        <div className="quill-wrapper">
          <ReactQuill theme="snow" value={note} onChange={setNote} style={{ height: "150px", marginBottom: "50px" }} />
        </div>
        <div className="flex justify-end">
           <button className="yf-btn-primary" onClick={handleAddNote}>ANOTAR NO HISTÓRICO</button>
        </div>
      </div>

      {/* Timeline Table */}
      <div className="history-timeline bg-white rounded-lg shadow-sm overflow-hidden">
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
            {history.map(entry => (
              <tr key={entry.id}>
                <td className="font-medium text-xs">{entry.date}</td>
                <td className="font-bold">{entry.user}</td>
                <td><span className="dept-tag">{entry.dept}</span></td>
                <td>
                  <div dangerouslySetInnerHTML={{ __html: entry.content }} className="history-text" />
                  {entry.status && <span className="status-badge mt-1">{entry.status}</span>}
                </td>
                <td>
                  <button className="text-muted text-lg">✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .dept-tag {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 8px;
          background: var(--yf-silver);
          border-radius: 4px;
          color: var(--muted);
          text-transform: uppercase;
        }
        .history-text {
          font-size: 14px;
          line-height: 1.4;
          color: var(--yf-black);
        }
        .mb-1 { margin-bottom: 8px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-8 { margin-bottom: 32px; }
        .bg-white { background: white; }
        .p-6 { padding: 24px; }
        .rounded-lg { border-radius: 8px; }
        .shadow-sm { box-shadow: var(--shadow); }
        .w-full { width: 100%; }
      `}</style>
    </div>
  );
}
