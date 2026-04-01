"use client";

import React, { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular login por enquanto
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <main className="login-page">
      <div className="login-visual">
        <div className="visual-overlay"></div>
        <div className="visual-content">
          <h1 className="yf-logo">YF</h1>
          <p className="visual-text">
            Compromisso com a Excelência e Seriedade em cada Processo.
          </p>
        </div>
      </div>
      
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Acesse sua conta</h2>
            <p>Gerencie processos, vistorias e mais.</p>
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span>Lembrar-me</span>
            </label>
            <a href="#" className="forgot-password">Esqueci minha senha</a>
          </div>

          <button type="submit" className="yf-btn-primary login-btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="form-footer">
            <p>&copy; 2026 YF Sistema de Controle Empresarial</p>
          </div>
        </form>
      </div>
    </main>
  );
}
