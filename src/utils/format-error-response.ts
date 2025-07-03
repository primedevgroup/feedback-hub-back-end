export function formatErrorResponse(error: any) {
  return {
    error: true,
    message: error.message,
    ...(error.details && { details: error.details }),
  };
}
