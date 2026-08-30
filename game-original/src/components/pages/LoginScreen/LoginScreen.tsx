import React, { useState } from 'react';
import { WinButton } from '@atoms/WinButton/WinButton';
import CharllesIconProfileWebP from '@assets/icons/me-with-cat.webp'
import CharllesIconProfile from '@assets/icons/me-with-cat.png'
import { useTranslation } from '@/context/LanguageContext';
import { useSound } from '@/context/SoundContext';
import { resolveLocalLogin, type SessionProfile } from '@/data/sessionProfiles';
import './LoginScreen.css';

interface LoginScreenProps {
    onLogin: (profile: SessionProfile) => void;
    onCancel?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onCancel }) => {
    const { t, language } = useTranslation();
    const { playSound } = useSound();
    const [username, setUsername] = useState('Guest');
    const [password, setPassword] = useState('');
    const [intruder, setIntruder] = useState(false);

    const [showTooltip, setShowTooltip] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const resolution = resolveLocalLogin(username, password);
        if (resolution.kind === 'intruder') {
            playSound('error');
            setIntruder(true);
            return;
        }
        playSound('startup');
        onLogin(resolution.profile);
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            setPassword('');
        }
    };

    if (intruder) return (
        <div className="login-screen">
            <section className="login-screen__intruder" aria-labelledby="intruder-title">
                <p className="login-screen__intruder-code">INTRUSION_ATTEMPT.TXT</p>
                <h1 id="intruder-title">{language === 'pt-BR' ? 'Ah, então você está tentando invadir o sistema.' : language === 'es' ? 'Ah, estás intentando entrar al sistema.' : 'So you are trying to break into the system.'}</h1>
                <p>{language === 'pt-BR' ? 'Boa tentativa. Você caiu no servidor cenográfico. Aqui só tem CSS, piadas ruins e nenhum dado real.' : language === 'es' ? 'Buen intento. Caíste en el servidor de utilería. Aquí solo hay CSS, chistes malos y ningún dato real.' : 'Nice try. You found the prop server. It holds CSS, bad jokes and no real data.'}</p>
                <pre>{language === 'pt-BR' ? `ACCESS: DENIED\nTHREAT LEVEL: curioso\nCOUNTERMEASURE: voltar com dignidade` : `ACCESS: DENIED\nTHREAT LEVEL: curious\nCOUNTERMEASURE: leave with dignity`}</pre>
                <WinButton type="button" onClick={() => { setIntruder(false); setPassword(''); }}>
                    {language === 'pt-BR' ? 'Voltar com dignidade' : language === 'es' ? 'Volver con dignidad' : 'Leave with dignity'}
                </WinButton>
            </section>
        </div>
    );

    return (
        <div className="login-screen">
            <div
                role="dialog"
                aria-labelledby="login-title"
                className="login-screen__window"
            >

                <div className="login-screen__title-bar">
                    <span id="login-title" className="login-screen__title">{t('login_title')}</span>
                    <div className="login-screen__help-wrapper">
                        <button
                            className="login-screen__help-btn"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onFocus={() => setShowTooltip(true)}
                            onBlur={() => setShowTooltip(false)}
                            aria-label={t('help')}
                            aria-describedby={showTooltip ? "login-help-tooltip" : undefined}
                        >
                            ?
                        </button>
                        {showTooltip && (
                            <div
                                id="login-help-tooltip"
                                role="tooltip"
                                className="login-screen__tooltip"
                            >
                                {t('login_help_tooltip')}
                            </div>
                        )}
                    </div>
                </div>

                <div className="login-screen__content">

                    <div className="login-screen__icon-wrapper">
                        <picture>
                            <source srcSet={CharllesIconProfileWebP} type="image/webp" />
                            <img
                                src={CharllesIconProfile}
                                alt={t('login_icon_alt')}
                                aria-hidden="true"
                                className="login-screen__icon"
                                width={140}
                                height={140}
                                onError={(e) => e.currentTarget.style.display = 'none'}
                            />
                        </picture>
                    </div>


                    <form id="login-form" onSubmit={handleSubmit} className="login-screen__form">
                        <p className="login-screen__desc">{t('login_desc')}</p>

                        <div className="login-screen__grid">
                            <label htmlFor="login-username" className="login-screen__label">{t('user_name')}</label>
                            <input
                                id="login-username"
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="login-screen__input"
                                autoFocus
                            />

                            <label htmlFor="login-password" className="login-screen__label">{t('password')}</label>
                            <input
                                id="login-password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-screen__input"
                            />
                        </div>
                    </form>
                </div>


                <div className="login-screen__actions">
                    <WinButton type="submit" form="login-form" className="login-screen__btn">
                        {t('ok')}
                    </WinButton>
                    <WinButton type="button" onClick={handleCancel} className="login-screen__btn">
                        {t('cancel')}
                    </WinButton>
                </div>

            </div>
        </div>
    );
};
