import { COLORS } from "../config/constants.js";
export function render({ ctx, bufferWidth, bufferHeight, unit, }) {
    const renderCell = (x, y, fill) => {
        const left = x * unit;
        const top = y * unit;
        ctx.fillStyle = fill;
        ctx.fillRect(left, top, unit, unit);
        ctx.strokeStyle = COLORS.black;
        ctx.lineWidth = 1;
        ctx.strokeRect(left, top, unit, unit);
    };
    const drawBackground = () => {
        ctx.fillStyle = COLORS.lightGrey;
        ctx.fillRect(0, 0, bufferWidth, bufferHeight);
        ctx.strokeStyle = COLORS.grey;
        ctx.lineWidth = 0.5;
        for (let x = 0; x < bufferWidth; x += unit) {
            for (let y = 0; y < bufferHeight; y += unit) {
                ctx.strokeRect(x, y, unit, unit);
            }
        }
    };
    return (state) => {
        var _a;
        drawBackground();
        (_a = state.activeShape) === null || _a === void 0 ? void 0 : _a.matrix.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell && state.activeShape) {
                    const xGlobal = state.activeShape.x + x;
                    const yGlobal = state.activeShape.y + y;
                    renderCell(xGlobal, yGlobal, state.activeShape.fill);
                }
            });
        });
        state.matrix.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    renderCell(x, y, cell);
                }
            });
        });
    };
}
