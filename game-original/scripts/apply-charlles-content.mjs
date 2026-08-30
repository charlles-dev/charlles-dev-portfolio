import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.resolve('src', 'content');
const projectDirectory = path.join(sourceRoot, 'projects');
const gameDirectory = path.join(sourceRoot, 'games');

for (const directory of [projectDirectory, gameDirectory]) {
  if (!directory.startsWith(sourceRoot)) throw new Error(`Unsafe content target: ${directory}`);
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.md')) await unlink(path.join(directory, entry.name));
  }
}

const projects = {
  'CharllesDev': {
    title: 'Charlles.dev',
    skills: ['Next.js', 'React', 'TypeScript', 'GSAP', 'Vitest'],
    banner: '/game/original/project-banners/charlles-dev.jpg',
    link: 'https://github.com/charlles-dev/charlles-dev-portfolio',
    copy: {
      'ptBR': ['Portfólio como sistema editorial e experiência jogável', 'Um portfólio multilíngue que conecta identidade cinematográfica, projetos públicos e decisões técnicas. Next.js cuida das rotas e metadados; o jogo apresenta o trabalho sem esconder a engenharia atrás do espetáculo.'],
      'en': ['Portfolio as an editorial system and playable experience', 'A multilingual portfolio connecting cinematic identity, public projects and technical decisions. Next.js handles routes and metadata; the game presents the work without hiding engineering behind spectacle.'],
      'es': ['Portafolio como sistema editorial y experiencia jugable', 'Un portafolio multilingüe que conecta identidad cinematográfica, proyectos públicos y decisiones técnicas. Next.js gestiona rutas y metadatos; el juego presenta el trabajo sin ocultar la ingeniería detrás del espectáculo.'],
    },
  },
  'Astrolink': {
    title: 'Astrolink', skills: ['Go', 'Networking', 'Infrastructure', 'Documentation'],
    banner: '/game/original/project-banners/astrolink.jpg', link: 'https://github.com/charlles-dev/Astrolink',
    copy: {
      'ptBR': ['Conectividade de baixo custo em áreas remotas', 'Uma investigação técnica pública sobre infraestrutura e software para acesso à internet em territórios difíceis. O repositório organiza hipóteses, código em Go e validações ainda pendentes.'],
      'en': ['Low-cost connectivity for remote areas', 'A public technical investigation into infrastructure and software for internet access in difficult territories. The repository organizes hypotheses, Go code and validation that is still pending.'],
      'es': ['Conectividad de bajo costo en áreas remotas', 'Una investigación técnica pública sobre infraestructura y software para internet en territorios difíciles. El repositorio organiza hipótesis, código en Go y validaciones pendientes.'],
    },
  },
  'Teach3035': {
    title: '3035 Teach', skills: ['Java', 'Spring Boot', 'React', 'TypeScript'],
    banner: '/game/original/project-banners/3035-teach.jpg', link: 'https://github.com/charlles-dev/3035-TEACH',
    copy: {
      'ptBR': ['Fundamentos full stack organizados para consulta', 'Repositório público com exercícios, módulos e decisões de implementação em Java, Spring Boot, React e TypeScript. A documentação organiza a prática dispersa em uma trilha técnica reaproveitável.'],
      'en': ['Full-stack fundamentals organized for reference', 'A public repository with exercises, modules and implementation decisions in Java, Spring Boot, React and TypeScript. Its documentation turns scattered practice into a reusable technical trail.'],
      'es': ['Fundamentos full stack organizados para consulta', 'Repositorio público con ejercicios, módulos y decisiones de implementación en Java, Spring Boot, React y TypeScript. La documentación convierte la práctica dispersa en una ruta técnica reutilizable.'],
    },
  },
  'Trakr': {
    title: 'Trakr', skills: ['Kotlin', 'ESP32', 'RFID/NFC', 'Embedded Systems'],
    banner: '/game/original/project-banners/trakr.jpg', link: 'https://github.com/charlles-dev/trakr',
    copy: {
      'ptBR': ['Uma maleta que percebe o que ficou para trás', 'Experimento que combina ESP32, RFID/NFC e uma aplicação Kotlin para acompanhar ferramentas físicas. A implementação separa leitura, estado e interface para facilitar testes.'],
      'en': ['A toolbox that notices what was left behind', 'An experiment combining ESP32, RFID/NFC and a Kotlin application to track physical tools. The implementation separates reading, state and interface to make testing easier.'],
      'es': ['Una caja que detecta lo que quedó atrás', 'Experimento que combina ESP32, RFID/NFC y una aplicación Kotlin para seguir herramientas físicas. La implementación separa lectura, estado e interfaz para facilitar pruebas.'],
    },
  },
};

for (const [id, project] of Object.entries(projects)) {
  for (const [locale, [subtitle, body]] of Object.entries(project.copy)) {
    const markdown = `---\ntitle: ${project.title}\nsubtitle: ${subtitle}\nskills: ${JSON.stringify(project.skills)}\nbanner: ${project.banner}\nlink: ${project.link}\n---\n\n${body}\n`;
    await writeFile(path.join(projectDirectory, `${id}-${locale}.md`), markdown, 'utf8');
  }
}

const routeFor = (locale, suffix = '') => `/${locale === 'ptBR' ? 'pt-BR' : locale}/game${suffix}`;
const games = {
  Bytebound: {
    title: 'Bytebound', color: '#d9ff43', route: '',
    copy: { ptBR: 'Micro-RPG sobre recuperar três módulos antes do deploy.', en: 'A micro-RPG about recovering three modules before deploy.', es: 'Un micro-RPG sobre recuperar tres módulos antes del deploy.' },
  },
  PlayerSandbox: {
    title: 'Player Sandbox 01', color: '#72e79c', route: '/sandbox',
    copy: { ptBR: 'Movimento, câmera, salto e animações do personagem 3D.', en: 'Movement, camera, jumping and 3D character animation.', es: 'Movimiento, cámara, salto y animaciones del personaje 3D.' },
  },
  EloSandbox: {
    title: 'Elo Sandbox 01', color: '#6b9acf', route: '/graybox',
    copy: { ptBR: 'Graybox mecânico para testar o Elo e a troca entre camadas.', en: 'Mechanical graybox for testing the Link and switching layers.', es: 'Graybox mecánico para probar el Vínculo y cambiar entre capas.' },
  },
  PuzzleRoom: {
    title: 'Puzzle Room 01', color: '#f3efe6', route: '/puzzle',
    copy: { ptBR: 'Primeira sala de puzzle completa da vertical slice.', en: 'The vertical slice’s first complete puzzle room.', es: 'La primera sala de puzzle completa de la vertical slice.' },
  },
};

for (const [id, game] of Object.entries(games)) {
  for (const locale of ['ptBR', 'en', 'es']) {
    const markdown = `---\ntitle: ${game.title}\nsize: 1 save\nimage: memory-card_clean.png\ncolor: '${game.color}'\ntype: game\ntags: [Web, React, Game]\ngithub: https://github.com/charlles-dev/charlles-dev-portfolio\nlinkToPlay: ${routeFor(locale, game.route)}\n---\n\n${game.copy[locale]}\n`;
    await writeFile(path.join(gameDirectory, `${id}-${locale}.md`), markdown, 'utf8');
  }
}

await mkdir(path.resolve('public', 'project-banners'), { recursive: true });
console.log('Old personal content removed; Charlles.dev projects and games created.');
