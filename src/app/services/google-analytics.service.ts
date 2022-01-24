import { Injectable } from '@angular/core';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
// import { UserHolderService } from 'src/app/holders/user-holder.service';
import { filter, pairwise } from 'rxjs/operators';
import { webtrakingConstant } from 'src/app/webtracking-constant';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(
    private angulartics2GoogleTagManager: Angulartics2GoogleTagManager,
    private router: Router,
    // private userHolderService: UserHolderService
  ) { }

  // public registerEventUser(
  //   idUserGA_Param: string,
  //   eventParam: string,
  //   categoryParam: string,
  //   actionParam?: string,
  //   tagParam?: string,
  //   valueParam?: string
  //   ): void {
  //     this.angulartics2GoogleTagManager.pushLayer({'dataLayerUserIdGA': idUserGA_Param});
  //     this.registerEvent(eventParam, categoryParam, actionParam, tagParam, valueParam);
  // }
  public registerEvent(
    eventParam: string,
    categoryParam: string,
    actionParam?: string,
    tagParam?: string,
    valueParam?: string
    ): void {
      // this.angulartics2GoogleTagManager.pushLayer({'dataLayerCategoria': categoryParam});
      // this.angulartics2GoogleTagManager.pushLayer({'dataLayerAccion': actionParam});
      // this.angulartics2GoogleTagManager.pushLayer({'dataLayerEtiqueta': tagParam});
      // this.angulartics2GoogleTagManager.pushLayer({'dataLayerValor': valueParam});
      
      // this.angulartics2GoogleTagManager.pushLayer({'pageUrl': 'http://example.com/1'});
      // this.angulartics2GoogleTagManager.pushLayer({'pageTitle': 'Primera prueba'});

      this.angulartics2GoogleTagManager.pushLayer({
        // 'dataLayerCategoria': categoryParam,
        // 'dataLayerAccion': actionParam,
        // 'dataLayerEtiqueta': tagParam,
        // 'dataLayerValor': valueParam,
        'pageUrl': 'http://example.com/1',
        'pageTitle': 'Primera prueba',
        'event': eventParam});
  }
  public ga4RegisterEvent(arg:any){
    // this.angulartics2GoogleTagManager.pushLayer({ ecommerce: null ,event:'zombie'});
    this.angulartics2GoogleTagManager.pushLayer(arg);
  }

  public registerSearch(
    eventParam: string,
    codeParam: string
    ): void {
      this.angulartics2GoogleTagManager.pushLayer({'dataLayerEtiqueta': codeParam});

      this.angulartics2GoogleTagManager.pushLayer({'event': eventParam});
  }

  /**
   *
   * @param eventParam
   */
  // public registerPage(eventParam: string): void {
  //   const navEndEvents$ = this.router.events
  //       .pipe(
  //           filter(event => event instanceof NavigationEnd)
  //       );
  //       let previousUrl = '';
  //       const routesRecognized$ = this.router.events
  //           .pipe(
  //             filter((e: any) => e instanceof RoutesRecognized),
  //             pairwise()
  //         );
  //         routesRecognized$.subscribe((e: any) => {
  //           previousUrl = e[0].urlAfterRedirects;
  //       });

  //       navEndEvents$.subscribe((event: NavigationEnd) => {
  //         const local = webtrakingConstant.LOCAL;
  //         const pos = webtrakingConstant.POS;
  //         let userIdGA = '';
  //         const varTagManager = this.urlToTitlePage(event.urlAfterRedirects, previousUrl);

  //         // if (this.userHolderService.cashier) {
  //           // userIdGA = local + '-' + this.userHolderService.cashier;
  //           userIdGA = local + '-' + '654321';
  //         // }
  //         this.angulartics2GoogleTagManager.pushLayer({'dataLayerTitle': varTagManager['urlTitle']});
  //         this.angulartics2GoogleTagManager.pushLayer({'dataLayerPos': pos});
  //         this.angulartics2GoogleTagManager.pushLayer({'dataLayerLocal': local});
  //         this.angulartics2GoogleTagManager.pushLayer({'dataLayerUserRol': varTagManager['userRol']});
  //         this.angulartics2GoogleTagManager.pushLayer({'dataLayerUserId': varTagManager['userId']});
  //         this.angulartics2GoogleTagManager.pushLayer({'dataLayerUserIdGA': userIdGA});
  //         this.angulartics2GoogleTagManager.pushLayer({'event': eventParam});

  //         this.angulartics2GoogleTagManager.pushLayer({'gaSessionControl': ''});


  //       });

  // }


  /**
   * load analytics
   * @param trackingID
   */
  public loadGoogleAnalytics(trackingID: string): void {
    const gaScriptHead = document.createElement('script');
    gaScriptHead.innerText = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l]
      .push({\'gtm.start\':new Date().getTime(),event:\'gtm.js\'});var f =
      d.getElementsByTagName(s)[0],j = d.createElement(s),dl = l != \'dataLayer\' ? \'&l=\' + l : \'\';j.async =
      true;j.src =\'https://www.googletagmanager.com/gtm.js?id=\' +
      i + dl;f.parentNode.insertBefore(j, f);})(window, document, \'script\', \'dataLayer\', \'${ trackingID }\');`;

    const gaScriptBody = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    iframe.width = '0';
    iframe.height = '0';
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + trackingID;
    gaScriptBody.appendChild(iframe);

    console.log(document.documentElement.firstChild);

    if (document.documentElement.firstChild != null) {
      console.log(document.documentElement.firstChild);
      
      
      document.documentElement.firstChild.appendChild(gaScriptHead);
      document.body.insertBefore(gaScriptBody, document.body.firstChild);
    }
  }

  /**
   *
   *
   * @private
   * @param {string} urlStr url actual
   * @param {string} urlStrPrevious url de la navegacion anterior
   * @returns {{ 'urlTitle': string, 'userRol': string, 'userId': string}}
   * @memberof GoogleAnalyticsService
   */
  // private urlToTitlePage(urlStr: string, urlStrPrevious: string): { 'urlTitle': string, 'userRol': string, 'userId': string}  {
  //   let urlTitle = '';
  //   let userRol = 'Cajero';
  //   let userId = '';
  //   // if (this.userHolderService.cashier) {
  //   //    userId = this.userHolderService.cashier.id;
  //   userId = '654321';
  //   // }

  //   this.angulartics2GoogleTagManager.pushLayer({'gaSessionControl': ''});

  //   if (urlStr.includes('starPage') || urlStr === '/' ) {
  //     urlTitle = 'Inicio de Supervisor';
  //     userRol = undefined;
  //     userId = undefined;

  //   } else if (urlStr.includes('LoginCashier')) {
  //     urlTitle = 'Inicio de Cajero';
  //     userRol = 'Supervisor';
  //     // userId = this.userHolderService.supervisor.id;
  //     userId = '123';

  //   } else if (urlStr.includes('selectSection')) {
  //     urlTitle = 'Selección de Tipo de Usuario';
  //     userRol = 'Supervisor';
  //     // userId = this.userHolderService.supervisor.id;
  //     userId = '123';

  //   } else if (urlStr.includes('paymentModeComponent')) {
  //     urlTitle = 'Elección de Medio de Pago';

  //   } else if (urlStr.includes('managePaymentComponent')) {
  //     urlTitle = 'Gestión en Medio de Pago';

  //   } else if (urlStr.includes('screenEndComponent')) {
  //     urlTitle = 'Finalizando el Pago';

  //   } else if (urlStr.includes('searchProduct')) {
  //     urlTitle = 'Buscando Productos';

  //   } else if (urlStr.includes('salePanel')) {
  //     urlTitle = 'Panel de Venta';
  //     if (urlStrPrevious.includes('screenEndComponent') ){
  //       this.angulartics2GoogleTagManager.pushLayer({'gaSessionControl': 'start'});
  //     }

  //   } else if (urlStr.includes('menuUser') || urlStr.includes('user') || urlStr.includes('cashierHandling')) {
  //     urlTitle = 'Menú del Supervisor';
  //     userRol = 'Supervisor';
  //     // userId = this.userHolderService.supervisor.id;
  //     userId = '123';

  //   } else {
  //     urlTitle = 'Otras Vistas';
  //   }
  //   return {urlTitle, userRol, userId};
  // }

}
