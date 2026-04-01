"use client";

import React, { useState } from "react";
import "./dashboard.css";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Central");

  const tabs = [
    "Documentação", "Central", "Análise", "Diretoria", "Financeiro", 
    "Gerência", "Informática", "Ouvidoria", "RH", "Salvados", 
    "Vistoria", "Avisos", "Treinamento"
  ];

  const processes = [
    { id: "202412.215.32", opening: "11/12/2024 17:29", distribution: "29/04/2025 15:38", insured: "1000 CARGAS TRANSPORTES", insurer: "HDI SEGUROS S/A", status: "Atuação necessária", complexity: "Alta", type: "Vistoria" },
    { id: "202412.216.45", opening: "15/12/2024 09:15", distribution: "30/04/2025 10:20", insured: "LOGISTICA BRASIL S/A", insurer: "PORTO SEGURO", status: "Em andamento", complexity: "Média", type: "Atendimento" },
  ];

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <nav className="tabs">
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </nav>
      </header>

      <div className="dashboard-body">
        <section className="dashboard-section">
          <div className="section-header">
            <h3>{activeTab}</h3>
            <div className="filters flex gap-1">
              <input type="text" placeholder="Buscar processo..." className="yf-input-search" />
              <button className="yf-btn-primary">Filtrar</button>
            </div>
          </div>

          <div className="table-container">
            <table className="yf-table">
              <thead>
                <tr>
                  <th>PROCESSO</th>
                  <th>ABERTURA</th>
                  <th>DISTRIBUIÇÃO</th>
                  <th>SEGURADO</th>
                  <th>SEGURADORA</th>
                  <th>REPASSE</th>
                  <th>COMPLEXIDADE</th>
                  <th>TIPO</th>
                </tr>
              </thead>
              <tbody>
                {processes.map(p => (
                  <tr key={p.id}>
                    <td className="font-bold text-red">{p.id}</td>
                    <td>{p.opening}</td>
                    <td>{p.distribution}</td>
                    <td>{p.insured}</td>
                    <td>{p.insurer}</td>
                    <td className="status-badge">{p.status}</td>
                    <td>{p.complexity}</td>
                    <td>{p.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
