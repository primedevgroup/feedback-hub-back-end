import { AppError } from "./app-error";

export class NotFoundError extends AppError {
  constructor(message = "Not found", details?: any) {
    super(message, 404, details);
  }
}
