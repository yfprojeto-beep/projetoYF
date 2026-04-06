"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamic import for react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EventEntry {
  id: string;
  type: string;
  data: string;
  usuario: string;
  content: string;
}

export default function DetalhesEventoPage({ params }: { params: { id: string } }) {
  const [eventType, setEventType] = useState("");
  const [content, setContent] = useState("");
  const [history, setHistory] = useState<EventEntry[]>([]);

  const handleSave = () => {
    if (!eventType || !content) return;
    const newEntry = {
      id: Date.now().toString(),
      type: eventType,
      data: new Date().toLocaleString(),
      usuario: "João D.", // Mock authenticated user
      content: content
    };
    setHistory([newEntry, ...history]);
    alert("Evento salvo com sucesso!");
    // Limpar campos após salvar se desejar
  };

  return (
    <div className="evento-page">
      <div className="detail-header flex justify-between items-center mb-8">
        <div className="breadcrumb-nav">
          <nav className="text-muted mb-1 text-xs">
            <Link href="/dashboard">INÍCIO</Link> / <Link href="/processos">PROCESSOS</Link> / <Link href={`/processos/${params.id}`}>EDITAR PROCESSO</Link>
          </nav>
          <h1>Detalhes do Evento <span className="text-muted ml-2 text-lg">#{params.id}</span></h1>
        </div>
        <Link href={`/processos/${params.id}`} className="yf-btn-secondary">VOLTAR</Link>
      </div>

      <div className="evento-form-container bg-white p-8 rounded-lg shadow-sm">
        <div className="form-group mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de evento *</label>
          <select 
            className="yf-select w-full"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Colisão">Colisão</option>
            <option value="Capotamento">Capotamento</option>
            <option value="Roubo/Furto">Roubo/Furto</option>
            <option value="Incêndio">Incêndio</option>
          </select>
        </div>

        <div className="form-group mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Descrição detalhada *</label>
          <div className="quill-wrapper">
             <ReactQuill 
               theme="snow" 
               value={content} 
               onChange={setContent}
               style={{ height: "300px", marginBottom: "50px" }}
             />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button className="yf-btn-primary" onClick={handleSave}>SALVAR</button>
        </div>
      </div>

      <div className="history-section mt-12">
         <h3 className="text-lg font-bold mb-4">Eventos cadastrados</h3>
         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
           <table className="yf-table w-full">
             <thead>
               <tr>
                 <th>EVENTO</th>
                 <th>DATA</th>
                 <th>USUÁRIO</th>
                 <th>AÇÕES</th>
               </tr>
             </thead>
              <tbody>
                {history.length === 0 ? (
                  <tr><td colSpan={4} className="text-center p-8 text-muted">Nenhum registro encontrado.</td></tr>
                ) : (
                 history.map(item => (
                   <tr key={item.id}>
                     <td className="font-bold">{item.type}</td>
                     <td>{item.data}</td>
                     <td>{item.usuario}</td>
                     <td>
                        <button className="text-red font-bold">EXCLUIR</button>
                     </td>
                   </tr>
                 ))
               )}
             </tbody>
           </table>
         </div>
      </div>

      <style jsx>{`
        .bg-white { background: white; }
        .p-8 { padding: 32px; }
        .rounded-lg { border-radius: 8px; }
        .shadow-sm { box-shadow: var(--shadow); }
        .mb-6 { margin-bottom: 24px; }
        .mb-4 { margin-bottom: 16px; }
        .block { display: block; }
        .text-sm { font-size: 14px; }
        .font-bold { font-weight: 700; }
        .text-gray-700 { color: #374151; }
        .w-full { width: 100%; }
        .mt-12 { margin-top: 48px; }
      `}</style>
    </div>
  );
}
