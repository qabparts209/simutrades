declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Database
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      DATABASE_URL: string;
      
      // Redis
      REDIS_URL: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      
      // API
      API_URL: string;
      WS_URL: string;
      
      // Sentry
      SENTRY_DSN: string;
      
      // S3
      BACKUP_BUCKET: string;
      
      // Environment
      NODE_ENV: 'development' | 'test' | 'production';
    }
  }
}

export {} 