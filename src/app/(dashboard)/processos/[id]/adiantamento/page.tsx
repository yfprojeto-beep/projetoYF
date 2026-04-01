"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdiantamentoPage(props: { params: Promise<{ id: string }> }) {
  const params = React.use(props.params);
  const processId = params.id;
  
  const [requests, setRequests] = useState([
    { id: "A102", date: "31/03/2026", value: "R$ 450,00", type: "Pedágio/Combustível", status: "Aprovado" },
    { id: "A103", date: "31/03/2026", value: "R$ 1.200,00", type: "Honorários", status: "Em Análise" },
  ]);

  return (
    <div className="adendo-page">
      <div className="detail-header flex justify-between items-center mb-8">
        <div className="breadcrumb-nav">
          <nav className="text-muted mb-1 text-xs">
            <Link href="/dashboard">INÍCIO</Link> / <Link href="/processos">PROCESSOS</Link> / <Link href={`/processos/${processId}`}>EDITAR PROCESSO</Link>
          </nav>
          <h1>Adiantamentos (Adendos) <span className="text-muted ml-2 text-lg">#{processId}</span></h1>
        </div>
        <div className="flex gap-1 actions">
           <Link href={`/processos/${processId}`} className="yf-btn-secondary">VOLTAR</Link>
        </div>
      </div>

      <div className="flex gap-2">
        {/* Request Form */}
        <div className="request-form bg-white p-6 rounded-lg shadow-sm flex-1">
            <h3 className="text-sm font-bold mb-4 uppercase">Nova Solicitação de Valor</h3>
            <div className="form-group mb-4">
                <label className="block text-xs font-bold mb-1">Tipo de Adendo *</label>
                <select className="yf-select w-full">
                    <option>Pedágio / Combustível</option>
                    <option>Hospedagem</option>
                    <option>Honorários Antecipados</option>
                    <option>Outros</option>
                </select>
            </div>
            <div className="form-group mb-4">
                <label className="block text-xs font-bold mb-1">Valor Solicitado (R$) *</label>
                <input type="text" placeholder="0,00" className="yf-input w-full" />
            </div>
            <div className="form-group mb-6">
                <label className="block text-xs font-bold mb-1">Justificativa / Motivação</label>
                <textarea className="yf-input w-full" style={{ minHeight: "80px" }}></textarea>
            </div>
            <button className="yf-btn-primary w-full">SOLICITAR PAGAMENTO</button>
        </div>

        {/* Request List */}
        <div className="request-history bg-white rounded-lg shadow-sm flex-2 overflow-hidden">
            <div className="p-4 border-bottom bg-silver-light">
                <h3 className="text-sm font-bold uppercase">Histórico de Adendos</h3>
            </div>
            <table className="yf-table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATA</th>
                        <th>VALOR</th>
                        <th>TIPO</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(r => (
                        <tr key={r.id}>
                            <td className="font-bold text-red">{r.id}</td>
                            <td className="text-xs">{r.date}</td>
                            <td className="font-bold">{r.value}</td>
                            <td>{r.type}</td>
                            <td><span className={`status-badge ${r.status === "Aprovado" ? "success" : "pending"}`}>{r.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <style jsx>{`
        .flex-1 { flex: 1; }
        .flex-2 { flex: 2; }
        .bg-silver-light { background: var(--yf-silver-light); }
        .status-badge.success { background: rgba(16, 185, 129, 0.1); color: #10B981; }
        .status-badge.pending { background: rgba(245, 158, 11, 0.1); color: #F59E0B; }
      `}</style>
    </div>
  );
}
