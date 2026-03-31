"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Início", icon: "🏠", path: "/dashboard" },
    { name: "Processos", icon: "📋", path: "/processos" },
    { name: "Salvados", icon: "📦", path: "/salvados" },
    { name: "Financeiro", icon: "💰", path: "/financeiro" },
    { name: "Relatórios", icon: "📊", path: "/relatorios" },
    { name: "Alertas", icon: "🔔", path: "/alertas" },
    { name: "Cadastros", icon: "➕", path: "/cadastros" },
    { name: "Não Conformidades", icon: "⚠️", path: "/nao-conformidades" },
    { name: "Configurações", icon: "⚙️", path: "/configuracoes" },
  ];

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="px-4 mb-8">
          <h1 className="yf-logo">YF</h1>
          <p className="text-xs text-muted">Controle Empresarial</p>
        </div>

        <nav className="flex-column gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-link ${pathname === item.path ? "active" : ""}`}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link text-muted">
            <span className="icon">🚪</span>
            <span className="label">Sair</span>
          </button>
        </div>
      </aside>

      {/* Header */}
      <header className="header">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>

        <div className="flex items-center gap-2">
          <button className="icon-btn">🔔</button>
          <button className="icon-btn">💬</button>
          <div className="user-profile flex items-center gap-1">
            <div className="avatar">JD</div>
            <div className="flex-column">
              <span className="user-name">João D.</span>
              <span className="user-role">Super Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="content">
        {children}
      </main>

      <style jsx>{`
        .px-4 { padding-left: 24px; padding-right: 24px; }
        .mb-8 { margin-bottom: 32px; }
        .text-xs { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; }
        .text-muted { color: var(--muted); }
        .text-lg { font-size: 18px; }
        .font-semibold { font-weight: 600; }
        
        .sidebar-link {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          gap: 12px;
          color: var(--foreground);
          font-weight: 500;
          transition: all 0.2s;
          border-left: 4px solid transparent;
        }

        .sidebar-link:hover {
          background: var(--yf-silver);
          color: var(--yf-red);
        }

        .sidebar-link.active {
          background: rgba(188, 0, 45, 0.05);
          color: var(--yf-red);
          border-left-color: var(--yf-red);
        }

        .sidebar-footer {
          margin-top: auto;
          border-top: 1px solid var(--border);
          padding-top: 12px;
        }

        .icon-btn {
          font-size: 20px;
          padding: 8px;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .icon-btn:hover {
          background: var(--yf-silver);
        }

        .avatar {
          width: 32px;
          height: 32px;
          background: var(--yf-red);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        .user-profile {
          margin-left: 16px;
          padding: 4px 12px;
          border-radius: 20px;
          background: var(--yf-silver-light);
          cursor: pointer;
        }

        .user-name { font-size: 14px; font-weight: 600; }
        .user-role { font-size: 11px; color: var(--muted); }
      `}</style>
    </div>
  );
}
