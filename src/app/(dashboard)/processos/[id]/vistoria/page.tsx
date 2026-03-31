"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./vistoria.css";

export default function VistoriaPage({ params }: { params: { id: string } }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [vistorias, setVistorias] = useState([
    { id: "V001", date: "31/03/2026", inspector: "CARLOS ALBERTO", status: "Agendada", type: "Colisão" },
  ]);

  const handleCreateVistoria = (e: React.FormEvent) => {
    e.preventDefault();
    const newVistoria = {
      id: `V00${vistorias.length + 1}`,
      date: new Date().toLocaleDateString(),
      inspector: "VISTORIADOR SELECIONADO",
      status: "Pendente",
      type: "Acidente"
    };
    setVistorias([...vistorias, newVistoria]);
    setModalOpen(false);
  };

  return (
    <div className="vistoria-page">
      <div className="detail-header flex justify-between items-center mb-8">
        <div className="breadcrumb-nav">
          <nav className="text-muted mb-1 text-xs">
            <Link href="/dashboard">INÍCIO</Link> / <Link href="/processos">PROCESSOS</Link> / <Link href={`/processos/${params.id}`}>EDITAR PROCESSO</Link>
          </nav>
          <h1>Vistorias do Processo <span className="text-muted ml-2 text-lg">#{params.id}</span></h1>
        </div>
        <div className="flex gap-1 actions">
           <button className="yf-btn-primary" onClick={() => setModalOpen(true)}>+ NOVA VISTORIA</button>
           <Link href={`/processos/${params.id}`} className="yf-btn-secondary">VOLTAR</Link>
        </div>
      </div>

      {/* Vistorias Matrix */}
      <div className="vistorias-matrix bg-white rounded-lg shadow-sm overflow-hidden p-6">
        <div className="section-header mb-4 flex justify-between items-center">
            <h3 className="text-lg font-bold">Acionamentos Realizados</h3>
            <span className="text-muted text-xs">Aguardando {vistorias.filter(v => v.status === "Pendente").length} resposta(s)</span>
        </div>

        <div className="table-wrapper">
          <table className="yf-table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATA</th>
                <th>VISTORIADOR</th>
                <th>TIPO</th>
                <th>STATUS</th>
                <th style={{ width: "10%" }}>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {vistorias.length === 0 ? (
                <tr><td colSpan="6" className="text-center p-8 text-muted">Nenhum acionamento realizado até o momento.</td></tr>
              ) : (
                vistorias.map(v => (
                  <tr key={v.id}>
                    <td className="font-bold text-red">{v.id}</td>
                    <td className="text-xs">{v.date}</td>
                    <td className="font-medium">{v.inspector}</td>
                    <td>{v.type}</td>
                    <td><span className="status-badge">{v.status}</span></td>
                    <td>
                      <div className="flex gap-1">
                         <button className="icon-btn-sm">✏️</button>
                         <button className="icon-btn-sm">📄</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ACIONAMENTO MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
           <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header p-6 border-bottom flex justify-between items-center">
                 <h2 className="text-xl font-bold">Acionamento de Vistoriador</h2>
                 <button className="close-btn" onClick={() => setModalOpen(false)}>&times;</button>
              </div>
              <form onSubmit={handleCreateVistoria} className="modal-body p-6">
                  <div className="form-group mb-4">
                      <label className="block text-sm font-bold mb-2">Agendamento p/ data *</label>
                      <input type="datetime-local" className="yf-input w-full" required />
                  </div>
                  <div className="form-group mb-4">
                      <label className="block text-sm font-bold mb-2">Vistoriador de Campo *</label>
                      <select className="yf-select w-full" required>
                          <option value="">Selecione um profissional disponível...</option>
                          <option>CARLOS ALBERTO - São Paulo/SP</option>
                          <option>MARIA HELENA - Curitiba/PR</option>
                      </select>
                  </div>
                  <div className="form-group mb-6">
                      <label className="block text-sm font-bold mb-2">Justificativa Técnica / Observações</label>
                      <textarea className="yf-input w-full" style={{ minHeight: "100px" }} placeholder="Detalhes para o vistoriador..."></textarea>
                  </div>
                  <div className="modal-footer flex justify-end gap-1">
                      <button type="button" className="yf-btn-secondary" onClick={() => setModalOpen(false)}>CANCELAR</button>
                      <button type="submit" className="yf-btn-primary">EFETUAR ACIONAMENTO</button>
                  </div>
              </form>
           </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
           position: fixed;
           top: 0; left: 0; right: 0; bottom: 0;
           background: rgba(0,0,0,0.5);
           z-index: 1001;
           display: flex;
           align-items: center;
           justify-content: center;
        }
        .modal {
           width: 600px;
           background: var(--yf-white);
           border-radius: var(--radius);
           box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
           animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .border-bottom { border-bottom: 1px solid var(--yf-silver); }
        .icon-btn-sm { font-size: 14px; padding: 4px; border-radius: 4px; background: var(--yf-silver); }
        .text-xl { font-size: 20px; }
      `}</style>
    </div>
  );
}
