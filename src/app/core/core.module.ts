import { NgModule, Optional, SkipSelf, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import {FooterComponent, NgbdModalContent} from './shell/footer/footer.component';
import { I18nService } from './i18n.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';
import {FormsModule} from "@angular/forms";
import {AuthentificationService} from "./authentification/authentification.service";


export function createHttpService(backend: ConnectionBackend,
                                  defaultOptions: RequestOptions,
                                  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  entryComponents: [
    NgbdModalContent
  ],
  declarations: [
    ShellComponent,
    HeaderComponent,
    FooterComponent,
    NgbdModalContent],
  providers: [
    I18nService,
    HttpCacheService,
    AuthentificationService,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
