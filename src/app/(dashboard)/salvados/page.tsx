"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

const MOCK_SALVADOS = [
  { id: "S1001", lotNumber: "LOT-2026-001", process: "202412.215.32", dateSent: "31/03/2026", merchandise: "Pera, Energéticos, etc.", storage: "Pátio Central", analyst: "ALICE", status: "EM_NEGOCIAÇÃO", propostas: 3 },
  { id: "S1002", lotNumber: "LOT-2026-002", process: "202412.216.45", dateSent: "28/03/2026", merchandise: "Peças Automotivas (Motor, Lataria)", storage: "Galpão A-2", analyst: "JOÃO D.", status: "RECEBIDO", propostas: 0 },
  { id: "S1003", lotNumber: "LOT-2026-003", process: "202501.001.01", dateSent: "20/03/2026", merchandise: "Eletrodomésticos Mix", storage: "Armazém Externo", analyst: "MARCOS", status: "FINALIZADO", propostas: 5 },
  { id: "S1004", lotNumber: "LOT-2026-004", process: "202501.040.14", dateSent: "15/03/2026", merchandise: "Produtos Têxteis", storage: "Galpão A-1", analyst: "ALICE", status: "AGUARDANDO_PAGAMENTO", propostas: 2 },
];

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  "RECEBIDO": { label: "Recebido", color: "#6B7280" },
  "EM_NEGOCIAÇÃO": { label: "Em Negociação", color: "#F59E0B" },
  "AGUARDANDO_PAGAMENTO": { label: "Ag. Pagamento", color: "#3B82F6" },
  "FINALIZADO": { label: "Finalizado", color: "#10B981" },
};

