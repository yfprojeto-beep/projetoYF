"use client";

import React, { useState } from "react";
import Link from "next/link";
// import "react-quill/dist/quill.snow.css";

// =============================================
// MOCK DATA
// =============================================
const MOCK_PROPOSTAS = [
  { id: "P001", bidder: "ComercioResto Ltda.", value: "R$ 8.450,00", date: "30/03/2026", status: "PENDENTE" },
  { id: "P002", bidder: "Reciclagem Norte S.A.", value: "R$ 6.200,00", date: "29/03/2026", status: "RECUSADA" },
  { id: "P003", bidder: "Distribuidora YM", value: "R$ 9.100,00", date: "31/03/2026", status: "PENDENTE" },
];

const MOCK_HISTORICO = [
  { id: 1, date: "31/03/2026 14:22", user: "ALICE", desc: "Salvado recebido no Pátio Central e cadastrado no sistema." },
  { id: 2, date: "30/03/2026 09:10", user: "JOÃO D.", desc: "Vistoria técnica das avarias realizada. Laudo fotográfico anexado." },
  { id: 3, date: "28/03/2026 17:45", user: "MARCOS", desc: "Mercadoria transferida do local do sinistro para armazém temporário." },
];

const MOCK_ANEXOS = [
  { id: "F001", name: "Foto_Avaria_01.jpg", type: "FOTO", date: "31/03/2026", size: "2.4 MB" },
  { id: "F002", name: "Laudo_Vistoria.pdf", type: "DOCUMENTO", date: "30/03/2026", size: "450 KB" },
  { id: "F003", name: "Foto_Avaria_02.jpg", type: "FOTO", date: "31/03/2026", size: "3.1 MB" },
];

const MOCK_PAGAMENTO = {
  comprador: "ComercioResto Ltda.",
  valorProposta: "R$ 9.100,00",
  valorLiquidado: "",
  dataAcordo: "31/03/2026",
  formaPagamento: "PIX",
  dataPrevisao: "",
  status: "AGUARDANDO_PAGAMENTO",
};

