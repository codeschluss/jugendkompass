import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatProgressBarModule } from '@angular/material';
import { RouterModule, UrlSerializer } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TokenInterceptor } from '../auth/token.interceptor';
import { ErrorDialogComponent } from '../error/error.dialog';
import { CoreErrorHandler } from '../error/error.handler';
import { I18nComponent } from '../i18n/i18n.component';
import { I18nInterceptor } from '../i18n/i18n.interceptor';
import { LoadingIndicatorComponent } from '../loading/loading.indicator';
import { LoadingInterceptor } from '../loading/loading.interceptor';
import { RoutletterChildComponent, RoutletterHostComponent } from './routeletter';
import { CoreUrlSerializer } from './serializer';
import { CoreSettings } from './settings';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    I18nComponent,
    LoadingIndicatorComponent,
    RoutletterChildComponent,
    RoutletterHostComponent
  ],
  entryComponents: [
    ErrorDialogComponent,
    RoutletterChildComponent
  ],
  exports: [
    I18nComponent,
    LoadingIndicatorComponent,
    RoutletterHostComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js')
  ],
  providers: [
    { provide: CoreSettings, useClass: CoreSettings },
    { provide: ErrorHandler, useClass: CoreErrorHandler },
    { provide: UrlSerializer, useClass: CoreUrlSerializer },

    { provide: HTTP_INTERCEPTORS, useClass: I18nInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})

export class CoreModule { }