export default function SalvadosListPage() {
  const [search, setSearch] = useState("");
  const [filterStorage, setFilterStorage] = useState("Todos");
  const [filterStatus, setFilterStatus] = useState("Todos");

  const filteredSalvados = useMemo(() => {
    return MOCK_SALVADOS.filter(s => {
      const matchSearch = !search || 
        s.lotNumber.toLowerCase().includes(search.toLowerCase()) ||
        s.process.includes(search) ||
        s.merchandise.toLowerCase().includes(search.toLowerCase());
      const matchStorage = filterStorage === "Todos" || s.storage === filterStorage;
      const matchStatus = filterStatus === "Todos" || s.status === filterStatus;
      return matchSearch && matchStorage && matchStatus;
    });
  }, [search, filterStorage, filterStatus]);

  const stats = {
    total: MOCK_SALVADOS.length,
    emNegociacao: MOCK_SALVADOS.filter(s => s.status === "EM_NEGOCIAÇÃO").length,
    aguardandoPgto: MOCK_SALVADOS.filter(s => s.status === "AGUARDANDO_PAGAMENTO").length,
    finalizados: MOCK_SALVADOS.filter(s => s.status === "FINALIZADO").length,
  };

  return (
    <div className="salvados-page">
      {/* KPI STRIP */}
      <div className="kpi-strip mb-6">
        <div className="kpi-card">
          <span className="kpi-icon">📦</span>
          <div>
            <p className="kpi-num">{stats.total}</p>
            <p className="kpi-label">Total de Lotes</p>
          </div>
        </div>
        <div className="kpi-card kpi-warning">
          <span className="kpi-icon">🔀</span>
          <div>
            <p className="kpi-num">{stats.emNegociacao}</p>
            <p className="kpi-label">Em Negociação</p>
          </div>
        </div>
        <div className="kpi-card kpi-info">
          <span className="kpi-icon">⏳</span>
          <div>
            <p className="kpi-num">{stats.aguardandoPgto}</p>
            <p className="kpi-label">Ag. Pagamento</p>
          </div>
        </div>
        <div className="kpi-card kpi-success">
          <span className="kpi-icon">✅</span>
          <div>
            <p className="kpi-num">{stats.finalizados}</p>
            <p className="kpi-label">Finalizados</p>
          </div>
        </div>
      </div>

      {/* HEADER COM FILTROS */}
      <div className="salvados-header bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center w-full mb-4">
          <div>
            <h1 className="page-title">Módulo de Salvados</h1>
            <p className="text-muted text-sm">Gestão de pátio, armazenagem e propostas de lotes sinistrados.</p>
          </div>
          <button className="yf-btn-primary">+ Novo Salvado</button>
        </div>

        <div className="filters-bar flex gap-2">
          <input
            type="text"
            placeholder="  🔍  Filtrar por lote, processo ou mercadoria..."
            className="yf-input filter-main"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="yf-select" value={filterStorage} onChange={(e) => setFilterStorage(e.target.value)}>
            <option value="Todos">Todos os Locais</option>
            <option>Pátio Central</option>
            <option>Galpão A-1</option>
            <option>Galpão A-2</option>
            <option>Armazém Externo</option>
          </select>
          <select className="yf-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="Todos">Todos os Status</option>
            <option value="RECEBIDO">Recebido</option>
            <option value="EM_NEGOCIAÇÃO">Em Negociação</option>
            <option value="AGUARDANDO_PAGAMENTO">Ag. Pagamento</option>
            <option value="FINALIZADO">Finalizado</option>
          </select>
        </div>
      </div>

      {/* TABELA */}
      <div className="salvados-body bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="table-toolbar p-4 flex justify-between items-center border-bottom">
          <span className="text-xs text-muted">{filteredSalvados.length} lote(s) encontrado(s)</span>
          <div className="flex gap-1">
            <button className="icon-btn-sm bg-silver" title="Exportar CSV">📊</button>
            <button className="icon-btn-sm bg-silver" title="Imprimir">🖨️</button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="yf-table w-full">
            <thead>
              <tr>
                <th style={{ width: "120px" }}>LOTE</th>
                <th>PROCESSO</th>
                <th>MERCADORIA</th>
                <th>LOCAL</th>
                <th>ANALISTA</th>
                <th>PROPOSTAS</th>
                <th>STATUS</th>
                <th style={{ width: "80px" }}>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalvados.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-8 text-muted">
                    Nenhum salvado encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredSalvados.map(s => {
                  const st = STATUS_MAP[s.status] || { label: s.status, color: "#6B7280" };
                  return (
                    <tr key={s.id} className="row-clickable" onClick={() => window.location.href = `/salvados/${s.id}`}>
                      <td>
                        <span className="lot-tag">{s.lotNumber}</span>
                      </td>
                      <td className="font-bold text-red text-xs">{s.process}</td>
                      <td>
                        <div>
                          <span className="font-bold text-xs uppercase">{s.merchandise}</span>
                          <br />
                          <span className="text-xs text-muted">{s.dateSent}</span>
                        </div>
                      </td>
                      <td>
                        <span className="storage-tag">{s.storage}</span>
                      </td>
                      <td className="font-medium text-xs">{s.analyst}</td>
                      <td>
                        {s.propostas > 0 ? (
                          <span className="proposals-badge">{s.propostas} proposta(s)</span>
                        ) : (
                          <span className="text-xs text-muted">—</span>
                        )}
                      </td>
                      <td>
                        <span className="status-dot" style={{ background: `${st.color}22`, color: st.color, borderColor: `${st.color}44` }}>
                          {st.label}
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-1">
                          <Link href={`/salvados/${s.id}`} className="icon-btn-sm" title="Ver Dossiê">👁️</Link>
                          <button className="icon-btn-sm" title="Editar">✏️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .bg-white { background: white; }
        .p-4 { padding: 16px; }
        .p-6 { padding: 24px; }
        .p-8 { padding: 32px; }
        .rounded-lg { border-radius: 8px; }
        .shadow-sm { box-shadow: var(--shadow); }
        .mb-4 { margin-bottom: 16px; }
        .mb-6 { margin-bottom: 24px; }
        .w-full { width: 100%; }
        .text-sm { font-size: 14px; }
        .text-xs { font-size: 12px; }
        .text-muted { color: var(--muted); }
        .text-center { text-align: center; }
        .border-bottom { border-bottom: 1px solid var(--yf-silver); }
        .gap-1 { gap: 4px; }
        .gap-2 { gap: 8px; }
        .font-medium { font-weight: 500; }

        .page-title {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: var(--yf-black);
        }

        /* KPI STRIP */
        .kpi-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .kpi-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow);
          border-left: 4px solid var(--yf-silver);
        }
        .kpi-warning { border-left-color: #F59E0B; }
        .kpi-info { border-left-color: #3B82F6; }
        .kpi-success { border-left-color: #10B981; }
        .kpi-icon { font-size: 28px; }
        .kpi-num { font-size: 28px; font-weight: 800; color: var(--yf-black); line-height: 1; }
        .kpi-label { font-size: 11px; color: var(--muted); font-weight: 600; margin-top: 4px; }

        /* FILTERS */
        .filter-main { flex: 1; }

        /* TABLE */
        .table-toolbar { background: var(--yf-silver-light, #fafafa); }
        .row-clickable { cursor: pointer; transition: background 0.15s; }
        .row-clickable:hover { background: rgba(188, 0, 45, 0.02); }

        .lot-tag {
          font-size: 11px;
          font-weight: 800;
          color: var(--yf-black);
          background: var(--yf-silver-light, #f5f5f5);
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid var(--yf-silver);
          letter-spacing: 0.5px;
        }

        .storage-tag {
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 12px;
          background: rgba(188, 0, 45, 0.05);
          color: var(--yf-red);
          border: 1px solid rgba(188, 0, 45, 0.2);
        }

        .proposals-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          background: rgba(59, 130, 246, 0.08);
          color: #3B82F6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .status-dot {
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid;
          letter-spacing: 0.3px;
          white-space: nowrap;
        }

        .icon-btn-sm {
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 6px;
          background: var(--yf-silver-light, #f5f5f5);
          font-size: 13px;
          border: 1px solid var(--yf-silver);
          cursor: pointer;
          transition: background 0.15s;
          text-decoration: none;
        }
        .icon-btn-sm:hover { background: var(--yf-silver); }
        .bg-silver { background: var(--yf-silver-light, #f5f5f5); }
      `}</style>
    </div>
  );
}
