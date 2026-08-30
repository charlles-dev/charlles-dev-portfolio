import React, { useMemo, useState } from 'react';
import type { AppBaseProps } from '@/interfaces/types';
import { useTranslation } from '@/context/LanguageContext';
import './ServerConsole.css';

type Tab = 'status' | 'events' | 'services' | 'terminal';
const COMMANDS: Record<string, string> = {
  help: 'help · whoami · uptime · projects · coffee · clear',
  whoami: 'admin-ish. Authority expires when this window closes.',
  uptime: '99.98%. The missing 0.02% was a CSS hotfix.',
  projects: '4 public projects indexed. Private repositories remain private.',
  coffee: 'HTTP 418: coffee is still compiling.',
};

export const ServerConsole: React.FC<AppBaseProps> = () => {
  const { language } = useTranslation();
  const pt = language === 'pt-BR';
  const es = language === 'es';
  const [tab, setTab] = useState<Tab>('status');
  const [services, setServices] = useState({ portfolio: true, arcade: true, coffee: false, panic: false });
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>(['Charlles.dev Server Console [fictional local build]', 'Type help. Nothing here touches a real server.']);
  const tabs = useMemo(() => ({ status: pt ? 'Status' : es ? 'Estado' : 'Status', events: pt ? 'Eventos' : es ? 'Eventos' : 'Events', services: pt ? 'Serviços' : es ? 'Servicios' : 'Services', terminal: 'Terminal' }), [pt, es]);
  const run = (event: React.FormEvent) => {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    if (!value) return;
    if (value === 'clear') setHistory([]);
    else setHistory(lines => [...lines, `C:\\SERVER> ${value}`, COMMANDS[value] || 'Command not found. This fake server has standards.']);
    setCommand('');
  };
  return <div className="server-console">
    <header className="server-console__masthead"><div><p>CHARLLES.DEV / LOCAL SERVER</p><h2>{pt ? 'Então você é admin mesmo.' : es ? 'Así que sí eres admin.' : 'So you really are admin.'}</h2></div><span className="server-console__status">● ONLINE-ISH</span></header>
    <nav className="server-console__tabs" aria-label="Server console sections">{(Object.keys(tabs) as Tab[]).map(id => <button type="button" key={id} aria-pressed={tab === id} onClick={() => setTab(id)}>{tabs[id]}</button>)}</nav>
    {tab === 'status' && <section className="server-console__panel"><div className="server-console__stats"><dl><dt>Uptime</dt><dd>32d 08h</dd></dl><dl><dt>Open fires</dt><dd>0*</dd></dl><dl><dt>Coffee</dt><dd>404 ml</dd></dl></div><p className="server-console__note">* Legal asked us to call them “unplanned learning opportunities”. We declined.</p></section>}
    {tab === 'events' && <section className="server-console__panel"><ol className="server-console__events"><li><time>09:42</time><span>Portfolio passed its own vibe check.</span></li><li><time>09:13</time><span>Arcade process requested “five more minutes”.</span></li><li><time>08:57</time><span>Production survived another deploy.</span></li><li><time>03:14</time><span>Unknown cat walked across keyboard. No incident.</span></li></ol></section>}
    {tab === 'services' && <section className="server-console__panel"><ul className="server-console__services" role="list">{Object.entries(services).map(([id, enabled]) => <li key={id}><span><strong>{id}.service</strong><small>{enabled ? 'Running locally' : 'Stopped for dramatic effect'}</small></span><button type="button" aria-pressed={enabled} onClick={() => setServices(current => ({ ...current, [id]: !enabled }))}>{enabled ? 'STOP' : 'START'}</button></li>)}</ul></section>}
    {tab === 'terminal' && <section className="server-console__terminal"><div role="log" aria-live="polite">{history.map((line, i) => <p key={`${line}-${i}`}>{line}</p>)}</div><form onSubmit={run}><label htmlFor="server-command">C:\SERVER&gt;</label><input id="server-command" name="server-command" value={command} onChange={event => setCommand(event.target.value)} autoComplete="off"/><button type="submit">RUN</button></form></section>}
  </div>;
};

export default ServerConsole;
