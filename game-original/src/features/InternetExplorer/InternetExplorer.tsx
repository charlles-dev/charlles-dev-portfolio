import { useEffect, useMemo, useRef, useState } from 'react';
import { WinButton } from '@atoms/WinButton/WinButton';
import { useTranslation } from '@context/LanguageContext';
import iconArrowLeft from 'pixelarticons/svg/arrow-left.svg';
import iconArrowRight from 'pixelarticons/svg/arrow-right.svg';
import iconClose from 'pixelarticons/svg/close.svg';
import iconReload from 'pixelarticons/svg/reload.svg';
import iconHome from 'pixelarticons/svg/home.svg';
import iconSearch from 'pixelarticons/svg/search.svg';
import { IconRenderer } from '@atoms/IconRenderer/IconRenderer';

import './InternetExplorer.css';
import { identity } from '@/config/identity';

export const InternetExplorer = () => {
  const { t, language } = useTranslation();
  const FAKE_URL = identity.domain;

  const [inputUrl, setInputUrl] = useState<string>(FAKE_URL);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<'home' | 'search' | 'external'>('home');
  const [query, setQuery] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const addressRef = useRef<HTMLInputElement>(null);

  const searchIndex = useMemo(() => [
    { title: 'Charlles.dev', description: t('resume_summary_content'), keywords: 'portfolio full stack software engineer charlles', url: identity.domain },
    { title: t('projects'), description: language === 'pt-BR' ? 'Projetos públicos com contexto, decisões e código.' : language === 'es' ? 'Proyectos públicos con contexto, decisiones y código.' : 'Public projects with context, decisions and code.', keywords: 'projects projetos proyectos github astrolink trakr teach', url: `${identity.domain}/${language}/projects` },
    { title: t('resume_exp_title'), description: t('resume_exp_job1_desc'), keywords: 'experience experiência experiencia work trabalho full stack', url: `${identity.domain}/${language}/cv#experience` },
    { title: t('skills'), description: 'TypeScript · React · Next.js · Node.js · PostgreSQL · Docker', keywords: 'skills stack tecnologias typescript react next node postgresql docker css html', url: `${identity.domain}/${language}/cv#stack` },
    { title: t('contact'), description: identity.email, keywords: 'contact contato contacto email linkedin github', url: `${identity.domain}/${language}#contact` },
    { title: 'Charlles Arcade', description: language === 'pt-BR' ? 'Minijogos locais dentro do videogame do quarto.' : language === 'es' ? 'Minijuegos locales dentro de la consola del cuarto.' : 'Local minigames inside the bedroom console.', keywords: 'arcade game jogo juego snake pong cache minesweeper', url: `${identity.domain}/${language}/game/world` },
    { title: 'GitHub', description: identity.githubLabel, keywords: 'github code código repositories repositorios public', url: identity.github },
  ], [language, t]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return searchIndex.filter(item => terms.every(term => `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(term)));
  }, [query, searchIndex]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const simulateNavigation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const destination = inputUrl.trim();
    setLoading(true);

    if (!destination || destination === FAKE_URL || destination.includes('charlles.dev/home')) {
      setPage('home'); setInputUrl(FAKE_URL); setQuery('');
    } else if (/^https?:\/\//i.test(destination)) {
      setPage('external'); setExternalUrl(destination);
    } else {
      const normalizedQuery = destination.replace(/^(search|buscar|pesquisar):\s*/i, '');
      setQuery(normalizedQuery); setPage('search'); setInputUrl(`search: ${normalizedQuery}`);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="ie-root">

      <div className="ie-toolbar">
        <WinButton className="ie-toolbar-btn" title={t('ie_back')} aria-label={t('ie_back')} disabled={page === 'home'} onClick={() => { setPage('home'); setInputUrl(FAKE_URL); setQuery(''); }}>
          <IconRenderer icon={iconArrowLeft} size={16} alt="" />
        </WinButton>

        <WinButton className="ie-toolbar-btn" title={t('ie_forward')} aria-label={t('ie_forward')} disabled>
          <IconRenderer icon={iconArrowRight} size={16} alt="" />
        </WinButton>

        <WinButton className="ie-toolbar-btn" title={t('ie_stop')} aria-label={t('ie_stop')} onClick={() => setLoading(false)}>
          <IconRenderer icon={iconClose} size={16} alt="" />
        </WinButton>

        <WinButton
          className="ie-toolbar-btn"
          title={t('ie_refresh')}
          aria-label={t('ie_refresh')}
          onClick={() => simulateNavigation()}
        >
          <IconRenderer icon={iconReload} size={16} alt="" />
        </WinButton>

        <WinButton
          className="ie-toolbar-btn"
          title={t('ie_home')}
          aria-label={t('ie_home')}
          onClick={() => { setPage('home'); setInputUrl(FAKE_URL); setQuery(''); setLoading(false); }}
        >
          <IconRenderer icon={iconHome} size={16} alt="" />
        </WinButton>

        <div className="ie-toolbar-divider" />

        <WinButton className="ie-toolbar-btn" title={t('ie_search')} aria-label={t('ie_search')} onClick={() => { setInputUrl(''); addressRef.current?.focus(); }}>
          <IconRenderer icon={iconSearch} size={16} alt="" />
        </WinButton>
      </div>


      <div className="ie-address-bar">
        <label htmlFor="ie-address-input" className="ie-address-label">{t('address_label')}</label>
        <form onSubmit={simulateNavigation} className="ie-address-form">
          <input
            id="ie-address-input"
            ref={addressRef}
            name="url"
            type="text"
            className="ie-address-input"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            maxLength={2048}
          />
        </form>
      </div>

      <div className="ie-content">
        {loading && (
          <div className="ie-loading-overlay">
            <div className="ie-loading-box">
              <p>{t('loading_contacting')}</p>
            </div>
          </div>
        )}

        {!loading && page === 'search' && (
          <section className="ie-search-page" aria-labelledby="ie-search-title">
            <header><p>CHARLLES.DEV SEARCH</p><h1 id="ie-search-title">{language === 'pt-BR' ? `Resultados para “${query}”` : language === 'es' ? `Resultados para “${query}”` : `Results for “${query}”`}</h1><span>{results.length} {language === 'pt-BR' ? 'resultado(s) local(is)' : language === 'es' ? 'resultado(s) local(es)' : 'local result(s)'}</span></header>
            {results.length > 0 ? <ol className="ie-search-results">{results.map(result => <li key={result.url}><a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a><p>{result.description}</p><small>{result.url}</small></li>)}</ol> : <div className="ie-search-empty"><h2>{language === 'pt-BR' ? 'Nada no disco local.' : language === 'es' ? 'Nada en el disco local.' : 'Nothing on the local disk.'}</h2><p>{language === 'pt-BR' ? 'Tente “projetos”, “React”, “contato” ou continue a busca na web.' : language === 'es' ? 'Prueba “proyectos”, “React”, “contacto” o continúa la búsqueda en la web.' : 'Try “projects”, “React”, “contact” or continue the search on the web.'}</p></div>}
            <a className="ie-web-search" href={`https://duckduckgo.com/?q=${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer">{language === 'pt-BR' ? 'Pesquisar na web' : language === 'es' ? 'Buscar en la web' : 'Search the web'} →</a>
          </section>
        )}

        {!loading && page === 'external' && (
          <section className="ie-external-page"><p>INTERNET EXPLORER</p><h1>{language === 'pt-BR' ? 'Este endereço abre fora do computador.' : language === 'es' ? 'Esta dirección se abre fuera del ordenador.' : 'This address opens outside the computer.'}</h1><p>{externalUrl}</p><a href={externalUrl} target="_blank" rel="noopener noreferrer">{language === 'pt-BR' ? 'Abrir endereço' : language === 'es' ? 'Abrir dirección' : 'Open address'} →</a></section>
        )}

        {!loading && page === 'home' && (
          <section>
            <div className="ie-page-container">
              <div className="ie-page-header">
                <span className="ie-page-welcome">{t('welcome_to')}</span>
                <h1 className="ie-page-title">
                  {identity.name}
                </h1>
                <p className="ie-page-subtitle">{t('frontend_portfolio')}</p>
              </div>

              <div className="ie-page-nav">
                <a href="#summary" className="ie-nav-link">
                  {t('resume_summary_title')}
                </a>
                <a href="#experience" className="ie-nav-link">
                  {t('resume_exp_title')}
                </a>
                <a href="#education" className="ie-nav-link">
                  {t('resume_edu_title')}
                </a>
                <a href="#contact" className="ie-nav-link">
                  {t('contact')}
                </a>
              </div>

              <div id="summary" className="ie-section-box">
                <h2 className="ie-section-title">{t('resume_summary_title')}</h2>
                <p className="ie-page-text">
                  {t('resume_summary_content')}
                </p>
              </div>

              <div id="experience" className="ie-section-box">
                <h2 className="ie-section-title">{t('resume_exp_title')}</h2>

                <div className="ie-resume-item">
                  <h3 className="ie-resume-role">{t('resume_exp_job1_role')}</h3>
                  <p className="ie-resume-company">{t('resume_exp_job1_company')}</p>
                  <p className="ie-resume-desc">{t('resume_exp_job1_desc')}</p>
                </div>

                <div className="ie-resume-item">
                  <h3 className="ie-resume-role">{t('resume_exp_job2_role')}</h3>
                  <p className="ie-resume-company">{t('resume_exp_job2_company')}</p>
                  <p className="ie-resume-desc">{t('resume_exp_job2_desc')}</p>
                </div>

                <div className="ie-resume-item">
                  <h3 className="ie-resume-role">{t('resume_exp_job3_role')}</h3>
                  <p className="ie-resume-company">{t('resume_exp_job3_company')}</p>
                  <p className="ie-resume-desc">{t('resume_exp_job3_desc')}</p>
                </div>
              </div>

              <div id="education" className="ie-section-box">
                <h2 className="ie-section-title">{t('resume_edu_title')}</h2>

                <div className="ie-resume-item">
                  <h3 className="ie-resume-role">{t('resume_edu_college1_course')}</h3>
                  <p className="ie-resume-company">{t('resume_edu_college1_name')} | {t('resume_edu_college1_date')}</p>
                  <p className="ie-resume-desc">{t('resume_edu_college1_desc')}</p>
                </div>

                <div className="ie-resume-item">
                  <h3 className="ie-resume-role">{t('resume_edu_college2_course')}</h3>
                  <p className="ie-resume-company">{t('resume_edu_college2_name')} | {t('resume_edu_college2_date')}</p>
                  <p className="ie-resume-desc">{t('resume_edu_college2_desc')}</p>
                </div>
              </div>


              <div id="volunteering" className="ie-section-box">
                <h2 className="ie-section-title">{t('resume_vol_title')}</h2>
                <div className="ie-resume-item">
                  <h3 className="ie-resume-role">{t('resume_vol_role')}</h3>
                  <p className="ie-resume-company">{t('resume_vol_org')}</p>
                  <p className="ie-resume-desc">{t('resume_vol_desc')}</p>
                </div>
              </div>

              <div id="contact" className="ie-section-box ie-page-text">
                <h2 className="ie-section-title">{t('contact')}</h2>
                <p>
                  {t('label_email')}: <a href={`mailto:${identity.email}`} className="ie-nav-link">{identity.email}</a>
                </p>
                <p>
                  LinkedIn: <a href={identity.linkedin} className="ie-nav-link" target="_blank" rel="noopener noreferrer">{identity.linkedinLabel}</a>
                </p>
                <p>
                  GitHub: <a href={identity.github} className="ie-nav-link" target="_blank" rel="noopener noreferrer">{identity.githubLabel}</a>
                </p>

              </div>


              <div className="ie-footer">
                {t('ie_footer_copy')}
              </div>
            </div>
          </section>
        )}
      </div>


      <div className="ie-status-bar">
        {loading ? t('status_opening') : t('status_done')}
      </div>
    </div>
  );
};
