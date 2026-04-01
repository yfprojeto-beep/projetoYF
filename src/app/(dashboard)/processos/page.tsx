"use client";

import React, { useState, useEffect } from "react";
import "./processos.css";
import Link from "next/link";

interface Process {
  id: string;
  processNumber: string;
  opening: string;
  distribution?: string;
  insured: string;
  insurer: string;
  status: { name: string } | string;
  type?: string;
}

interface Event {
  id: string;
  description: string;
  date: string;
}

export default function ProcessosPage() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProcesses() {
      try {
        const res = await fetch(`/api/processos?search=${search}`);
        const data = await res.json();
        setProcesses(data);
      } catch (error) {
        console.error("Failed to fetch processes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProcesses();
  }, [search]);

  return (
    <div className="processos-page">
      <div className="processos-header">
        <div className="flex justify-between items-center w-full">
          <h1>Processos</h1>
          <button className="yf-btn-primary">+ Novo Processo</button>
        </div>
        
        <div className="filters-bar mt-2 flex gap-1">
          <input 
            type="text" 
            placeholder="Buscar por número, segurado ou seguradora..." 
            className="yf-input-search flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="yf-select">
            <option>Todos os Status</option>
            <option>Aberto</option>
            <option>Distribuição</option>
            <option>Condução</option>
            <option>Finalizado</option>
          </select>
          <select className="yf-select">
            <option>Qualquer Complexidade</option>
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>
        </div>
      </div>

      <div className="processos-body mt-2">
        <div className="table-wrapper">
          <table className="yf-table">
            <thead>
              <tr>
                <th>PROCESSO</th>
                <th>ABERTURA</th>
                <th>DISTRIBUIÇÃO</th>
                <th>SEGURADO</th>
                <th>SEGURADORA</th>
                <th>STATUS</th>
                <th>TIPO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" className="text-center p-4">Carregando processos...</td></tr>
              ) : (
                processes.map((p) => (
                  <tr key={p.id}>
                    <td className="font-bold text-red">
                      <Link href={`/processos/${p.id}`}>{p.processNumber}</Link>
                    </td>
                    <td>{p.opening}</td>
                    <td>{p.distribution || "-"}</td>
                    <td>{p.insured}</td>
                    <td>{p.insurer}</td>
                    <td>
                      <span className="status-badge">{p.status?.name || p.status}</span>
                    </td>
                    <td>{p.type || "Vistoria"}</td>
                    <td>
                      <div className="flex gap-1">
                        <Link href={`/processos/${p.id}`} className="icon-link">👁️</Link>
                        <button className="icon-link">✏️</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
