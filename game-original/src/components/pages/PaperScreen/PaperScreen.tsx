import { useEffect, useRef } from 'react';
import './PaperScreen.css';
import { useTranslation } from '@/context/LanguageContext';
import { identity } from '@/config/identity';

export function PaperFold() {
    const { t } = useTranslation();
    const paperRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (paperRef.current) {
            paperRef.current.focus();
        }
    }, []);

    return (
        <main className="paper-wrapper">
            <article
                ref={paperRef}
                className="paper-fold outline-none"
                aria-label="Curriculum"
                tabIndex={-1}
            >
                <div className="paper-lines">
                    <section
                        className="paper-text"
                        spellCheck={false}
                    >
                        <h1 className="paper-title">
                            {identity.name}
                        </h1>
                        <p className="paper-intro">
                            {t('paper_text_intro')}
                        </p>

                        <div className="paper-section">
                            <h2 className="paper-section-title">{t('resume_summary_title')}</h2>
                            <p className="paper-section-content">
                                {t('resume_summary_content')}
                            </p>
                        </div>

                        <div className="paper-section">
                            <h2 className="paper-section-title">{t('resume_exp_title')}</h2>
                            <div className="paper-item">
                                <h3 className="paper-role">{t('resume_exp_job1_role')}</h3>
                                <p className="paper-company">{t('resume_exp_job1_company')}</p>
                                <p className="paper-description">{t('resume_exp_job1_desc')}</p>
                            </div>
                            <div className="paper-item">
                                <h3 className="paper-role">{t('resume_exp_job2_role')}</h3>
                                <p className="paper-company">{t('resume_exp_job2_company')}</p>
                                <p className="paper-description">{t('resume_exp_job2_desc')}</p>
                            </div>
                        </div>

                        <div className="paper-section">
                            <h2 className="paper-section-title">{t('resume_edu_title')}</h2>
                            <div className="paper-education-item">
                                <h3 className="paper-role">{t('resume_edu_college1_course')}</h3>
                                <p className="paper-company">{t('resume_edu_college1_name')} | {t('resume_edu_college1_date')}</p>
                            </div>
                            <div className="paper-education-item">
                                <h3 className="paper-role">{t('resume_edu_college2_course')}</h3>
                                <p className="paper-company">{t('resume_edu_college2_name')} | {t('resume_edu_college2_date')}</p>
                            </div>
                        </div>

                        <div className="paper-section">
                            <h2 className="paper-section-title">{t('contact')}</h2>
                            <p className="paper-contact-text">
                                Email: <a href={`mailto:${identity.email}`} className="paper-link">{identity.email}</a>
                            </p>
                            <p className="paper-contact-text">
                                LinkedIn: <a href={identity.linkedin} className="paper-link" target="_blank" rel="noopener noreferrer">{identity.linkedinLabel}</a>
                            </p>
                            <p className="paper-contact-text">
                                GitHub: <a href={identity.github} className="paper-link" target="_blank" rel="noopener noreferrer">{identity.githubLabel}</a>
                            </p>
                        </div>

                    </section>
                </div>

                <span className="paper-hole hole-top" aria-hidden="true" />
                <span className="paper-hole hole-middle" aria-hidden="true" />
                <span className="paper-hole hole-bottom" aria-hidden="true" />
            </article>
        </main>
    )
}
