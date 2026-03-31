"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./salvados.css";

export default function SalvadosListPage() {
  const [salvados, setSalvados] = useState([
    { id: "S1001", process: "202412.215.32", date: "31/03/2026", lot: "Pera, Energéticos, etc.", type: "Cotação no Local", storage: "Pátio Central", responsible: "ALICE", analyst: "JOÃO D." },
    { id: "S1002", process: "202412.216.45", date: "31/03/2026", lot: "Peças Automotivas", type: "Armazenada", storage: "Galpão A-2", responsible: "MARCOS", analyst: "JOÃO D." },
  ]);

  return (
    <div className="salvados-page">
      <div className="salvados-header bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-2xl font-extrabold uppercase">Módulo de Salvados</h1>
            <p className="text-muted text-sm">Gestão de pátio, armazenagem e propostas de lotes.</p>
          </div>
          <button className="yf-btn-primary">+ Novo Salvado</button>
        </div>
        
        <div className="filters-bar mt-4 flex gap-2">
          <input type="text" placeholder="Filtrar por lote ou processo..." className="yf-input flex-1" />
          <select className="yf-select">
            <option>Pátio Central</option>
            <option>Galpão A-1</option>
            <option>Armazém Externo</option>
          </select>
          <button className="yf-btn-secondary">Buscar</button>
        </div>
      </div>

      <div className="salvados-body bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="table-wrapper">
          <table className="yf-table w-full">
            <thead>
              <tr>
                <th>PROCESSO PAI</th>
                <th>DATA ENVIO</th>
                <th>LOTE / MERCADORIA</th>
                <th>TIPO NEGOCIAÇÃO</th>
                <th>LOCAL ARMAZENAGEM</th>
                <th>ANALISTA</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {salvados.map(s => (
                <tr key={s.id} onClick={() => window.location.href=`/salvados/${s.id}`}>
                  <td className="font-bold text-red">{s.process}</td>
                  <td className="text-xs">{s.date}</td>
                  <td>
                    <div className="flex flex-column gap-0">
                        <span className="font-bold uppercase text-xs">{s.lot}</span>
                        <span className="text-xs text-muted">Resp: {s.responsible}</span>
                    </div>
                  </td>
                  <td>{s.type}</td>
                  <td><span className="storage-tag">{s.storage}</span></td>
                  <td>{s.analyst}</td>
                  <td>
                    <div className="flex gap-1">
                      <Link href={`/salvados/${s.id}`} className="icon-btn-sm bg-silver">👁️</Link>
                      <button className="icon-btn-sm bg-silver">✏️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .bg-white { background: white; }
        .p-6 { padding: 24px; }
        .rounded-lg { border-radius: 8px; }
        .shadow-sm { box-shadow: var(--shadow); }
        .mb-6 { margin-bottom: 24px; }
        .text-2xl { font-size: 24px; }
        .font-extrabold { font-weight: 800; }
        .text-sm { font-size: 14px; }
        .text-xs { font-size: 12px; }
        .text-muted { color: var(--muted); }
        
        .storage-tag {
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 12px;
          background: rgba(188, 0, 45, 0.05);
          color: var(--yf-red);
          border: 1px solid var(--yf-red);
        }

        .icon-btn-sm {
          width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
          border-radius: 6px; background: var(--yf-silver);
        }

        .yf-table tr { cursor: pointer; transition: background 0.2s; }
        .yf-table tr:hover { background: rgba(188,0,45,0.02); }
      `}</style>
    </div>
  );
}