// =============================================
// PAGE COMPONENT
// =============================================
export default function SalvadoDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = React.use(props.params);
  const [activeTab, setActiveTab] = useState(1);
  const [avariaContent, setAvariaContent] = useState("<p>Avarias por impacto na parte frontal do veículo de carga. Aproximadamente 35% da mercadoria inutilizada. Restante em condições de comercialização.</p>");
  const [propostas, setPropostas] = useState(MOCK_PROPOSTAS);
  const [historico] = useState(MOCK_HISTORICO);
  const [novaObs, setNovaObs] = useState("");
  const [novaProposta, setNovaProposta] = useState({ bidder: "", value: "" });
  const [status, setStatus] = useState("EM_NEGOCIAÇÃO");
  const [pagamento, setPagamento] = useState(MOCK_PAGAMENTO);
  const [finalizado, setFinalizado] = useState(false);

  const tabs = [
    { num: 1, label: "Dados Principais", icon: "📋" },
    { num: 2, label: "Anexos", icon: "📎" },
    { num: 3, label: "Histórico", icon: "📜" },
    { num: 4, label: "Propostas", icon: "💰" },
    { num: 5, label: "Pagamento", icon: "🏦" },
    { num: 6, label: "Finalização", icon: "✅" },
  ];

  const statusColor = (s: string) => {
    if (s === "APROVADA") return "badge-success";
    if (s === "RECUSADA") return "badge-danger";
    return "badge-pending";
  };

  const handleApprove = (id: string) => {
    setPropostas(prev => prev.map(p =>
      p.id === id ? { ...p, status: "APROVADA" } : p.status === "APROVADA" ? { ...p, status: "RECUSADA" } : p
    ));
  };

  const handleAddProposta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaProposta.bidder || !novaProposta.value) return;
    setPropostas(prev => [
      { id: `P00${prev.length + 1}`, bidder: novaProposta.bidder, value: `R$ ${novaProposta.value}`, date: new Date().toLocaleDateString("pt-BR"), status: "PENDENTE" },
      ...prev,
    ]);
    setNovaProposta({ bidder: "", value: "" });
  };

  return (
    <div className="salvado-detail-page">
      {/* HEADER */}
      <div className="detail-header flex justify-between items-center mb-8">
        <div className="breadcrumb-nav">
          <nav className="text-muted mb-1 text-xs">
            <Link href="/dashboard">INÍCIO</Link> / <Link href="/salvados">SALVADOS</Link> / Detalhe Salvado
          </nav>
          <h1>Salvado <span className="text-red">#{params.id}</span></h1>
          <div className="flex gap-2 mt-1 items-center">
            <p className="text-xs font-bold uppercase">PROCESSO: <span className="text-red">202412.215.32</span></p>
            <span className="dot">·</span>
            <p className="text-xs text-muted">SEGURADO: LEAL TRANSPORTES</p>
            <span className="dot">·</span>
            <span className={`status-main-badge ${finalizado ? "badge-done" : "badge-negociation"}`}>
              {finalizado ? "FINALIZADO" : status.replace("_", " ")}
            </span>
          </div>
        </div>
        <Link href="/salvados" className="yf-btn-secondary">VOLTAR</Link>
      </div>

      {/* TABS CONTAINER */}
      <div className="salvado-tabs-container bg-white rounded-lg shadow-sm overflow-hidden">
        <nav className="tabs-nav border-bottom flex bg-silver-light overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.num}
              className={`tab-btn ${activeTab === tab.num ? "active" : ""}`}
              onClick={() => setActiveTab(tab.num)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span>{tab.num}. {tab.label.toUpperCase()}</span>
            </button>
          ))}
        </nav>

        <div className="tab-content p-6">
          {/* ===================== ABA 1: DADOS PRINCIPAIS ===================== */}
          {activeTab === 1 && (
            <div className="form-sections">
              <div className="section mb-8">
                <h3 className="section-title mb-4">INFORMAÇÕES DA MERCADORIA</h3>
                <div className="grid-3 gap-2">
                  <div className="form-field">
                    <label>Mercadoria *</label>
                    <input type="text" defaultValue="Pera, Energéticos, etc." className="yf-input w-full" />
                  </div>
                  <div className="form-field">
                    <label>Tipo Quantidade *</label>
                    <input type="text" defaultValue="UNID" className="yf-input w-full" />
                  </div>
                  <div className="form-field">
                    <label>Quantidade *</label>
                    <input type="number" defaultValue="150" className="yf-input w-full" />
                  </div>
                </div>
              </div>

              <div className="section mb-8">
                <h3 className="section-title mb-4">DESCRIÇÃO DAS AVARIAS</h3>
                <textarea
                    className="yf-input w-full"
                    value={avariaContent.replace(/<[^>]+>/g, '')}
                    onChange={(e) => setAvariaContent(e.target.value)}
                    style={{ height: "150px", resize: "vertical" }}
                />
              </div>

              <div className="section mb-4">
                <h3 className="section-title mb-4">REMESSA / LOCALIZAÇÃO</h3>
                <div className="grid-3 gap-2">
                  <div className="form-field">
                    <label>Remetente</label>
                    <input type="text" placeholder="Nome do remetente..." className="yf-input w-full" />
                  </div>
                  <div className="form-field">
                    <label>Destinatário</label>
                    <input type="text" placeholder="Nome do destinatário..." className="yf-input w-full" />
                  </div>
                  <div className="form-field">
                    <label>Local de Armazenagem *</label>
                    <select className="yf-select w-full">
                      <option>Pátio Central</option>
                      <option>Galpão A-1</option>
                      <option>Galpão A-2</option>
                      <option>Armazém Externo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== ABA 2: ANEXOS ===================== */}
          {activeTab === 2 && (
            <div className="anexos-section">
              <div className="dropzone mb-6" onDragOver={(e) => e.preventDefault()}>
                <div className="dropzone-inner">
                  <div className="drop-icon">📤</div>
                  <p className="font-bold mb-1">Arraste arquivos ou clique para selecionar</p>
                  <p className="text-xs text-muted">Fotos (JPG, PNG), PDFs e documentos. Máx. 20MB por arquivo.</p>
                  <label className="yf-btn-secondary mt-4" style={{ cursor: "pointer" }}>
                    SELECIONAR ARQUIVOS
                    <input type="file" multiple style={{ display: "none" }} />
                  </label>
                </div>
              </div>

              <h3 className="section-title mb-4">ARQUIVOS ANEXADOS</h3>
              <div className="anexos-grid">
                {MOCK_ANEXOS.map(a => (
                  <div key={a.id} className="anexo-card">
                    <div className="anexo-thumb">
                      {a.type === "FOTO" ? "🖼️" : "📄"}
                    </div>
                    <div className="anexo-info">
                      <p className="font-bold text-xs truncate">{a.name}</p>
                      <p className="text-xs text-muted">{a.size} · {a.date}</p>
                    </div>
                    <div className="anexo-actions">
                      <button className="icon-mini" title="Visualizar">👁️</button>
                      <button className="icon-mini" title="Deletar">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== ABA 3: HISTÓRICO ===================== */}
          {activeTab === 3 && (
            <div className="historico-section">
              <div className="note-editor bg-silver-light p-4 rounded-lg mb-6">
                <h3 className="text-sm font-bold mb-3">ADICIONAR MOVIMENTAÇÃO AO LOG</h3>
                <textarea
                  className="yf-input w-full mb-3"
                  style={{ minHeight: "80px", resize: "vertical" }}
                  value={novaObs}
                  onChange={(e) => setNovaObs(e.target.value)}
                  placeholder="Descreva a movimentação ou observação..."
                />
                <div className="flex justify-end">
                  <button className="yf-btn-primary" onClick={() => setNovaObs("")}>REGISTRAR MOVIMENTAÇÃO</button>
                </div>
              </div>

              <div className="timeline">
                {historico.map((h, i) => (
                  <div key={h.id} className="timeline-item">
                    <div className="timeline-dot" />
                    {i < historico.length - 1 && <div className="timeline-line" />}
                    <div className="timeline-card">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-xs">{h.user}</span>
                        <span className="text-xs text-muted">{h.date}</span>
                      </div>
                      <p className="text-sm">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== ABA 4: PROPOSTAS ===================== */}
          {activeTab === 4 && (
            <div className="propostas-section">
              <div className="propostas-layout">
                {/* Form Nova Proposta */}
                <div className="nova-proposta-panel bg-silver-light p-6 rounded-lg">
                  <h3 className="section-title mb-4">REGISTRAR NOVA PROPOSTA</h3>
                  <form onSubmit={handleAddProposta}>
                    <div className="form-field mb-4">
                      <label>Nome do Comprador / Empresa *</label>
                      <input
                        type="text"
                        className="yf-input w-full"
                        placeholder="Razão Social..."
                        value={novaProposta.bidder}
                        onChange={(e) => setNovaProposta(p => ({ ...p, bidder: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="form-field mb-6">
                      <label>Valor Ofertado (R$) *</label>
                      <input
                        type="text"
                        className="yf-input w-full"
                        placeholder="0,00"
                        value={novaProposta.value}
                        onChange={(e) => setNovaProposta(p => ({ ...p, value: e.target.value }))}
                        required
                      />
                    </div>
                    <button type="submit" className="yf-btn-primary w-full">REGISTRAR PROPOSTA</button>
                  </form>
                </div>

                {/* Lista de Propostas */}
                <div className="propostas-list">
                  <h3 className="section-title mb-4">PROPOSTAS RECEBIDAS ({propostas.length})</h3>
                  {propostas.map(p => (
                    <div key={p.id} className="proposta-card">
                      <div className="proposta-info">
                        <p className="font-bold">{p.bidder}</p>
                        <p className="text-xs text-muted">{p.date} · Nº {p.id}</p>
                      </div>
                      <div className="proposta-value">{p.value}</div>
                      <div className="proposta-actions">
                        <span className={`status-badge-sm ${statusColor(p.status)}`}>{p.status}</span>
                        {p.status === "PENDENTE" && (
                          <button className="yf-btn-primary btn-sm" onClick={() => handleApprove(p.id)}>
                            APROVAR LANCE
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================== ABA 5: PAGAMENTO ===================== */}
          {activeTab === 5 && (
            <div className="pagamento-section">
              <div className="pagamento-status-banner mb-6">
                <div className="banner-icon">🏦</div>
                <div>
                  <p className="font-bold">Status do Pagamento</p>
                  <p className="text-muted text-sm">Proposta aprovada. Lance vencedor de {pagamento.valorProposta}.</p>
                </div>
                <span className="badge-lg badge-pending">AGUARDANDO CONFIRMAÇÃO</span>
              </div>

              <div className="grid-2 gap-4">
                <div className="bg-silver-light p-6 rounded-lg">
                  <h3 className="section-title mb-4">DADOS DO ACERTO</h3>
                  <div className="form-field mb-4">
                    <label>Comprador / Empresa</label>
                    <input type="text" className="yf-input w-full" value={pagamento.comprador} onChange={(e) => setPagamento(p => ({ ...p, comprador: e.target.value }))} />
                  </div>
                  <div className="grid-2 gap-2 mb-4">
                    <div className="form-field">
                      <label>Valor do Lance (R$)</label>
                      <input type="text" className="yf-input w-full" value={pagamento.valorProposta} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Forma de Pagamento</label>
                      <select className="yf-select w-full" value={pagamento.formaPagamento} onChange={(e) => setPagamento(p => ({ ...p, formaPagamento: e.target.value }))}>
                        <option>PIX</option>
                        <option>TED</option>
                        <option>Boleto</option>
                        <option>Cheque</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid-2 gap-2 mb-4">
                    <div className="form-field">
                      <label>Data do Acordo</label>
                      <input type="date" className="yf-input w-full" defaultValue="2026-03-31" />
                    </div>
                    <div className="form-field">
                      <label>Previsão de Pagamento</label>
                      <input type="date" className="yf-input w-full" value={pagamento.dataPrevisao} onChange={(e) => setPagamento(p => ({ ...p, dataPrevisao: e.target.value }))} />
                    </div>
                  </div>
                  <div className="form-field mb-4">
                    <label>Valor Efetivamente Liquidado (R$)</label>
                    <input type="text" className="yf-input w-full" placeholder="0,00" value={pagamento.valorLiquidado} onChange={(e) => setPagamento(p => ({ ...p, valorLiquidado: e.target.value }))} />
                  </div>
                </div>

                <div className="bg-silver-light p-6 rounded-lg">
                  <h3 className="section-title mb-4">COMPROVANTES</h3>
                  <div className="dropzone-mini mb-4">
                    <p className="text-sm font-bold mb-2">📎 Anexar Comprovante</p>
                    <p className="text-xs text-muted mb-3">PIX, TED, recibo assinado, etc.</p>
                    <label className="yf-btn-secondary" style={{ cursor: "pointer" }}>
                      SELECIONAR ARQUIVO
                      <input type="file" style={{ display: "none" }} />
                    </label>
                  </div>
                  <div className="empty-docs">
                    <p className="text-sm text-muted text-center p-8">Nenhum comprovante anexado.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button className="yf-btn-primary">CONFIRMAR RECEBIMENTO DE PAGAMENTO</button>
              </div>
            </div>
          )}

          {/* ===================== ABA 6: FINALIZAÇÃO ===================== */}
          {activeTab === 6 && (
            <div className="finalizacao-section">
              {finalizado ? (
                <div className="finalizacao-done">
                  <div className="done-icon">✅</div>
                  <h2 className="font-bold text-2xl mb-2">Salvado Encerrado com Sucesso</h2>
                  <p className="text-muted mb-6">O ciclo de vida deste lote foi concluído. O registro está arquivado e disponível para consulta.</p>
                  <Link href="/salvados" className="yf-btn-secondary">VER TODOS OS SALVADOS</Link>
                </div>
              ) : (
                <div className="finalizacao-form">
                  <div className="finalizacao-warning mb-6">
                    <span className="warning-icon">⚠️</span>
                    <div>
                      <p className="font-bold">Atenção: Ação Irreversível</p>
                      <p className="text-sm text-muted">Ao finalizar, o salvado será marcado como encerrado e não poderá ser editado. Certifique-se de que o pagamento foi confirmado.</p>
                    </div>
                  </div>

                  <div className="checklist-finalizacao mb-6">
                    <h3 className="section-title mb-4">CHECKLIST DE ENCERRAMENTO</h3>
                    {[
                      "Avarias devidamente documentadas",
                      "Proposta de compra aprovada",
                      "Pagamento recebido e comprovado",
                      "Mercadoria retirada do estoque",
                      "Processo pai informado sobre encerramento",
                    ].map((item, i) => (
                      <label key={i} className="checklist-item">
                        <input type="checkbox" className="check-input" />
                        <span className="check-label">{item}</span>
                      </label>
                    ))}
                  </div>

                  <div className="form-field mb-6">
                    <label className="block text-sm font-bold mb-2">OBSERVAÇÕES FINAIS / MOTIVO DE ENCERRAMENTO</label>
                    <textarea className="yf-input w-full" style={{ minHeight: "100px" }} placeholder="Registre observações para o encerramento formal do lote..."></textarea>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button className="yf-btn-secondary" onClick={() => setActiveTab(1)}>REVISAR INFORMAÇÕES</button>
                    <button className="yf-btn-danger" onClick={() => setFinalizado(true)}>
                      ENCERRAR E ARQUIVAR SALVADO
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {activeTab !== 6 && (
          <div className="tab-footer p-6 border-top flex justify-between items-center">
            <button className="yf-btn-secondary text-xs" onClick={() => setActiveTab(a => Math.max(1, a - 1))} disabled={activeTab === 1}>
              ← ABA ANTERIOR
            </button>
            <span className="text-xs text-muted">{activeTab} / {tabs.length}</span>
            <button className="yf-btn-primary text-xs" onClick={() => setActiveTab(a => Math.min(6, a + 1))} disabled={activeTab === 6}>
              PRÓXIMA ABA →
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        /* ---- LAYOUT ---- */
        .bg-white { background: white; }
        .bg-silver-light { background: var(--yf-silver-light, #f7f7f7); }
        .p-4 { padding: 16px; }
        .p-6 { padding: 24px; }
        .p-8 { padding: 32px; }
        .p-12 { padding: 48px; }
        .rounded-lg { border-radius: 8px; }
        .shadow-sm { box-shadow: var(--shadow); }
        .border-bottom { border-bottom: 2px solid var(--yf-silver); }
        .border-top { border-top: 1px solid var(--yf-silver); }
        .flex-1 { flex: 1; }
        .mb-1 { margin-bottom: 4px; }
        .mb-2 { margin-bottom: 8px; }
        .mb-3 { margin-bottom: 12px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-6 { margin-bottom: 24px; }
        .mb-8 { margin-bottom: 32px; }
        .mt-4 { margin-top: 16px; }
        .w-full { width: 100%; }
        .gap-0 { gap: 0; }
        .gap-2 { gap: 8px; }
        .gap-4 { gap: 16px; }
        .text-center { text-align: center; }
        .text-2xl { font-size: 24px; }
        .text-sm { font-size: 14px; }
        .text-xs { font-size: 12px; }
        .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .dot { color: var(--muted); margin: 0 4px; }

        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; }

        /* ---- HEADER/STATUS ---- */
        .status-main-badge { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; letter-spacing: 1px; }
        .badge-negociation { background: rgba(245,158,11,0.1); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); }
        .badge-done { background: rgba(16,185,129,0.1); color: #10B981; border: 1px solid rgba(16,185,129,0.3); }

        /* ---- TABS ---- */
        .tab-btn {
          padding: 16px 20px;
          font-size: 10px;
          font-weight: 800;
          color: var(--muted);
          border-bottom: 3px solid transparent;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.5px;
        }
        .tab-btn.active {
          color: var(--yf-red);
          border-bottom-color: var(--yf-red);
          background: var(--yf-white);
        }
        .tab-icon { font-size: 14px; }

        /* ---- SECTION TITLE ---- */
        .section-title {
          font-size: 13px;
          font-weight: 800;
          color: var(--yf-black);
          border-left: 4px solid var(--yf-red);
          padding-left: 12px;
          letter-spacing: 0.5px;
        }

        /* ---- FORM FIELDS ---- */
        .form-field label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 6px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ---- ANEXOS ---- */
        .dropzone {
          border: 2px dashed var(--yf-silver);
          border-radius: 12px;
          transition: border-color 0.2s;
        }
        .dropzone:hover { border-color: var(--yf-red); }
        .dropzone-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          text-align: center;
        }
        .drop-icon { font-size: 48px; margin-bottom: 12px; }
        .anexos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 12px;
        }
        .anexo-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: var(--yf-silver-light, #f7f7f7);
          border-radius: 8px;
          border: 1px solid var(--yf-silver);
        }
        .anexo-thumb { font-size: 28px; }
        .anexo-info { flex: 1; min-width: 0; }
        .anexo-actions { display: flex; gap: 4px; }
        .icon-mini { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 4px; background: white; font-size: 13px; border: 1px solid var(--yf-silver); cursor: pointer; }
        .icon-mini:hover { background: var(--yf-red); color: white; }

        /* ---- HISTÓRICO TIMELINE ---- */
        .note-editor { border: 1px solid var(--yf-silver); }
        .timeline { position: relative; padding-left: 24px; }
        .timeline-item { position: relative; margin-bottom: 24px; }
        .timeline-dot {
          position: absolute;
          left: -24px; top: 8px;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--yf-red);
          border: 2px solid white;
          box-shadow: 0 0 0 2px var(--yf-red);
        }
        .timeline-line {
          position: absolute;
          left: -18px; top: 20px;
          width: 2px; height: calc(100% + 8px);
          background: var(--yf-silver);
        }
        .timeline-card {
          background: var(--yf-silver-light, #f7f7f7);
          border: 1px solid var(--yf-silver);
          border-radius: 8px;
          padding: 16px;
        }

        /* ---- PROPOSTAS ---- */
        .propostas-layout { display: grid; grid-template-columns: 320px 1fr; gap: 24px; }
        .proposta-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: var(--yf-silver-light, #f7f7f7);
          border: 1px solid var(--yf-silver);
          border-radius: 8px;
          margin-bottom: 12px;
          transition: box-shadow 0.2s;
        }
        .proposta-card:hover { box-shadow: var(--shadow); }
        .proposta-info { flex: 1; }
        .proposta-value { font-size: 20px; font-weight: 800; color: var(--yf-black); white-space: nowrap; }
        .proposta-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
        .status-badge-sm { font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.5px; }
        .badge-success { background: rgba(16,185,129,0.1); color: #10B981; }
        .badge-danger { background: rgba(220,38,38,0.1); color: #DC2626; }
        .badge-pending { background: rgba(245,158,11,0.1); color: #F59E0B; }
        .btn-sm { padding: 6px 12px; font-size: 10px; }

        /* ---- PAGAMENTO ---- */
        .pagamento-status-banner {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: white;
          border: 1px solid var(--yf-silver);
          border-left: 4px solid var(--yf-red);
          border-radius: 8px;
        }
        .banner-icon { font-size: 32px; }
        .badge-lg { font-size: 11px; font-weight: 800; padding: 6px 16px; border-radius: 20px; margin-left: auto; letter-spacing: 0.5px; }
        .dropzone-mini {
          border: 2px dashed var(--yf-silver);
          border-radius: 8px;
          padding: 24px;
          text-align: center;
        }

        /* ---- FINALIZAÇÃO ---- */
        .finalizacao-done {
          text-align: center;
          padding: 80px 40px;
        }
        .done-icon { font-size: 80px; margin-bottom: 24px; }
        .finalizacao-warning {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: rgba(245,158,11,0.05);
          border: 1px solid rgba(245,158,11,0.3);
          border-radius: 8px;
        }
        .warning-icon { font-size: 28px; }
        .checklist-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          margin-bottom: 8px;
          background: var(--yf-silver-light, #f7f7f7);
          border-radius: 6px;
          cursor: pointer;
        }
        .check-input { width: 18px; height: 18px; accent-color: var(--yf-red); cursor: pointer; }
        .check-label { font-size: 14px; font-weight: 500; }
        .yf-btn-danger {
          background: var(--yf-red);
          color: white;
          padding: 10px 20px;
          border-radius: var(--radius);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
        }
        .yf-btn-danger:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
