"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Transaction {
  id: string;
  type: "RECEITA" | "DESPESA";
  amount: number;
  description: string;
  status: "PENDENTE" | "PAGO" | "ATRASADO" | "CANCELADO";
  dueDate: string;
  paidDate?: string;
  referenceId?: string;
  referenceType?: "ADIANTAMENTO" | "SALVADO_VENDA";
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "TR-2026-001", type: "RECEITA", amount: 9100.00, description: "Venda de Lote de Salvado", status: "PENDENTE", dueDate: "05/04/2026", referenceId: "S1003", referenceType: "SALVADO_VENDA" },
  { id: "TR-2026-002", type: "DESPESA", amount: 1500.00, description: "Adiantamento - Honorários Vistoria", status: "PAGO", dueDate: "30/03/2026", paidDate: "28/03/2026", referenceId: "A103", referenceType: "ADIANTAMENTO" },
  { id: "TR-2026-003", type: "RECEITA", amount: 35400.00, description: "Repasse Seguradora Allianz", status: "PAGO", dueDate: "25/03/2026", paidDate: "26/03/2026" },
  { id: "TR-2026-004", type: "DESPESA", amount: 450.00, description: "Adiantamento - Pedágio/Combustível", status: "ATRASADO", dueDate: "29/03/2026", referenceId: "A102", referenceType: "ADIANTAMENTO" },
];

