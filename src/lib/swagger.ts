import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: '/src/pages/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'High school Alumni',
        version: '1.0',
      },
    },
  });
  return spec;
};
