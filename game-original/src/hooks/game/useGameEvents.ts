import { useState, useCallback } from 'react';
import { type TranslationKeys } from '@/utils/translationsKeys';

export const useGameEvents = (
    announce: (msg: string) => void,
    t: (key: TranslationKeys) => string
) => {
    const [gameEventMessage, setGameEventMessage] = useState<string | null>(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showVideoGamePrompt, setShowVideoGamePrompt] = useState(false);
    const [showPaperScreenPrompt, setShowPaperScreenPrompt] = useState(false);

    const triggerObjectEvent = useCallback((objId: string) => {
        if (objId === 'computer') {
            const msg = t('game_event_computer_found');
            setGameEventMessage(msg);
            setShowLoginPrompt(true);
            setShowVideoGamePrompt(false);
            setShowPaperScreenPrompt(false);
            announce(msg);
        } else if (objId === 'videoGame') {
            const msg = t('game_event_videogame_found');
            setGameEventMessage(msg);
            setShowVideoGamePrompt(true);
            setShowLoginPrompt(false);
            setShowPaperScreenPrompt(false);
            announce(msg);
        } else if (objId === 'resume') {
            const msg = t('game_event_backpack_found');
            setGameEventMessage(msg);
            setShowPaperScreenPrompt(true);
            setShowLoginPrompt(false);
            setShowVideoGamePrompt(false);
            announce(msg);
        }
    }, [t, announce]);

    return {
        gameEventMessage,
        setGameEventMessage,
        showLoginPrompt,
        setShowLoginPrompt,
        showVideoGamePrompt,
        setShowVideoGamePrompt,
        showPaperScreenPrompt,
        setShowPaperScreenPrompt,
        triggerObjectEvent
    };
};
