import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { identity } from '@/config/identity';

export const SEO: React.FC = () => {
    const { t, i18n } = useTranslation();

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
            "@type": "Person",
            "name": identity.name,
            "alternateName": identity.handle,
            "jobTitle": identity.role,
            "image": `${identity.domain}/reference/charlles-og-image.png`,
            "url": identity.domain,
            "sameAs": [
                identity.linkedin,
                identity.github
            ],
            "description": t('seo_description'),
            "knowsAbout": [
                "Full-Stack Development",
                "Web Accessibility",
                "Web Performance",
                "Design Systems",
                "React",
                "Next.js",
                "JavaScript",
                "TypeScript",
                "Go",
                "Java",
                "Automation",
                "Cybersecurity",
                "Networking",
                "SEO",
                "Software Architecture",
                "Web Engineering",
                "Open Source"
            ]
        }
    };

    return (
        <Helmet>
            <html lang={i18n.language || 'en'} />
            <title>{t('app_title', 'Charlles.dev | Full-Stack Software Engineer')}</title>
            <meta name="description" content={t('seo_description')} />
            <meta name="keywords" content="retro portfolio, Windows 95, PlayStation 2, game, interactive curriculum" />

            {/* Social Media Banner */}
            <meta property="og:image" content={`${identity.domain}/reference/charlles-og-image.png`} />
            <meta property="twitter:image" content={`${identity.domain}/reference/charlles-og-image.png`} />

            <script type="application/ld+json">
                {JSON.stringify(personSchema)}
            </script>
        </Helmet>
    );
};
