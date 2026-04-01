"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./relatorio-preliminar.css";

export default function RelatorioPreliminarPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState({
    processoVinculado: "",
    tipoProcesso: "",
    tipoSolicitante: "Seguradora",
    nomeSolicitante: "HDI GLOBAL",
    emailSolicitante: "solutions@uongroup.com",
    // ... outros campos seriam adicionados aqui
  });

  const tabs = [
    { num: 1, label: "Aviso Sinistro" },
    { num: 2, label: "Segurado" },
    { num: 3, label: "Transportador" },
    { num: 4, label: "Ocorrência" },
    { num: 5, label: "Mercadoria" },
    { num: 6, label: "Gerenciadora" },
    { num: 7, label: "Vistoria" },
    { num: 8, label: "Finalizar" },
  ];

  return (
    <div className="relatorio-page">
      <div className="relatorio-header flex justify-between items-center mb-8">
        <div className="breadcrumb-nav">
          <nav className="text-muted mb-1 text-xs">
            <Link href="/dashboard">INÍCIO</Link> / <Link href="/processos">PROCESSOS</Link> / <Link href={`/processos/${params.id}`}>EDITAR PROCESSO</Link>
          </nav>
          <h1>Relatório Preliminar <span className="text-muted ml-2 text-lg">#{params.id}</span></h1>
        </div>
        <Link href={`/processos/${params.id}`} className="yf-btn-secondary">VOLTAR</Link>
      </div>

      <div className="relatorio-card">
        <nav className="relatorio-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab.num}
              className={`relatorio-tab-btn ${activeTab === tab.num ? "active" : ""}`}
              onClick={() => setActiveTab(tab.num)}
            >
              {tab.num}. {tab.label.toUpperCase()}
            </button>
          ))}
        </nav>

        <div className="relatorio-tab-content p-6">
          {activeTab === 1 && (
            <div className="form-section">
              <h3 className="section-title">AVISO DE SINISTRO</h3>
              
              <div className="flex gap-2 mt-2">
                <div className="form-field flex-1">
                  <label>Processo Vinculado</label>
                  <input type="text" placeholder="Digite se houver..." className="yf-input" />
                </div>
                <div className="form-field flex-1">
                  <label>Tipo de Processo</label>
                  <select className="yf-select">
                    <option>Selecione...</option>
                    <option>Atendimento</option>
                    <option>Vistoria</option>
                  </select>
                </div>
              </div>

              <h3 className="section-title mt-4">DADOS DO SOLICITANTE</h3>
              <div className="flex gap-2 mt-2">
                <div className="form-field flex-1">
                  <label>Tipo de Solicitante *</label>
                  <select className="yf-select">
                    <option>Seguradora</option>
                    <option>Corretora</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div className="form-field flex-2">
                  <label>Nome *</label>
                  <input type="text" defaultValue="HDI GLOBAL" className="yf-input" />
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <div className="form-field flex-1">
                  <label>Telefone</label>
                  <input type="text" placeholder="(00) 0000-0000" className="yf-input" />
                </div>
                <div className="form-field flex-1">
                  <label>Celular</label>
                  <input type="text" placeholder="(00) 90000-0000" className="yf-input" />
                </div>
                <div className="form-field flex-2">
                  <label>E-mail *</label>
                  <input type="email" defaultValue="solutions@uongroup.com" className="yf-input" />
                </div>
              </div>
            </div>
          )}

          {activeTab > 1 && (
            <div className="empty-state p-12 text-center text-muted">
              <p>Módulo de {tabs.find(t => t.num === activeTab)?.label} em desenvolvimento.</p>
              <p className="text-xs">Replicando campos do sistema Wagner Reguladora.</p>
            </div>
          )}
        </div>

        <div className="relatorio-footer p-6 border-top flex justify-between">
          <button 
            className="yf-btn-secondary" 
            disabled={activeTab === 1}
            onClick={() => setActiveTab(prev => Math.max(1, prev - 1))}
          >
            ANTERIOR
          </button>
          <div className="flex gap-1">
            <button className="yf-btn-success">SALVAR</button>
            <button 
                className="yf-btn-primary" 
                disabled={activeTab === 8}
                onClick={() => setActiveTab(prev => Math.min(8, prev + 1))}
            >
                PRÓXIMO
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .relatorio-header h1 { font-size: 28px; font-weight: 800; color: var(--yf-black); }
        .text-lg { font-size: 18px; }
        .ml-2 { margin-left: 8px; }
        
        .relatorio-card {
           background: var(--yf-white);
           border-radius: var(--radius);
           box-shadow: var(--shadow);
           overflow: hidden;
        }

        .relatorio-tabs-nav {
           display: flex;
           background: var(--yf-silver-light);
           border-bottom: 2px solid var(--yf-silver);
           overflow-x: auto;
        }

        .relatorio-tab-btn {
           padding: 20px 24px;
           font-size: 11px;
           font-weight: 800;
           color: var(--muted);
           border-bottom: 3px solid transparent;
           white-space: nowrap;
        }

        .relatorio-tab-btn.active {
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
           margin-bottom: 16px;
        }

        .form-field label {
           display: block;
           font-size: 12px;
           font-weight: 700;
           margin-bottom: 6px;
           color: var(--muted);
        }

        .yf-input, .yf-select {
           width: 100%;
           padding: 10px 14px;
           border: 1.5px solid var(--yf-silver-dark);
           border-radius: 6px;
           outline: none;
           font-size: 14px;
        }

        .yf-input:focus, .yf-select:focus {
           border-color: var(--yf-red);
        }

        .flex-2 { flex: 2; }
        .border-top { border-top: 1px solid var(--yf-silver); }
        .yf-btn-success {
           background: #10B981;
           color: white;
           padding: 10px 20px;
           border-radius: var(--radius);
           font-weight: 600;
        }
      `}</style>
    </div>
  );
}
