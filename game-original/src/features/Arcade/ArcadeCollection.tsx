import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import './ArcadeCollection.css';

type Language = 'pt-BR' | 'en' | 'es';
type GameId = 'cache' | 'snake' | 'pong' | 'minefield' | 'wordbomb';
type Copy = { title: string; description: string; action: string };

const GAME_COPY: Record<GameId, Record<Language, Copy>> = {
  cache: {
    'pt-BR': { title: 'Cache Match', description: 'Cinco fases, mais pares e menos espaço para confiar na memória.', action: 'Começar a fase 1' },
    en: { title: 'Cache Match', description: 'Five stages, more pairs and less room to trust your memory.', action: 'Start stage 1' },
    es: { title: 'Cache Match', description: 'Cinco fases, más parejas y menos espacio para confiar en tu memoria.', action: 'Iniciar fase 1' },
  },
  snake: {
    'pt-BR': { title: 'Byte Snake', description: 'Colete bytes. Evite a parede e a própria arquitetura.', action: 'Compilar cobra' },
    en: { title: 'Byte Snake', description: 'Collect bytes. Avoid the wall and your own architecture.', action: 'Compile snake' },
    es: { title: 'Byte Snake', description: 'Recoge bytes. Evita la pared y tu propia arquitectura.', action: 'Compilar serpiente' },
  },
  pong: {
    'pt-BR': { title: 'Packet Pong', description: 'Primeiro a cinco vence. O servidor reage rápido, mas não lê o futuro.', action: 'Abrir partida' },
    en: { title: 'Packet Pong', description: 'First to five wins. The server reacts fast, but cannot read the future.', action: 'Open match' },
    es: { title: 'Packet Pong', description: 'El primero en llegar a cinco gana. El servidor reacciona rápido, pero no ve el futuro.', action: 'Abrir partida' },
  },
  minefield: {
    'pt-BR': { title: 'Campo Minado', description: 'Abra os espaços seguros e marque as minas antes do clique errado.', action: 'Varrer o campo' },
    en: { title: 'Minesweeper', description: 'Open every safe cell and mark the mines before the wrong click.', action: 'Sweep the field' },
    es: { title: 'Buscaminas', description: 'Abre todas las casillas seguras y marca las minas antes del clic equivocado.', action: 'Barrer el campo' },
  },
  wordbomb: {
    'pt-BR': { title: 'Word Bomb', description: 'Encaixe o fragmento em uma palavra antes que o tempo acabe.', action: 'Acender o pavio' },
    en: { title: 'Word Bomb', description: 'Fit the fragment into a word before time runs out.', action: 'Light the fuse' },
    es: { title: 'Word Bomb', description: 'Encaja el fragmento en una palabra antes de que termine el tiempo.', action: 'Encender la mecha' },
  },
};

const ICONS: Record<GameId, string> = { cache: '▦', snake: '≈', pong: '↔', minefield: '◇', wordbomb: '●' };
const getLanguage = (language: string): Language => (['pt-BR', 'en', 'es'].includes(language) ? language : 'en') as Language;

