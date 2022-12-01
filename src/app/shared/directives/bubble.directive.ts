import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBubble]'   // Le sélecteur est différent de celui des composants (pas de templateUrl ni de styleUrls)
})              // Entre crochets comme ici, le sélecteur sera utilisé comme attribut d'une balise
export class BubbleDirective implements OnInit {

  @Input() public config: any = {   // On transforme l'attribut privé en @Input
    height: '2em',
    width: '2em',
    lineHeight: '2em',
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

    for (const property in this.config) {     // "for in" sert à boucler sur les propriétés d'un objet
    this.renderer.setStyle(nativeElement, property, this.config[property]); // this.config[property] = la valeur de property
    }
  }

  // On ajoute des éléments à la directive avec le @HostListener :

  @HostListener('click') public onClick() {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    this.renderer.setStyle(nativeElement, 'transform', 'scale(2.0)');
    setTimeout(
      () => {
        this.renderer.setStyle(nativeElement, 'transform', 'scale(1)'), 800
      })
  }
}
