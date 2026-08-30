import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGameInteraction } from '../useGameInteraction';
import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_WIDTH, TILE_HEIGHT } from '@/interfaces/constants';

// Mock utils
vi.mock('@utils/physics', () => ({
    checkCollision: vi.fn(),
    findPath: vi.fn(),
}));

import { checkCollision, findPath } from '@utils/physics';

describe('useGameInteraction', () => {
    const mockSetMoveQueue = vi.fn();
    const mockSetFacing = vi.fn();
    const mockOnObjectInteract = vi.fn();
    const mockAnnounce = vi.fn();
    const mockT = vi.fn((key) => key);

    const mockPlayer = {
        position: { x: -100, y: -100 }, // Far away to avoid coincidence
        size: { x: TILE_WIDTH, y: TILE_HEIGHT },
        color: 'red'
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(checkCollision).mockReturnValue(false);
        vi.mocked(findPath).mockReturnValue([]);
    });

    it('should handle interaction with interactive objects', () => {
        const { result } = renderHook(() =>
            useGameInteraction('playing', mockPlayer, [], mockSetMoveQueue, mockSetFacing, mockOnObjectInteract, mockAnnounce, mockT)
        );
        expect(result.current).toBeDefined();
    });

    it('keeps the rug walkable because it belongs to the static room layer', () => {
        const { result } = renderHook(() =>
            useGameInteraction('playing', mockPlayer, [], mockSetMoveQueue, mockSetFacing, mockOnObjectInteract, mockAnnounce, mockT)
        );

        const carpetX = 4.5 * TILE_WIDTH;
        const carpetY = 7.5 * TILE_HEIGHT;

        const container = document.createElement('div');
        vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
            left: 0, top: 0, width: CANVAS_WIDTH, height: CANVAS_HEIGHT, right: CANVAS_WIDTH, bottom: CANVAS_HEIGHT, x: 0, y: 0, toJSON: () => { }
        });

        const mockEvent = {
            clientX: carpetX,
            clientY: carpetY,
        } as unknown as React.MouseEvent;

        vi.mocked(checkCollision).mockReturnValue(false);
        vi.mocked(findPath).mockReturnValue([{ x: 10, y: 10 }]);

        act(() => {
            result.current.handleCanvasInteraction(mockEvent, container);
        });

        expect(mockOnObjectInteract).not.toHaveBeenCalled();
        expect(findPath).toHaveBeenCalled();
        expect(mockSetMoveQueue).toHaveBeenCalled();
    });
});
