"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./detail.css";

export default function ProcessDetailPage({ params }: { params: { id: string } }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState("CHECKLIST");

  const cards = [
    { name: "Relatório Preliminar", icon: "📄", path: "relatorio-preliminar" },
    { name: "Histórico", icon: "🕰️", path: "historico" },
    { name: "Vistoria", icon: "🔍", path: "vistoria" },
    { name: "Acompanhamento Vistoria", icon: "📍", path: "acompanhamento" },
    { name: "Encaminhamento Processo", icon: "➡️", path: "encaminhamento" },
    { name: "Serviço", icon: "🛠️", path: "servico" },
    { name: "Mídias", icon: "🖼️", path: "midias" },
    { name: "Cobrança de Documentos", icon: "📂", path: "documentos" },
    { name: "Detalhes do Evento", icon: "🖊️", path: "detalhes-evento" },
    { name: "Nota Fiscal", icon: "🧾", path: "nota-fiscal" },
    { name: "Solicitação de Adiantamento", icon: "💵", path: "adiantamento" },
    { name: "Análise", icon: "⚖️", path: "analise" },
  ];

  return (
    <div className="process-detail-page">
      {/* Breadcrumbs & Header */}
      <div className="detail-header flex justify-between items-center">
        <div className="flex-column">
          <nav className="breadcrumb text-muted mb-1">
            <Link href="/dashboard">Início</Link> / <Link href="/processos">Processos</Link> / Editar Processo
          </nav>
          <h1>Processo <span className="text-red">2026.03.57.48.54</span></h1>
          <div className="flex gap-2 mt-1 status-info">
            <p><strong>Segurado:</strong> LEAL TRANSPORTES E SUPRIMENTOS LTDA</p>
            <p><strong>Seguradora:</strong> HDI GLOBAL SEGUROS S.A.</p>
          </div>
        </div>
        
        <div className="flex gap-1 actions">
          <button className="yf-btn-secondary" onClick={() => setDrawerOpen(true)}>INFORMAÇÕES</button>
          <button className="icon-btn">💬</button>
          <button className="yf-btn-primary">VOLTAR</button>
        </div>
      </div>

      {/* 12 Cards Grid */}
      <div className="cards-grid mt-2">
        {cards.map((card) => (
          <Link key={card.path} href={`/processos/${params.id}/${card.path}`} className="detail-card">
            <div className="card-icon">{card.icon}</div>
            <div className="card-name">{card.name}</div>
          </Link>
        ))}
      </div>

      {/* SIDE DRAWER (Informações) */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header flex justify-between items-center">
              <div className="drawer-tabs">
                {["OBS", "ATIVIDADES", "MÍDIAS", "CHECKLIST", "FASES"].map(tab => (
                  <button 
                    key={tab} 
                    className={`drawer-tab-btn ${activeDrawerTab === tab ? "active" : ""}`}
                    onClick={() => setActiveDrawerTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button className="close-drawer" onClick={() => setDrawerOpen(false)}>&times;</button>
            </div>
            
            <div className="drawer-content p-4">
              {activeDrawerTab === "CHECKLIST" && (
                <ul className="checklist">
                   <li>
                     <div className="flex items-center gap-1">
                        <input type="checkbox" checked readOnly />
                        <span className="font-bold">Relatório Preliminar incompleto</span>
                     </div>
                     <span className="badge-warning">!</span>
                   </li>
                   <li>
                     <div className="flex items-center gap-1">
                        <input type="checkbox" checked readOnly />
                        <span className="font-bold">Sem causa evento</span>
                     </div>
                     <span className="badge-danger">&times;</span>
                   </li>
                   <li>
                     <div className="flex items-center gap-1">
                        <input type="checkbox" checked readOnly />
                        <span className="font-bold">Sem local evento</span>
                     </div>
                     <span className="badge-warning">!</span>
                   </li>
                   <li>
                     <div className="flex items-center gap-1">
                        <input type="checkbox" checked readOnly />
                        <span className="font-bold">Sem moeda</span>
                     </div>
                     <span className="badge-danger">&times;</span>
                   </li>
                   <li>
                     <div className="flex items-center gap-1">
                        <input type="checkbox" checked readOnly />
                        <span className="font-bold">Salvados não enviados</span>
                     </div>
                     <span className="badge-danger">&times;</span>
                   </li>
                   <li>
                     <div className="flex items-center gap-1">
                        <input type="checkbox" checked readOnly />
                        <span className="font-bold">Vistoriador sem encerramento</span>
                     </div>
                     <span className="badge-danger">&times;</span>
                   </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .mb-1 { margin-bottom: 8px; }
        .detail-header h1 { font-size: 28px; font-weight: 800; }
        .status-info p { font-size: 14px; }
        .status-info strong { color: var(--yf-black); }
        .breadcrumb { font-size: 13px; }
        .breadcrumb a:hover { color: var(--yf-red); }
        
        .yf-btn-secondary {
            background: var(--yf-silver);
            color: var(--yf-black);
            padding: 10px 20px;
            border-radius: var(--radius);
            font-weight: 600;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .detail-card {
          background: var(--yf-white);
          padding: 32px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          transition: all 0.2s;
          text-align: center;
          border: 1px solid transparent;
        }

        .detail-card:hover {
          transform: translateY(-4px);
          border-color: var(--yf-red);
          box-shadow: 0 10px 15px -3px rgba(188, 0, 45, 0.1);
        }

        .card-icon { font-size: 32px; }
        .card-name { font-weight: 700; font-size: 16px; color: var(--yf-black); }

        /* DRAWER STYLES */
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
        }

        .drawer {
          width: 450px;
          height: 100%;
          background: var(--yf-white);
          box-shadow: -10px 0 15px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-header {
          padding: 0 16px;
          border-bottom: 1px solid var(--yf-silver);
        }

        .drawer-tabs { display: flex; overflow-x: auto; flex: 1; }
        .drawer-tab-btn {
          padding: 20px 16px;
          font-size: 11px;
          font-weight: 700;
          color: var(--muted);
          border-bottom: 3px solid transparent;
          white-space: nowrap;
        }

        .drawer-tab-btn.active {
          color: var(--yf-red);
          border-bottom-color: var(--yf-red);
        }

        .checklist { list-style: none; display: flex; flex-direction: column; gap: 16px; }
        .checklist li { display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--yf-silver-light); border-radius: 8px; }
        
        .badge-warning { background: #FBBF24; color: white; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; font-size: 12px; }
        .badge-danger { background: #EF4444; color: white; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; font-size: 14px; }
      `}</style>
    </div>
  );
}
