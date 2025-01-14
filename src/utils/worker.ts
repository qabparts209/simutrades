export class WebWorker {
    private worker: Worker

    constructor(workerFunction: () => void) {
        const blob = new Blob(
            [`(${workerFunction.toString()})()`],
            { type: 'application/javascript' }
        )
        this.worker = new Worker(URL.createObjectURL(blob))
    }

    postMessage(message: any): void {
        this.worker.postMessage(message)
    }

    onMessage(callback: (data: any) => void): void {
        this.worker.onmessage = (event) => callback(event.data)
    }

    terminate(): void {
        this.worker.terminate()
    }
} 