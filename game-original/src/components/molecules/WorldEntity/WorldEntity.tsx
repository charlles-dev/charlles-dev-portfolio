import React from 'react';
import type { WorldEntityConfig } from '@/interfaces/constants';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/interfaces/constants';
import './WorldEntity.css';

interface WorldEntityProps {
    object: WorldEntityConfig;
}

export const WorldEntity: React.FC<WorldEntityProps> = ({ object }) => (
    <div
        className={`world-entity world-entity--hotspot world-entity--${object.id}`}
        aria-hidden="true"
        style={{
            left: `${(object.position.x / CANVAS_WIDTH) * 100}%`,
            top: `${(object.position.y / CANVAS_HEIGHT) * 100}%`,
            width: `${(object.size.x / CANVAS_WIDTH) * 100}%`,
            height: `${(object.size.y / CANVAS_HEIGHT) * 100}%`,
            zIndex: object.zIndex ?? 3,
        }}
    />
);
