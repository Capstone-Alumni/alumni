export function getPageAndLimitFromParams(params: any) {
  const page = params.page ? parseInt(params.page as string, 10) : 1;
  const limit = params.limit ? parseInt(params.limit as string, 10) : 20;
  return { page, limit };
}
