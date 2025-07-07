
class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._siftUp();
    }

    pop() {
        if (this.size() === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._siftDown();
        return top;
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    _siftUp() {
        let i = this.heap.length - 1;
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.heap[p] <= this.heap[i]) break;
            [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
            i = p;
        }
    }

    _siftDown() {
        let i = 0;
        const n = this.heap.length;
        while (true) {
            let left = 2 * i + 1, right = 2 * i + 2, smallest = i;
            if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
            if (smallest === i) break;
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
    }
}

var maxEvents = function(events) {
    events.sort((a, b) => a[0] - b[0]);
    let day = 0, index = 0, result = 0;
    const heap = new MinHeap();

    while (heap.size() > 0 || index < events.length) {
        if (heap.size() === 0) {
            day = events[index][0];
        }

        while (index < events.length && events[index][0] <= day) {
            heap.push(events[index][1]);
            index++;
        }

        heap.pop();
        result++;
        day++;

        while (heap.size() > 0 && heap.peek() < day) {
            heap.pop();
        }
    }

    return result;
};