const ARCADE_UI = {
  'pt-BR': {
    back: 'Arcade', score: 'Pontos', best: 'Recorde', stage: 'Fase', attempts: 'tentativas', card: 'Carta',
    cacheCleared: 'CACHE CONCLUÍDO', stageCleared: 'FASE CONCLUÍDA', playAgain: 'JOGAR DE NOVO', nextStage: 'PRÓXIMA FASE',
    touchControls: 'Controles de toque', you: 'VOCÊ', server: 'SERVIDOR', youWin: 'VOCÊ VENCEU', serverWins: 'O SERVIDOR VENCEU', firstToFive: 'PRIMEIRO A CINCO', startMatch: 'COMEÇAR PARTIDA', rematch: 'REVANCHE',
    flags: 'BANDEIRAS', cell: 'Casa', flagged: 'marcada', fieldCleared: 'CAMPO LIMPO', mineFound: 'MINA ENCONTRADA', newField: 'NOVO CAMPO', mineHint: 'Clique para abrir · botão direito ou toque duplo para marcar',
    lives: 'VIDAS', wordReady: 'O DICIONÁRIO ESTÁ PRONTO', wordInstruction: 'DIGITE UMA PALAVRA COM O FRAGMENTO', wordInvalid: 'PALAVRA NÃO RECONHECIDA', wordUsed: 'PALAVRA JÁ USADA', wordTimeout: 'TEMPO ESGOTADO', wordCorrect: 'BOA PALAVRA', wordWon: 'VOCÊ DESARMOU A BOMBA', wordLost: 'A BOMBA ESTOUROU', wordLabel: 'Palavra com', wordSubmit: 'ENVIAR', wordStart: 'ACENDER O PAVIO', wordRetry: 'TENTAR DE NOVO', used: 'USADAS',
  },
  en: {
    back: 'Arcade', score: 'Score', best: 'Best', stage: 'Stage', attempts: 'attempts', card: 'Card',
    cacheCleared: 'CACHE CLEARED', stageCleared: 'STAGE CLEARED', playAgain: 'PLAY AGAIN', nextStage: 'NEXT STAGE',
    touchControls: 'Touch controls', you: 'YOU', server: 'SERVER', youWin: 'YOU WIN', serverWins: 'SERVER WINS', firstToFive: 'FIRST TO FIVE', startMatch: 'START MATCH', rematch: 'REMATCH',
    flags: 'FLAGS', cell: 'Cell', flagged: 'flagged', fieldCleared: 'FIELD CLEARED', mineFound: 'MINE FOUND', newField: 'NEW FIELD', mineHint: 'Click to reveal · right click or double tap to flag',
    lives: 'LIVES', wordReady: 'THE DICTIONARY IS READY', wordInstruction: 'TYPE A WORD CONTAINING THE FRAGMENT', wordInvalid: 'WORD NOT RECOGNIZED', wordUsed: 'WORD ALREADY USED', wordTimeout: 'TIME OUT', wordCorrect: 'GOOD WORD', wordWon: 'YOU DEFUSED THE BOMB', wordLost: 'THE BOMB WENT OFF', wordLabel: 'Word containing', wordSubmit: 'SEND', wordStart: 'LIGHT THE FUSE', wordRetry: 'TRY AGAIN', used: 'USED',
  },
  es: {
    back: 'Arcade', score: 'Puntos', best: 'Récord', stage: 'Fase', attempts: 'intentos', card: 'Carta',
    cacheCleared: 'CACHÉ COMPLETADA', stageCleared: 'FASE COMPLETADA', playAgain: 'JUGAR DE NUEVO', nextStage: 'SIGUIENTE FASE',
    touchControls: 'Controles táctiles', you: 'TÚ', server: 'SERVIDOR', youWin: 'HAS GANADO', serverWins: 'EL SERVIDOR GANA', firstToFive: 'PRIMERO A CINCO', startMatch: 'EMPEZAR PARTIDA', rematch: 'REVANCHA',
    flags: 'BANDERAS', cell: 'Casilla', flagged: 'marcada', fieldCleared: 'CAMPO LIMPIO', mineFound: 'MINA ENCONTRADA', newField: 'NUEVO CAMPO', mineHint: 'Clic para abrir · botón derecho o doble toque para marcar',
    lives: 'VIDAS', wordReady: 'EL DICCIONARIO ESTÁ LISTO', wordInstruction: 'ESCRIBE UNA PALABRA CON EL FRAGMENTO', wordInvalid: 'PALABRA NO RECONOCIDA', wordUsed: 'PALABRA YA UTILIZADA', wordTimeout: 'TIEMPO AGOTADO', wordCorrect: 'BUENA PALABRA', wordWon: 'HAS DESACTIVADO LA BOMBA', wordLost: 'LA BOMBA EXPLOTÓ', wordLabel: 'Palabra con', wordSubmit: 'ENVIAR', wordStart: 'ENCENDER LA MECHA', wordRetry: 'INTENTAR DE NUEVO', used: 'USADAS',
  },
} as const;

