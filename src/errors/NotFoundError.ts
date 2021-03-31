class NotFoundError extends Error {
  constructor(public entity: string) {
    super(`${entity} is not found`);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
