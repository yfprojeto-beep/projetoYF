"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Entidade {
  id: string;
  name: string;
  document: string;
  email: string | null;
  phone: string | null;
  region?: string; // Para Vistoriadores
  active: boolean;
  createdAt: string;
}

const MOCK_VISTORIADORES: Entidade[] = [
  { id: "V01", name: "Carlos Alberto Silva", document: "123.456.789-00", email: "carlos@example.com", phone: "(11) 99999-1111", region: "São Paulo/SP", active: true, createdAt: "15/01/2026" },
  { id: "V02", name: "Maria Helena Souza", document: "098.765.432-11", email: "maria@example.com", phone: "(41) 98888-2222", region: "Curitiba/PR", active: true, createdAt: "20/02/2026" },
  { id: "V03", name: "Roberto Dias", document: "456.123.789-33", email: "roberto@example.com", phone: "(21) 97777-3333", region: "Rio de Janeiro/RJ", active: false, createdAt: "10/03/2026" },
];

const MOCK_SEGURADORAS: Entidade[] = [
  { id: "S01", name: "Mapfre Seguros", document: "11.111.111/0001-11", email: "contato@mapfre.com.br", phone: "0800 775 4545", active: true, createdAt: "05/01/2026" },
  { id: "S02", name: "Porto Seguro Companhia", document: "22.222.222/0001-22", email: "parceiros@portoseguro.com.br", phone: "0800 727 2747", active: true, createdAt: "12/01/2026" },
  { id: "S03", name: "Allianz Brasil Seguradora S.A.", document: "33.333.333/0001-33", email: "sinistros@allianz.com.br", phone: "0800 015 1800", active: true, createdAt: "18/02/2026" },
];