const WORD_BANK: Record<Language, { fragments: string[]; words: string[] }> = {
  'pt-BR': {
    fragments: ['ca', 'ra', 'te', 'do', 'ma', 'po', 'co', 'vi'],
    words: ['casa', 'cachorro', 'caminho', 'carta', 'rápido', 'praia', 'trabalho', 'braço', 'telefone', 'tempo', 'internet', 'sorvete', 'domingo', 'doce', 'dormir', 'mundo', 'mapa', 'madeira', 'semana', 'máquina', 'porta', 'ponto', 'pouco', 'esporte', 'comida', 'coração', 'escola', 'coisa', 'vida', 'viagem', 'ouvido', 'avião'],
  },
  en: {
    fragments: ['ca', 'ra', 'te', 'do', 'ma', 'po', 'co', 'ri'],
    words: ['camera', 'castle', 'candy', 'calendar', 'rain', 'train', 'orange', 'branch', 'water', 'later', 'computer', 'internet', 'door', 'doctor', 'shadow', 'window', 'magic', 'market', 'human', 'woman', 'pocket', 'power', 'support', 'sport', 'color', 'coffee', 'code', 'corner', 'river', 'bright', 'spring', 'friend'],
  },
  es: {
    fragments: ['ca', 'ra', 'te', 'do', 'ma', 'po', 'co', 'vi'],
    words: ['casa', 'calle', 'camino', 'carta', 'rápido', 'naranja', 'trabajo', 'brazo', 'teléfono', 'internet', 'puente', 'suerte', 'domingo', 'doctor', 'mundo', 'dormir', 'mano', 'mapa', 'semana', 'máquina', 'poder', 'poco', 'deporte', 'apoyo', 'comida', 'corazón', 'color', 'cocina', 'vida', 'viaje', 'avión', 'novio'],
  },
};

const normalizeWord = (word: string) => word.trim().toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const useHighScore = (id: GameId) => {
  const key = `ENTRE_CAMADAS_ARCADE_${id}`;
  const [high, setHigh] = useState(() => Number(localStorage.getItem(key) || 0));
  const submit = useCallback((score: number) => setHigh(current => {
    const next = Math.max(current, Math.round(score)); localStorage.setItem(key, String(next)); return next;
  }), [key]);
  return [high, submit] as const;
};

const GameShell: React.FC<{ id: GameId; score: number; children: React.ReactNode; onExit: () => void; meta?: React.ReactNode }> = ({ id, score, children, onExit, meta }) => {
  const { language } = useTranslation(); const lang = getLanguage(language); const ui = ARCADE_UI[lang]; const [high, submit] = useHighScore(id);
  useEffect(() => submit(score), [score, submit]);
  return <section className="arcade-play" aria-labelledby="arcade-game-title"><header className="arcade-play__header"><button type="button" className="arcade-back" onClick={onExit}>← {ui.back}</button><div><h1 id="arcade-game-title">{GAME_COPY[id][lang].title}</h1><p>{GAME_COPY[id][lang].description}</p>{meta}</div><dl className="arcade-score"><div><dt>{ui.score}</dt><dd>{score}</dd></div><div><dt>{ui.best}</dt><dd>{high}</dd></div></dl></header><div className="arcade-stage">{children}</div></section>;
};

const CACHE_LEVELS = [
  ['API', 'CSS', 'API', 'CSS'],
  ['git', '404', 'SQL', '404', 'git', 'SQL'],
  ['JS', 'DOM', 'CLI', 'npm', 'CLI', 'JS', 'npm', 'DOM'],
  ['React', 'Node', 'HTTP', 'JSON', 'Docker', 'JSON', 'React', 'Docker', 'HTTP', 'Node'],
  ['TS', 'Git', 'CSS', 'SQL', 'API', 'HTML', 'API', 'Git', 'HTML', 'TS', 'SQL', 'CSS'],
];

const CacheGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { language } = useTranslation(); const lang = getLanguage(language); const ui = ARCADE_UI[lang]; const [level, setLevel] = useState(0); const [open, setOpen] = useState<number[]>([]); const [done, setDone] = useState<number[]>([]); const [moves, setMoves] = useState(0); const [total, setTotal] = useState(0); const symbols = CACHE_LEVELS[level]; const complete = done.length === symbols.length;
  const choose = (index: number) => { if (open.includes(index) || done.includes(index) || open.length === 2 || complete) return; const next = [...open, index]; setOpen(next); if (next.length === 2) { setMoves(value => value + 1); window.setTimeout(() => { if (symbols[next[0]] === symbols[next[1]]) { setDone(value => [...value, ...next]); setTotal(value => value + 150 + level * 30); } setOpen([]); }, 420); } };
  const resetBoard = (nextLevel = 0) => { setLevel(nextLevel); setOpen([]); setDone([]); setMoves(0); if (!nextLevel) setTotal(0); };
  const final = complete && level === CACHE_LEVELS.length - 1;
  return <GameShell id="cache" score={Math.max(0, total - moves * 5)} onExit={onExit} meta={<p className="arcade-meta">{ui.stage} {level + 1} / 5 · {moves} {ui.attempts}</p>}><div className={`cache-grid cache-grid--level-${level + 1}`}>{symbols.map((symbol, index) => <button type="button" key={`${level}-${index}`} className="cache-card" aria-label={`${ui.card} ${index + 1}`} onClick={() => choose(index)}>{open.includes(index) || done.includes(index) ? symbol : '?'}</button>)}</div>{complete && <div className="arcade-result"><strong>{final ? ui.cacheCleared : ui.stageCleared}</strong><button className="arcade-restart" type="button" onClick={() => resetBoard(final ? 0 : level + 1)}>{final ? ui.playAgain : ui.nextStage}</button></div>}</GameShell>;
};

type Point = { x: number; y: number };
const Dpad: React.FC<{ onMove: (x: number, y: number) => void; label: string }> = ({ onMove, label }) => <div className="arcade-dpad" aria-label={label}><button type="button" onClick={() => onMove(0, -1)}>↑</button><button type="button" onClick={() => onMove(-1, 0)}>←</button><button type="button" onClick={() => onMove(0, 1)}>↓</button><button type="button" onClick={() => onMove(1, 0)}>→</button></div>;

const SnakeGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { language } = useTranslation(); const ui = ARCADE_UI[getLanguage(language)]; const [snake, setSnake] = useState<Point[]>([{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }]); const [food, setFood] = useState<Point>({ x: 9, y: 5 }); const [running, setRunning] = useState(false); const dir = useRef<Point>({ x: 1, y: 0 });
  const change = useCallback((x: number, y: number) => { if (dir.current.x !== -x || dir.current.y !== -y) dir.current = { x, y }; setRunning(true); }, []);
  useEffect(() => { const key = (event: KeyboardEvent) => { const map: Record<string, Point> = { ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 } }; if (map[event.key]) { event.preventDefault(); change(map[event.key].x, map[event.key].y); } }; addEventListener('keydown', key); return () => removeEventListener('keydown', key); }, [change]);
  useEffect(() => { if (!running) return; const timer = setInterval(() => setSnake(current => { const head = { x: current[0].x + dir.current.x, y: current[0].y + dir.current.y }; if (head.x < 0 || head.x > 13 || head.y < 0 || head.y > 9 || current.some(point => point.x === head.x && point.y === head.y)) { setRunning(false); return [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }]; } const ate = head.x === food.x && head.y === food.y; if (ate) setFood({ x: Math.floor(Math.random() * 14), y: Math.floor(Math.random() * 10) }); return [head, ...current.slice(0, ate ? current.length : current.length - 1)]; }), 130); return () => clearInterval(timer); }, [running, food]);
  return <GameShell id="snake" score={(snake.length - 3) * 100} onExit={onExit}><div className="pixel-board pixel-board--snake">{Array.from({ length: 140 }, (_, index) => { const x = index % 14, y = Math.floor(index / 14), body = snake.some(point => point.x === x && point.y === y), meal = food.x === x && food.y === y; return <span key={index} className={body ? 'pixel pixel--player' : meal ? 'pixel pixel--target' : 'pixel'} />; })}</div><Dpad onMove={change} label={ui.touchControls} /></GameShell>;
};

