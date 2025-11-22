import { ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthGuardService } from './services/authGuard-service';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './services/jwtinterceptor-service';

export const appConfig: ApplicationConfig = {
  providers: [
    // Standard setup for change detection
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Standard setup for routing
    provideRouter(routes),

    // Correct way to provide HTTP client and interceptors
    provideHttpClient(
      // Functional interceptors are provided using withInterceptors
      withInterceptors([jwtInterceptor]) 
    ),

    // Providing your service
  ]
};
