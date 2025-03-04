export class TetrominoPool {
    constructor(createFn, initialSize = 10) {
        this.pool = [];
        this.createFn = createFn;
        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFn());
        }
    }
    acquire() {
        return this.pool.length > 0 ? this.pool.pop() : this.createFn();
    }
    release(obj) {
        this.pool.push(obj);
    }
}