type PongState = { playerY: number; aiY: number; ballX: number; ballY: number; vx: number; vy: number; player: number; ai: number; status: 'ready' | 'playing' | 'won' | 'lost' };
const newPongState = (): PongState => ({ playerY: 41, aiY: 41, ballX: 50, ballY: 50, vx: -34, vy: 23, player: 0, ai: 0, status: 'ready' });
const PongGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { language } = useTranslation(); const ui = ARCADE_UI[getLanguage(language)]; const [game, setGame] = useState<PongState>(newPongState); const keys = useRef({ up: false, down: false }); const previous = useRef(0);
  const move = useCallback((delta: number) => setGame(current => ({ ...current, playerY: Math.max(2, Math.min(80, current.playerY + delta)) })), []);
  useEffect(() => { const down = (event: KeyboardEvent) => { if (event.key === 'ArrowUp' || event.key === 'w') keys.current.up = true; if (event.key === 'ArrowDown' || event.key === 's') keys.current.down = true; }; const up = (event: KeyboardEvent) => { if (event.key === 'ArrowUp' || event.key === 'w') keys.current.up = false; if (event.key === 'ArrowDown' || event.key === 's') keys.current.down = false; }; addEventListener('keydown', down); addEventListener('keyup', up); return () => { removeEventListener('keydown', down); removeEventListener('keyup', up); }; }, []);
  useEffect(() => { if (game.status !== 'playing') return; let frame = 0; const tick = (time: number) => { const dt = Math.min(.035, Math.max(.001, (time - (previous.current || time)) / 1000)); previous.current = time; setGame(current => { if (current.status !== 'playing') return current; let { playerY, aiY, ballX, ballY, vx, vy, player, ai } = current; if (keys.current.up) playerY -= 66 * dt; if (keys.current.down) playerY += 66 * dt; playerY = Math.max(2, Math.min(80, playerY)); const target = ballY - 9 + Math.sin(time / 530) * 7; if (vx > 0) aiY += Math.max(-26 * dt, Math.min(26 * dt, target - aiY)); else aiY += Math.max(-10 * dt, Math.min(10 * dt, 41 - aiY)); aiY = Math.max(2, Math.min(80, aiY)); ballX += vx * dt; ballY += vy * dt; if (ballY <= 2 || ballY >= 98) { ballY = Math.max(2, Math.min(98, ballY)); vy *= -1; } if (ballX <= 7 && vx < 0 && ballY >= playerY && ballY <= playerY + 18) { ballX = 7; vx = Math.min(58, Math.abs(vx) * 1.04); vy += ((ballY - playerY - 9) / 9) * 12; } if (ballX >= 93 && vx > 0 && ballY >= aiY && ballY <= aiY + 18) { ballX = 93; vx = -Math.min(58, Math.abs(vx) * 1.04); vy += ((ballY - aiY - 9) / 9) * 10; } if (ballX > 101) { player += 1; ballX = 50; ballY = 50; vx = -34; vy = player % 2 ? 24 : -24; } if (ballX < -1) { ai += 1; ballX = 50; ballY = 50; vx = 34; vy = ai % 2 ? -24 : 24; } return { playerY, aiY, ballX, ballY, vx, vy, player, ai, status: player >= 5 ? 'won' : ai >= 5 ? 'lost' : 'playing' }; }); frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); return () => { cancelAnimationFrame(frame); previous.current = 0; }; }, [game.status]);
  return <GameShell id="pong" score={game.player * 250 + Math.max(0, game.player - game.ai) * 100} onExit={onExit} meta={<p className="arcade-meta">{ui.you} {game.player} · {game.ai} {ui.server}</p>}><div className="pong-board"><span className="pong-paddle" style={{ transform: `translate3d(0, ${game.playerY * .5625}cqw, 0)` }} /><span className="pong-paddle pong-paddle--ai" style={{ transform: `translate3d(0, ${game.aiY * .5625}cqw, 0)` }} /><span className="pong-ball" style={{ transform: `translate3d(${game.ballX}cqw, ${game.ballY * .5625}cqw, 0)` }} /></div>{game.status !== 'playing' && <div className="arcade-result"><strong>{game.status === 'won' ? ui.youWin : game.status === 'lost' ? ui.serverWins : ui.firstToFive}</strong><button className="arcade-restart" type="button" onClick={() => setGame({ ...newPongState(), status: 'playing' })}>{game.status === 'ready' ? ui.startMatch : ui.rematch}</button></div>}<div className="arcade-inline-controls" aria-label={ui.touchControls}><button type="button" onPointerDown={() => move(-8)}>↑</button><button type="button" onPointerDown={() => move(8)}>↓</button></div></GameShell>;
};

