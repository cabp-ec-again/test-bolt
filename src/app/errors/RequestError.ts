export interface RequestErrorJsonInterface {
  message: string,
  status: number,
  stack?: unknown
}

export class RequestError extends Error {
  #status: number;

  constructor(message: string, status: number = 400) {
    super(message);
    this.#status = status;
  }

  get status() {
    return this.#status;
  }

  get json() {
    return {
      message: this.message,
      status: this.status
    };
  }
}
