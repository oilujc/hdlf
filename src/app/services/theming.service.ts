import { Injectable, RendererFactory2, inject, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThemingService {
    renderer: any;
    constructor(
        private renderedFactory: RendererFactory2,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.renderer = renderedFactory.createRenderer(null, null);
    }

    addBodyClass(bodyClass) {
        this.renderer.addClass(this.document.body, bodyClass)
    }

    removeBodyClass(bodyClass) {
        this.renderer.removeClass(this.document.body, bodyClass)
    }
}
