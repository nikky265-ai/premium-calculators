import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig as clientAppConfig } from './app.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ...clientAppConfig.providers!,
    provideHttpClient(withFetch()) // provides HttpClient
  ]
};