export default function CadastrosPage() {
  const [activeTab, setActiveTab] = useState<"VISTORIADORES" | "SEGURADORAS">("VISTORIADORES");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const data = activeTab === "VISTORIADORES" ? MOCK_VISTORIADORES : MOCK_SEGURADORAS;
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.document.includes(searchTerm)
  );

  return (
    <div className="cadastros-page space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Central de Cadastros</h1>
          <p className="text-muted text-sm">Gerencie entidades base, profissionais e empresas parceiras.</p>
        </div>
        <button className="yf-btn-primary h-[42px] px-6" onClick={() => setModalOpen(true)}>
          + CADASTRAR {activeTab === "VISTORIADORES" ? "VISTORIADOR" : "SEGURADORA"}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Entity Tabs */}
        <div className="tabs-header flex border-bottom bg-silver-light">
          <button 
            className={`tab-btn flex-1 py-4 text-xs font-bold uppercase transition-colors ${activeTab === "VISTORIADORES" ? "active" : "text-muted"}`}
            onClick={() => setActiveTab("VISTORIADORES")}
          >
            📋 Vistoriadores de Campo ({MOCK_VISTORIADORES.length})
          </button>
          <button 
            className={`tab-btn flex-1 py-4 text-xs font-bold uppercase transition-colors ${activeTab === "SEGURADORAS" ? "active" : "text-muted"}`}
            onClick={() => setActiveTab("SEGURADORAS")}
          >
            🏢 Companhias Seguradoras ({MOCK_SEGURADORAS.length})
          </button>
        </div>

        {/* Toolbar */}
        <div className="toolbar p-4 flex justify-between items-center border-bottom bg-white">
          <div className="search-bar w-[400px]">
            <input 
              type="text" 
              className="yf-input w-full" 
              placeholder="Buscar por Nome ou Documento..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="yf-btn-secondary">Exportar XLSX</button>
          </div>
        </div>

        {/* Data Table */}
        <table className="yf-table w-full">
          <thead>
            <tr>
              <th style={{ width: "25%" }}>NOME / RAZÃO SOCIAL</th>
              <th style={{ width: "15%" }}>{activeTab === "VISTORIADORES" ? "CPF" : "CNPJ"}</th>
              <th style={{ width: "25%" }}>CONTATOS</th>
              {activeTab === "VISTORIADORES" && <th style={{ width: "15%" }}>REGIÃO DE ATUAÇÃO</th>}
              <th style={{ width: "10%" }}>STATUS</th>
              <th style={{ width: "10%" }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={activeTab === "VISTORIADORES" ? 6 : 5} className="text-center p-8 text-muted">
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              filteredData.map(item => (
                <tr key={item.id}>
                  <td>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-muted">Cadastrado em {item.createdAt}</p>
                  </td>
                  <td className="font-medium">{item.document}</td>
                  <td>
                    <p className="text-xs text-muted mb-1">📧 {item.email || "Não informado"}</p>
                    <p className="text-xs text-muted">📞 {item.phone || "Não informado"}</p>
                  </td>
                  {activeTab === "VISTORIADORES" && <td><span className="region-badge">{item.region}</span></td>}
                  <td>
                    {item.active ? (
                      <span className="status-badge success text-xs font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">ATIVO</span>
                    ) : (
                      <span className="status-badge inactive text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-500">INATIVO</span>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="icon-btn-sm" title="Editar">✏️</button>
                      <button className="icon-btn-sm" title={item.active ? "Desativar" : "Ativar"}>
                        {item.active ? "🚫" : "✅"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
           <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header p-6 border-bottom flex justify-between items-center bg-white rounded-t-lg">
                 <h2 className="text-xl font-bold">Novo {activeTab === "VISTORIADORES" ? "Vistoriador" : "Seguradora"}</h2>
                 <button className="close-btn text-2xl" onClick={() => setModalOpen(false)}>&times;</button>
              </div>
              <form className="modal-body p-6 bg-white rounded-b-lg">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="form-group col-span-2">
                          <label className="block text-xs font-bold mb-2 text-muted uppercase">Nome / Razão Social *</label>
                          <input type="text" className="yf-input w-full" required />
                      </div>
                      <div className="form-group">
                          <label className="block text-xs font-bold mb-2 text-muted uppercase">{activeTab === "VISTORIADORES" ? "CPF" : "CNPJ"} *</label>
                          <input type="text" className="yf-input w-full" required />
                      </div>
                      {activeTab === "VISTORIADORES" && (
                        <div className="form-group">
                            <label className="block text-xs font-bold mb-2 text-muted uppercase">Região de Atuação *</label>
                            <input type="text" className="yf-input w-full" placeholder="Ex: São Paulo/SP" required />
                        </div>
                      )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="form-group">
                          <label className="block text-xs font-bold mb-2 text-muted uppercase">E-mail</label>
                          <input type="email" className="yf-input w-full" />
                      </div>
                      <div className="form-group">
                          <label className="block text-xs font-bold mb-2 text-muted uppercase">Telefone</label>
                          <input type="text" className="yf-input w-full" />
                      </div>
                  </div>
                  <div className="modal-footer flex justify-end gap-2 pt-4 border-top">
                      <button type="button" className="yf-btn-secondary" onClick={() => setModalOpen(false)}>CANCELAR</button>
                      <button type="button" className="yf-btn-primary" onClick={() => setModalOpen(false)}>SALVAR CADASTRO</button>
                  </div>
              </form>
           </div>
        </div>
      )}

      <style jsx>{`
        /* Base */
        .bg-white { background: white; }
        .bg-silver-light { background: var(--yf-silver-light, #f7f7f7); }
        .text-muted { color: var(--muted, #64748b); }
        .mb-1 { margin-bottom: 4px; }
        .mb-2 { margin-bottom: 8px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-6 { margin-bottom: 24px; }
        .mb-8 { margin-bottom: 32px; }
        .p-4 { padding: 16px; }
        .p-6 { padding: 24px; }
        .p-8 { padding: 32px; }
        .py-1 { padding-top: 4px; padding-bottom: 4px; }
        .px-2 { padding-left: 8px; padding-right: 8px; }
        .py-4 { padding-top: 16px; padding-bottom: 16px; }
        .rounded-lg { border-radius: 8px; }
        .rounded-t-lg { border-top-left-radius: 8px; border-top-right-radius: 8px; }
        .rounded-b-lg { border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; }
        .rounded-full { border-radius: 9999px; }
        .shadow-sm { box-shadow: var(--shadow); }
        .w-full { width: 100%; }
        .w-\\[400px\\] { width: 400px; }
        .h-\\[42px\\] { height: 42px; }
        .flex-1 { flex: 1; }
        .text-2xl { font-size: 24px; }
        .text-xl { font-size: 20px; }
        .text-sm { font-size: 14px; }
        .text-xs { font-size: 12px; }
        .font-bold { font-weight: 700; }
        .font-medium { font-weight: 500; }
        .uppercase { text-transform: uppercase; }
        .text-center { text-align: center; }
        
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .col-span-2 { grid-column: span 2 / span 2; }
        .gap-2 { gap: 8px; }
        .gap-4 { gap: 16px; }

        .border-bottom { border-bottom: 1px solid var(--yf-silver); }
        .border-top { border-top: 1px solid var(--yf-silver); }

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
        .region-badge {
          font-size: 11px;
          background: var(--yf-silver);
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
        }
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

        /* Modal */
        .modal-overlay {
           position: fixed;
           top: 0; left: 0; right: 0; bottom: 0;
           background: rgba(0,0,0,0.5);
           z-index: 1001;
           display: flex; align-items: center; justify-content: center;
        }
        .modal {
           width: 600px;
           box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
           animation: fadeIn 0.15s ease-out;
        }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        
        /* Tails colors bypass */
        .bg-emerald-100 { background-color: #d1fae5; }
        .text-emerald-700 { color: #047857; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .text-gray-500 { color: #6b7280; }
      `}</style>
    </div>
  );
}
