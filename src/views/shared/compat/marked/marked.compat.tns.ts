import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { PlatformProvider } from '@wooportal/core';
import * as marked from 'marked';
import { WebView } from 'tns-core-modules/ui/web-view';
import { MarkedCompat } from './marked.compat.i';

@Component({
  selector: 'marked-compat',
  template: `
    <WebView #webview margin="-8" [src]="html"></WebView>
  `
})

export class MarkedCompatComponent
  implements MarkedCompat, OnInit, AfterViewInit {

  @HostBinding('attr.compat')
  public readonly compat: string = 'marked';

  @Input()
  public data: string;

  public html: string;

  @ViewChild('webview', { read: ElementRef, static: true })
  private webview: ElementRef<WebView>;

  public constructor(
    private platformProvider: PlatformProvider
  ) { }

  public ngOnInit() {
    this.html = marked(this.data);
  }

  public ngAfterViewInit(): void {
    const wv = this.webview.nativeElement;

    // tslint:disable-next-line
    if(!wv.nativeView){return wv.once('loaded',()=>this.ngAfterViewInit());}
    // TODO: https://github.com/NativeScript/nativescript-angular/issues/848

    switch (this.platformProvider.name) {
      case 'Android':
        wv.android.setBackgroundColor(0x00000000);
        wv.android.setHorizontalScrollBarEnabled(false);
        wv.android.setVerticalScrollBarEnabled(false);
        wv.android.getSettings().setSupportZoom(false);
        return;

      case 'iOS':
        // TODO: https://board.codeschluss.de/project/wooportal/us/37
        wv.ios.opaque = false;
        wv.ios.setDrawsBackground = false;
        wv.ios.showsHorizontalScrollIndicator = false;
        wv.ios.showsVerticalScrollIndicator = false;
        return;
    }
  }

}