export function setupEventHandlers(canvas, store, unit) {
    const deleteTiles = (x, y, color) => {
        const state = store.getState();
        const matrix = state.matrix;
        const stack = [[x, y]];
        const visited = new Set();
        while (stack.length > 0) {
            const [cx, cy] = stack.pop();
            const key = `${cx},${cy}`;
            if (visited.has(key))
                continue;
            visited.add(key);
            if (matrix[cy] && matrix[cy][cx] === color) {
                matrix[cy][cx] = null;
                stack.push([cx + 1, cy]);
                stack.push([cx - 1, cy]);
                stack.push([cx, cy + 1]);
                stack.push([cx, cy - 1]);
            }
        }
        store.dispatch({ type: "UPDATE_MATRIX", matrix });
    };
    const handleCanvasClick = (event) => {
        var _a;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / unit);
        const y = Math.floor((event.clientY - rect.top) / unit);
        const state = store.getState();
        const color = (_a = state.matrix[y]) === null || _a === void 0 ? void 0 : _a[x];
        if (color) {
            deleteTiles(x, y, color);
        }
    };
    canvas.addEventListener("click", handleCanvasClick);
}
