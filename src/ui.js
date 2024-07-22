import {Runner} from './runner.js';
import {Color} from './color.js';

import {ctx, size as canvasSize} from './canvas.js';

export class UI {
    /**
     * 텍스트를 그립니다
     * @public
     * @param {string} text
     * @param {string} color
     * @param {string} border
     * @param {number} size
     * @param {import('./vector.js').VectorLike | 'center'} pos
     * @param {CanvasTextAlign} [align='center']
     * @returns {void}
     */
    static text(text, color, border, size, pos, align = 'start') {
        ctx.save();

        ctx.fillStyle = color;
        ctx.strokeStyle = border;

        ctx.textAlign = align;
        ctx.font = `bold ${size.toFixed(0)}px Pretendard-Regular`;
        ctx.lineCap = ctx.lineJoin = 'round';
        ctx.lineWidth = 4;

        if (pos === 'center') {
            ctx.strokeText(text, canvasSize.x / 2, canvasSize.y / 2);
            ctx.fillText(text, canvasSize.x / 2, canvasSize.y / 2);
        } else {
            ctx.strokeText(text, pos.x, pos.y);
            ctx.fillText(text, pos.x, pos.y);
        }

        ctx.restore();
    }
}
