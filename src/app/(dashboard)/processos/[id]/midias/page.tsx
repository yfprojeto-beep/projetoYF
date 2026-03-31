"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./midias.css";

export default function MidiasPage({ params }: { params: { id: string } }) {
  const [requirements, setRequirements] = useState([
    { id: "1.1", desc: "Causa do Evento", responsible: "VISTORIADOR", requestedBy: "Seguradora", sentBy: "ALICE", date: "31/03/2026", status: "ok" },
    { id: "1.2", desc: "Local Evento | Chegada", responsible: "VISTORIADOR", requestedBy: "Seguradora", sentBy: "", date: "", status: "pending" },
    { id: "1.3.0", desc: "Sentido Tráfego Veículo", responsible: "VISTORIADOR", requestedBy: "Seguradora", sentBy: "", date: "", status: "pending" },
    { id: "1.4", desc: "Local Evento | Após Resgate", responsible: "VISTORIADOR", requestedBy: "Seguradora", sentBy: "", date: "", status: "pending" },
    { id: "1.5", desc: "Placa | Velocidade Permitida", responsible: "VISTORIADOR", requestedBy: "Seguradora", sentBy: "", date: "", status: "pending" },
  ]);

  const handleUpload = (id: string) => {
    alert(`Iniciado upload para o requisito ${id}`);
    // Simular upload de sucesso
    setRequirements(prev => 
      prev.map(r => r.id === id ? { ...r, status: "ok", sentBy: "JOÃO D.", date: "31/03/2026" } : r)
    );
  };

  return (
    <div className="midias-page">
      <div className="detail-header flex justify-between items-center mb-8">
        <div className="breadcrumb-nav">
          <nav className="text-muted mb-1 text-xs">
            <Link href="/dashboard">INÍCIO</Link> / <Link href="/processos">PROCESSOS</Link> / <Link href={`/processos/${params.id}`}>EDITAR PROCESSO</Link>
          </nav>
          <h1>Mídias do Processo <span className="text-muted ml-2 text-lg">#{params.id}</span></h1>
        </div>
        <div className="flex gap-1 actions">
           <div className="flex items-center gap-1 bg-white p-2 rounded shadow-sm">
              <span className="text-xs font-bold">MODO GALERIA</span>
              <input type="checkbox" className="yf-switch" />
           </div>
           <Link href={`/processos/${params.id}`} className="yf-btn-secondary">VOLTAR</Link>
        </div>
      </div>

      <div className="midias-content bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-bottom flex justify-between items-center">
            <h3 className="font-bold text-lg">Fotos e Documentos Exigidos</h3>
            <button className="yf-btn-primary">+ Adicionar Requisito</button>
        </div>

        <div className="table-wrapper">
          <table className="yf-table w-full">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>DESCRIÇÃO</th>
                <th>RESPONSÁVEL</th>
                <th>SOLICITADO POR</th>
                <th>ENVIADO POR</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map(req => (
                <tr key={req.id} className={req.status === "ok" ? "row-success" : ""}>
                  <td>
                    <div className="flex items-center gap-1">
                       <span className={req.status === "ok" ? "text-green" : "text-muted"}>
                          {req.status === "ok" ? "✔️" : "🕒"}
                       </span>
                       <span className="font-medium">{req.id} {req.desc}</span>
                    </div>
                  </td>
                  <td><span className="role-tag">{req.responsible}</span></td>
                  <td>{req.requestedBy}</td>
                  <td>
                    {req.sentBy ? (
                        <div className="flex flex-column">
                            <span className="font-bold">{req.sentBy}</span>
                            <span className="text-xs text-muted">{req.date}</span>
                        </div>
                    ) : (
                        <span className="text-muted">Aguardando...</span>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-1">
                      {req.status === "ok" ? (
                          <button className="icon-btn-sm bg-silver" title="Ver Mídia">👁️</button>
                      ) : (
                          <button className="icon-btn-sm bg-red-light" title="Upload" onClick={() => handleUpload(req.id)}>📤</button>
                      )}
                      <button className="icon-btn-sm bg-silver">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .row-success { background: rgba(16, 185, 129, 0.05); }
        .text-green { color: #10B981; }
        .role-tag { 
            font-size: 10px; 
            font-weight: 800; 
            padding: 2px 8px; 
            background: var(--yf-silver); 
            border-radius: 4px;
            color: var(--muted);
        }
        .icon-btn-sm {
            border-radius: 6px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }
        .bg-silver { background: var(--yf-silver); }
        .bg-red-light { background: rgba(188, 0, 45, 0.1); color: var(--yf-red); }
        
        .yf-switch {
            appearance: none;
            width: 40px;
            height: 20px;
            background: var(--yf-silver-dark);
            border-radius: 10px;
            position: relative;
            cursor: pointer;
            transition: 0.3s;
        }
        .yf-switch:checked { background: var(--yf-red); }
        .yf-switch::before {
            content: "";
            position: absolute;
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            transition: 0.3s;
        }
        .yf-switch:checked::before { transform: translateX(20px); }
      `}</style>
    </div>
  );
}