const MINES = new Set([3, 11, 17, 26, 34, 41, 47]);
const MinefieldGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { language } = useTranslation(); const ui = ARCADE_UI[getLanguage(language)]; const [open, setOpen] = useState<number[]>([]); const [flags, setFlags] = useState<number[]>([]); const [status, setStatus] = useState<'playing' | 'lost' | 'won'>('playing'); const safeCount = 54 - MINES.size;
  const reveal = (index: number) => { if (status !== 'playing' || flags.includes(index)) return; if (MINES.has(index)) { setStatus('lost'); return; } const next = Array.from(new Set([...open, index])); setOpen(next); if (next.length === safeCount) setStatus('won'); };
  const flag = (event: React.MouseEvent, index: number) => { event.preventDefault(); if (status !== 'playing' || open.includes(index)) return; setFlags(current => current.includes(index) ? current.filter(value => value !== index) : [...current, index]); };
  const restart = () => { setOpen([]); setFlags([]); setStatus('playing'); };
  return <GameShell id="minefield" score={open.length * (status === 'lost' ? 10 : 40) + flags.filter(value => MINES.has(value)).length * 75} onExit={onExit} meta={<p className="arcade-meta">{flags.length}/{MINES.size} {ui.flags}</p>}><div className="mine-grid">{Array.from({ length: 54 }, (_, index) => { const adjacent = Array.from(MINES).filter(mine => Math.abs((mine % 9) - (index % 9)) <= 1 && Math.abs(Math.floor(mine / 9) - Math.floor(index / 9)) <= 1).length; return <button type="button" key={index} onClick={() => reveal(index)} onContextMenu={event => flag(event, index)} onDoubleClick={event => flag(event, index)} aria-label={`${ui.cell} ${index + 1}${flags.includes(index) ? `, ${ui.flagged}` : ''}`} className={`mine-cell ${open.includes(index) ? 'mine-cell--open' : ''} ${status === 'lost' && MINES.has(index) ? 'mine-cell--mine' : ''}`}>{status === 'lost' && MINES.has(index) ? '✹' : flags.includes(index) ? '⚑' : open.includes(index) && adjacent ? String(adjacent) : ''}</button>; })}</div>{status !== 'playing' && <div className="arcade-result"><strong>{status === 'won' ? ui.fieldCleared : ui.mineFound}</strong><button className="arcade-restart" type="button" onClick={restart}>{ui.newField}</button></div>}<p className="arcade-hint">{ui.mineHint}</p></GameShell>;
};

const WordBombGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { language } = useTranslation(); const lang = getLanguage(language); const ui = ARCADE_UI[lang]; const bank = WORD_BANK[lang];
  const [phase, setPhase] = useState<'ready' | 'playing' | 'won' | 'over'>('ready'); const [round, setRound] = useState(0); const [value, setValue] = useState(''); const [used, setUsed] = useState<string[]>([]); const [lives, setLives] = useState(3); const [time, setTime] = useState(100); const [message, setMessage] = useState(''); const fragment = bank.fragments[round % bank.fragments.length];
  const advance = useCallback(() => { setRound(current => current + 1); setTime(100); setValue(''); }, []);
  useEffect(() => { if (phase !== 'playing') return; const timer = window.setInterval(() => setTime(current => { if (current > 1) return current - 1; setLives(count => { const next = count - 1; if (next <= 0) setPhase('over'); else advance(); return next; }); setMessage(ui.wordTimeout); window.setTimeout(() => setMessage(''), 600); return 100; }), 90); return () => clearInterval(timer); }, [advance, phase, ui.wordTimeout]);
  const start = () => { setPhase('playing'); setRound(0); setValue(''); setUsed([]); setLives(3); setTime(100); setMessage(''); };
  const submit = (event: React.FormEvent) => { event.preventDefault(); const answer = normalizeWord(value); const normalizedFragment = normalizeWord(fragment); const knownWord = bank.words.some(word => normalizeWord(word) === answer); const alreadyUsed = used.some(word => normalizeWord(word) === answer); if (!knownWord || !answer.includes(normalizedFragment) || alreadyUsed) { setMessage(alreadyUsed ? ui.wordUsed : ui.wordInvalid); return; } const nextUsed = [...used, value.trim().toLocaleLowerCase()]; setUsed(nextUsed); setMessage(ui.wordCorrect); if (nextUsed.length >= bank.fragments.length) { setPhase('won'); setTime(0); setValue(''); } else { window.setTimeout(() => setMessage(''), 450); advance(); } };
  const endMessage = phase === 'won' ? ui.wordWon : phase === 'over' ? ui.wordLost : ui.wordReady;
  return <GameShell id="wordbomb" score={used.length * 200 + lives * 100} onExit={onExit} meta={<p className="arcade-meta">{ui.lives} {'●'.repeat(lives)}{'○'.repeat(3 - lives)}</p>}><div className={`word-bomb ${phase === 'playing' ? 'word-bomb--armed' : ''}`}><div className="word-bomb__timer"><span style={{ transform: `scaleX(${time / 100})` }} /></div><p className="word-bomb__fragment">{phase === 'playing' ? fragment.toUpperCase() : '••'}</p><p className="word-bomb__message" aria-live="polite">{message || (phase === 'playing' ? ui.wordInstruction : endMessage)}</p>{phase === 'playing' ? <form onSubmit={submit}><label htmlFor="word-bomb-input">{ui.wordLabel} {fragment}</label><input id="word-bomb-input" name="word-bomb-answer" autoComplete="off" value={value} onChange={event => setValue(event.target.value)} autoFocus /><button type="submit">{ui.wordSubmit}</button></form> : <button className="arcade-restart" type="button" onClick={start}>{phase === 'ready' ? ui.wordStart : ui.wordRetry}</button>}{used.length > 0 && <p className="word-bomb__used">{ui.used}: {used.join(' · ')}</p>}</div></GameShell>;
};

const PLAYERS: Record<GameId, React.FC<{ onExit: () => void }>> = { cache: CacheGame, snake: SnakeGame, pong: PongGame, minefield: MinefieldGame, wordbomb: WordBombGame };

export const ArcadeCollection: React.FC<{ onBack?: () => void; embedded?: boolean }> = ({ onBack, embedded = false }) => {
  const { language } = useTranslation(); const lang = getLanguage(language); const [active, setActive] = useState<GameId | null>(null); if (active) { const Player = PLAYERS[active]; return <Player onExit={() => setActive(null)} />; }
  const headline = lang === 'pt-BR' ? 'Cinco jogos que valem outra partida.' : lang === 'es' ? 'Cinco juegos que merecen otra partida.' : 'Five games worth another round.';
  return <main className={`arcade-hub ${embedded ? 'arcade-hub--embedded' : ''}`}><header className="arcade-hub__header"><div><p className="arcade-kicker">CHARLLESSTATION · ARCADE_02</p><h1>{headline}</h1><p>{lang === 'pt-BR' ? 'Menos protótipos. Mais fases, partidas vencíveis e recordes que dão vontade de tentar de novo.' : lang === 'es' ? 'Menos prototipos. Más fases, partidas que puedes ganar y récords que invitan a intentarlo otra vez.' : 'Fewer prototypes. More stages, winnable matches and scores worth chasing.'}</p></div>{onBack && <button type="button" className="arcade-back" onClick={onBack}>← {lang === 'pt-BR' ? 'Voltar ao quarto' : lang === 'es' ? 'Volver al cuarto' : 'Back to room'}</button>}</header><div className="arcade-library" role="list">{(Object.keys(GAME_COPY) as GameId[]).map((id, index) => <article className="arcade-game" role="listitem" key={id}><button type="button" onClick={() => setActive(id)} aria-label={`${GAME_COPY[id][lang].action}: ${GAME_COPY[id][lang].title}`}><span className="arcade-game__number">{String(index + 1).padStart(2, '0')}</span><span className="arcade-game__icon" aria-hidden="true">{ICONS[id]}</span><span className="arcade-game__copy"><strong>{GAME_COPY[id][lang].title}</strong><small>{GAME_COPY[id][lang].description}</small></span><span className="arcade-game__action">{GAME_COPY[id][lang].action} →</span></button></article>)}</div></main>;
};

export default ArcadeCollection;
