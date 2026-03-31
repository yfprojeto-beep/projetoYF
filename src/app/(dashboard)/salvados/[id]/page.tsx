"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function SalvadoDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState(1);
  const [avariaContent, setAvariaContent] = useState("");

  const tabs = [
    { num: 1, label: "Dados Principais" },
    { num: 2, label: "Anexos" },
    { num: 3, label: "Histórico" },
    { num: 4, label: "Propostas" },
    { num: 5, label: "Pagamento" },
    { num: 6, label: "Finalização" },
  ];

  return (
    <div className="salvado-detail-page">
      <div className="detail-header flex justify-between items-center mb-8">
        <div className="breadcrumb-nav">
          <nav className="text-muted mb-1 text-xs">
            <Link href="/dashboard">INÍCIO</Link> / <Link href="/salvados">SALVADOS</Link> / Detalhe Salvado
          </nav>
          <h1>Salvado <span className="text-red">#{params.id}</span></h1>
          <div className="flex gap-2 mt-1">
             <p className="text-xs font-bold uppercase">PROCESSO: <span className="text-red">202412.215.32</span></p>
             <p className="text-xs text-muted">SEGURADO: LEAL TRANSPORTES</p>
          </div>
        </div>
        <Link href="/salvados" className="yf-btn-secondary">VOLTAR</Link>
      </div>

      <div className="salvado-tabs-container bg-white rounded-lg shadow-sm overflow-hidden">
        <nav className="tabs-nav border-bottom flex bg-silver-light">
          {tabs.map((tab) => (
            <button
              key={tab.num}
              className={`tab-btn ${activeTab === tab.num ? "active" : ""}`}
              onClick={() => setActiveTab(tab.num)}
            >
              {tab.num}. {tab.label.toUpperCase()}
            </button>
          ))}
        </nav>

        <div className="tab-content p-6">
          {activeTab === 1 && (
            <div className="form-sections">
                <div className="section mb-8">
                    <h3 className="section-title mb-4">INFORMAÇÕES DA MERCADORIA</h3>
                    <div className="flex gap-2">
                        <div className="form-field flex-1">
                            <label>Mercadoria *</label>
                            <input type="text" defaultValue="Pera, Energéticos, etc." className="yf-input w-full" />
                        </div>
                        <div className="form-field flex-1">
                            <label>Tipo Quantidade *</label>
                            <input type="text" defaultValue="UNID" className="yf-input w-full" />
                        </div>
                        <div className="form-field flex-1">
                            <label>Quantidade *</label>
                            <input type="number" defaultValue="150" className="yf-input w-full" />
                        </div>
                    </div>
                </div>

                <div className="section mb-8">
                    <h3 className="section-title mb-4">DESCRIÇÃO DAS AVARIAS</h3>
                    <div className="quill-wrapper">
                        <ReactQuill 
                            theme="snow" 
                            value={avariaContent} 
                            onChange={setAvariaContent}
                            style={{ height: "200px", marginBottom: "50px" }}
                        />
                    </div>
                </div>

                <div className="section mb-4">
                    <h3 className="section-title mb-4">REMESSA / LOCALIZAÇÃO</h3>
                    <div className="flex gap-2">
                        <div className="form-field flex-1">
                            <label>Remetente</label>
                            <input type="text" placeholder="Nome do remetente..." className="yf-input w-full" />
                        </div>
                        <div className="form-field flex-1">
                            <label>Destinatário</label>
                            <input type="text" placeholder="Nome do destinatário..." className="yf-input w-full" />
                        </div>
                        <div className="form-field flex-1">
                            <label>Local de Armazenagem *</label>
                            <select className="yf-select w-full">
                                <option>Pátio Central</option>
                                <option>Galpão A-1</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {activeTab > 1 && (
            <div className="empty-state p-12 text-center text-muted">
              <p>Módulo de {tabs.find(t => t.num === activeTab)?.label} em desenvolvimento.</p>
              <p className="text-xs">Replicando funcionalidades da plataforma PROJETO YF.</p>
            </div>
          )}
        </div>

        <div className="tab-footer p-6 border-top flex justify-end gap-1">
            <button className="yf-btn-secondary">CANCELAR</button>
            <button className="yf-btn-primary">SALVAR INFORMAÇÕES</button>
        </div>
      </div>

      <style jsx>{`
        .bg-white { background: white; }
        .bg-silver-light { background: var(--yf-silver-light); }
        .p-6 { padding: 24px; }
        .p-12 { padding: 48px; }
        .rounded-lg { border-radius: 8px; }
        .shadow-sm { box-shadow: var(--shadow); }
        .border-bottom { border-bottom: 2px solid var(--yf-silver); }
        .border-top { border-top: 1px solid var(--yf-silver); }
        .flex-1 { flex: 1; }
        .mb-1 { margin-bottom: 8px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-8 { margin-bottom: 32px; }
        .w-full { width: 100%; }
        
        .tab-btn {
          padding: 16px 24px;
          font-size: 11px;
          font-weight: 800;
          color: var(--muted);
          border-bottom: 3px solid transparent;
          white-space: nowrap;
        }

        .tab-btn.active {
          color: var(--yf-red);
          border-bottom-color: var(--yf-red);
          background: var(--yf-white);
        }

        .section-title {
          font-size: 14px;
          font-weight: 800;
          color: var(--yf-black);
          border-left: 4px solid var(--yf-red);
          padding-left: 12px;
        }

        .form-field label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 6px;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
}
