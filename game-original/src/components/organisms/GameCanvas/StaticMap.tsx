import React, { memo } from 'react';

const ROOM_IMAGE = '/assets/game/world/environment/charlles-home-concept-v1.png';

export const StaticMap: React.FC = memo(() => (
    <div className="game-canvas__static-layer" aria-hidden="true">
        <img
            src={ROOM_IMAGE}
            alt=""
            className="game-canvas__room"
            draggable={false}
        />
        <div className="game-canvas__room-grade" />
    </div>
));

StaticMap.displayName = 'StaticMap';