export default function FinanceiroPage() {
  const [activeTab, setActiveTab] = useState<"TODAS" | "RECEITAS" | "DESPESAS">("TODAS");
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState<"SUPER_ADMIN" | "ANALISTA">("ANALISTA"); // Mocked Role
  
  // Dashboard KPIs
  const totalReceitas = MOCK_TRANSACTIONS.filter(t => t.type === "RECEITA" && t.status === "PAGO").reduce((acc, curr) => acc + curr.amount, 0);
  const totalDespesas = MOCK_TRANSACTIONS.filter(t => t.type === "DESPESA" && t.status === "PAGO").reduce((acc, curr) => acc + curr.amount, 0);
  const saldoPrevisto = MOCK_TRANSACTIONS.filter(t => t.status === "PENDENTE" || t.status === "ATRASADO").reduce((acc, curr) => {
    return curr.type === "RECEITA" ? acc + curr.amount : acc - curr.amount;
  }, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const filteredTransactions = MOCK_TRANSACTIONS.filter(t => {
    if (activeTab === "RECEITAS" && t.type !== "RECEITA") return false;
    if (activeTab === "DESPESAS" && t.type !== "DESPESA") return false;
    return t.description.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleApprovePayment = (id: string, type: string) => {
    if (userRole !== "SUPER_ADMIN") {
      alert("Acesso Negado: Apenas o perfil Diretor/Financeiro possui permissão para aprovar liquidação de faturas e pagamentos no sistema.");
      return;
    }
    alert(`Sucesso: Transação ${id} marcada como Paga (Mock).`);
  };

  return (
    <div className="financeiro-page space-y-6">
      {/* HEADER & ROLE MOCK TOGGLE */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Painel Financeiro</h1>
          <p className="text-muted text-sm">Contas a pagar e receber, fluxo de caixa e relatórios consolidados.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-right">
            <span className="text-xs font-bold text-muted uppercase">Perfil Simulado:</span>
            <select 
                className="yf-select text-xs py-1 font-bold" 
                value={userRole} 
                onChange={e => setUserRole(e.target.value as any)}
                title="Mudar para testar restrição de acesso"
            >
              <option value="SUPER_ADMIN">Diretor Financeiro (Admin)</option>
              <option value="ANALISTA">Analista Base (Sem Permissão)</option>
            </select>
          </div>
          <button className="yf-btn-primary h-[42px] px-6">
            + NOVO LANÇAMENTO
          </button>
        </div>
      </div>

      {/* KPIs DASHBOARD */}
      <div className="kpi-grid grid grid-cols-4 gap-4 mb-4">
        <div className="kpi-card bg-white p-5 rounded-lg border-l-4 border-emerald-500 shadow-sm flex flex-col justify-center">
            <p className="kpi-title text-xs font-bold text-muted uppercase mb-2">Total Recebido (Mês)</p>
            <p className="kpi-value text-2xl font-bold text-emerald-600">{formatCurrency(totalReceitas)}</p>
        </div>
        <div className="kpi-card bg-white p-5 rounded-lg border-l-4 border-yf-red shadow-sm flex flex-col justify-center">
            <p className="kpi-title text-xs font-bold text-muted uppercase mb-2">Total Pago (Mês)</p>
            <p className="kpi-value text-2xl font-bold text-yf-red">{formatCurrency(totalDespesas)}</p>
        </div>
        <div className="kpi-card bg-white p-5 rounded-lg border-l-4 border-blue-500 shadow-sm flex flex-col justify-center">
            <p className="kpi-title text-xs font-bold text-muted uppercase mb-2">Saldo Atual</p>
            <p className="kpi-value text-2xl font-bold text-blue-600">{formatCurrency(totalReceitas - totalDespesas)}</p>
        </div>
        <div className="kpi-card bg-white p-5 rounded-lg border-l-4 border-amber-500 shadow-sm flex flex-col justify-center">
            <p className="kpi-title text-xs font-bold text-muted uppercase mb-2">Balanço Previsto (Pendentes)</p>
            <p className={`kpi-value text-2xl font-bold ${saldoPrevisto < 0 ? 'text-yf-red' : 'text-amber-500'}`}>
               {formatCurrency(saldoPrevisto)}
            </p>
        </div>
      </div>

      {/* TRANSACTION LIST */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="tabs-header flex border-bottom bg-silver-light">
          <button 
            className={`tab-btn flex-1 py-4 text-xs font-bold uppercase transition-colors ${activeTab === "TODAS" ? "active" : "text-muted"}`}
            onClick={() => setActiveTab("TODAS")}
          >
            Todas Transações ({parseInt(MOCK_TRANSACTIONS.length.toString())})
          </button>
          <button 
            className={`tab-btn flex-1 py-4 text-xs font-bold uppercase transition-colors ${activeTab === "RECEITAS" ? "active" : "text-muted"}`}
            onClick={() => setActiveTab("RECEITAS")}
          >
            Apenas Entradas (Receitas)
          </button>
          <button 
            className={`tab-btn flex-1 py-4 text-xs font-bold uppercase transition-colors ${activeTab === "DESPESAS" ? "active" : "text-muted"}`}
            onClick={() => setActiveTab("DESPESAS")}
          >
            Apenas Saídas (Despesas)
          </button>
        </div>

        <div className="toolbar p-4 flex justify-between items-center border-bottom bg-white">
          <div className="search-bar w-[400px]">
            <input 
              type="text" 
              className="yf-input w-full" 
              placeholder="Buscar por ID ou Descrição..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="yf-select text-sm h-[38px]">
              <option>Status: Todos</option>
              <option>Pendente</option>
              <option>Pago</option>
              <option>Atrasado</option>
            </select>
          </div>
        </div>

        <table className="yf-table w-full">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>ID TRANSAÇÃO</th>
              <th style={{ width: "30%" }}>DESCRIÇÃO</th>
              <th style={{ width: "15%" }}>VENCIMENTO</th>
              <th style={{ width: "15%" }}>VALOR</th>
              <th style={{ width: "10%" }}>STATUS</th>
              <th style={{ width: "15%" }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-8 text-muted">Nenhuma transação encontrada.</td>
              </tr>
            ) : (
              filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td>
                    <p className="font-bold text-xs">{t.id}</p>
                    {t.referenceId && (
                      <p className="font-bold text-[10px] text-muted uppercase truncate mt-1">Ref: {t.referenceId} ({t.referenceType})</p>
                    )}
                  </td>
                  <td>
                    <p className="text-sm">{t.description}</p>
                  </td>
                  <td>
                    <p className="text-sm font-medium">{t.dueDate}</p>
                    {t.status === "PAGO" && <p className="text-[10px] text-emerald-600 mt-1">Liquidado: {t.paidDate}</p>}
                  </td>
                  <td>
                     <p className={`font-bold ${t.type === "RECEITA" ? "text-emerald-600" : "text-yf-red"}`}>
                        {t.type === "RECEITA" ? "+" : "-"}{formatCurrency(t.amount)}
                     </p>
                  </td>
                  <td>
                    {t.status === "PAGO" && <span className="status-badge px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">PAGO</span>}
                    {t.status === "PENDENTE" && <span className="status-badge px-2 py-1 rounded bg-amber-100 text-amber-700 text-[10px] font-bold">PENDENTE</span>}
                    {t.status === "ATRASADO" && <span className="status-badge px-2 py-1 rounded bg-red-100 text-red-700 text-[10px] font-bold">ATRASADO</span>}
                  </td>
                  <td>
                    <div className="flex gap-1 items-center">
                      <button className="icon-btn-sm" title="Ver Detalhes">📄</button>
                      {(t.status === "PENDENTE" || t.status === "ATRASADO") && (
                        <button 
                            className={`flex text-[10px] px-2 py-1 rounded font-bold text-white transition-opacity hover:opacity-80
                                ${userRole === "SUPER_ADMIN" ? "bg-emerald-600 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}
                            `}
                            onClick={() => handleApprovePayment(t.id, t.type)}
                            title={userRole === "SUPER_ADMIN" ? "Confirmar Pagamento Realizado" : "Requer Nível de Diretoria para aprovar"}
                        >
                            ✓ BAIXAR
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        /* Base Setup */
        .bg-white { background: white; }
        .bg-silver-light { background: var(--yf-silver-light, #f7f7f7); }
        .text-muted { color: var(--muted, #64748b); }
        .mb-1 { margin-bottom: 4px; }
        .mb-2 { margin-bottom: 8px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-8 { margin-bottom: 32px; }
        .mt-1 { margin-top: 4px; }
        .p-4 { padding: 16px; }
        .p-5 { padding: 20px; }
        .p-8 { padding: 32px; }
        .px-2 { padding-left: 8px; padding-right: 8px; }
        .py-1 { padding-top: 4px; padding-bottom: 4px; }
        .py-4 { padding-top: 16px; padding-bottom: 16px; }
        .px-6 { padding-left: 24px; padding-right: 24px; }
        .rounded-lg { border-radius: 8px; }
        .rounded { border-radius: 4px; }
        .shadow-sm { box-shadow: var(--shadow); }
        .w-full { width: 100%; }
        .w-\\[400px\\] { width: 400px; }
        .h-\\[38px\\] { height: 38px; }
        .h-\\[42px\\] { height: 42px; }
        .flex-1 { flex: 1; }
        .text-2xl { font-size: 24px; }
        .text-[10px] { font-size: 10px; }
        .text-sm { font-size: 14px; }
        .text-xs { font-size: 12px; }
        .font-bold { font-weight: 700; }
        .font-medium { font-weight: 500; }
        .uppercase { text-transform: uppercase; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .items-center { align-items: center; }
        .flex-col { flex-direction: column; }
        .justify-center { justify-content: center; }
        .transition-opacity { transition: opacity 0.2s; }
        .hover\\:opacity-80:hover { opacity: 0.8; }
        .cursor-not-allowed { cursor: not-allowed; }
        .cursor-pointer { cursor: pointer; }
        
        .grid { display: grid; }
        .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .gap-1 { gap: 4px; }
        .gap-2 { gap: 8px; }
        .gap-4 { gap: 16px; }

        .border-bottom { border-bottom: 1px solid var(--yf-silver); }
        .border-l-4 { border-left-width: 4px; border-left-style: solid; }

        .border-emerald-500 { border-left-color: #10B981; }
        .border-yf-red { border-left-color: var(--yf-red); }
        .border-amber-500 { border-left-color: #F59E0B; }
        .border-blue-500 { border-left-color: #3B82F6; }

        .text-emerald-600 { color: #059669; }
        .text-yf-red { color: var(--yf-red); }
        .text-amber-500 { color: #F59E0B; }
        .text-blue-600 { color: #2563EB; }
        
        /* Tails colors bypass */
        .bg-emerald-100 { background-color: #d1fae5; }
        .text-emerald-700 { color: #047857; }
        .bg-emerald-600 { background-color: #059669; }
        .bg-red-100 { background-color: #fee2e2; }
        .text-red-700 { color: #b91c1c; }
        .bg-amber-100 { background-color: #fef3c7; }
        .text-amber-700 { color: #b45309; }
        .bg-gray-400 { background-color: #9ca3af; }
        .text-white { color: white; }

        /* Tabs */
        .tab-btn {
          background: transparent;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
        }
        .tab-btn:hover { color: var(--yf-red); }
        .tab-btn.active {
          color: var(--yf-red);
          border-bottom-color: var(--yf-red);
          background: white;
        }

        /* Elements */
        .icon-btn-sm {
          font-size: 14px;
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 4px;
          background: var(--yf-silver-light);
          border: 1px solid var(--yf-silver);
          cursor: pointer;
          transition: background 0.2s;
        }
        .icon-btn-sm:hover { background: var(--yf-silver); }
      `}</style>
    </div>
  );
}
