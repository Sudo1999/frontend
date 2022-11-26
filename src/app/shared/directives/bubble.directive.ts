import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBubble]'   // Le sélecteur est différent de celui des composants (pas de templateUrl ni de styleUrls)
})      // Entre crochets comme ici, le sélecteur sera utilisé comme attribut d'une balise
export class BubbleDirective implements OnInit {

  /*
  private _defaultConfig: any = {
    height: '2em',
    width: '2em',
    lineHeight: '2em',
    backgroundColor: 'rgba(80, 80, 255, .7)',
    borderRadius: '50%',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    textAlign: 'center',
    display: 'inline-block'    
  }

  private _config: any = {};  // Object that merge _defaultConfig and the config passed as @Input

  @Input() public set config(inputConfig: any) {    // Ce set est le "setter magique" de Typescript
    // Avec cette méthode on ne va plus écraser les valeurs précédentes mais juste lire celles qui ne sont pas importées :
    for (const property in this._defaultConfig) {
      // Si la propriété existe dans inputConfig alors ... sinon ...
      if (inputConfig.hasOwnProperty(property)) {
          this._config[property] = inputConfig(property);
      } else {
        this._config[property] = this._defaultConfig(property);
      }
    }
    // On boucle ensuite sur inputConfig pour ajouter d'éventuelles propriétés n'existant pas encore dans _defaultConfig
    for (const property in inputConfig) {
      if (!this._defaultConfig.hasOwnProperty(property)) {
        this._config[property] = inputConfig[property];
      }
    }
  }*/
  
  //private config: any = {
  @Input() public config: any = {   // On transforme l'attribut privé en @Input
    height: '2em',
    width: '2em',
    lineHeight: '2em', // équivalent de line-height en css
    backgroundColor: 'rgba(80, 80, 255, .7)',
    borderRadius: '50%',
    color: 'black',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    textAlign: 'center',
    display: 'inline-block'
  }

  constructor(    
    private elementRef: ElementRef,   // ElementRef est la référence de l'élément sur lequel va être appliquée la directive
    private renderer: Renderer2
    ) {}
   
   ngOnInit(): void {    
    const nativeElement: HTMLElement = this.elementRef.nativeElement; // elementRef.nativeElement, c'est le <span appBubble>
    
    // Ce qui suit fonctionne mais ce n'est pas une bonne pratique :
    //nativeElement.style.fontWeight = 'bold';
    // Bonnes pratiques :
    //this.renderer.setStyle(nativeElement, 'fontWeight', 'bold');
    for (const property in this.config) {     // "for in" sert à boucler sur les propriétés d'un objet
    this.renderer.setStyle(nativeElement, property, this.config[property]); // this.config[property] = la valeur de property
    }
  }

  // On ajoute des éléments à la directive avec le @HostListener :

  @HostListener('click') public onClick() {
    //console.log(`Click was detected on the bubble`);
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    this.renderer.setStyle(nativeElement, 'transform', 'scale(2.0)');
    //this.renderer.addClass(nativeElement, 'zoom-in');
    setTimeout(
      () => {
        this.renderer.setStyle(nativeElement, 'transform', 'scale(1)'),
        //this.renderer.removeClass(nativeElement, 'zoom-in'),
        800
      }
    )
  }
}
