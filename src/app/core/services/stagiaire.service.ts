import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Stagiaire } from '../models/stagiaire';

@Injectable({   // Injection de dépendance => Angular va créer la classe nécessaire si elle n'existe pas
  providedIn: 'root'
})
export class StagiaireService {

  private stagiaires: Array<Stagiaire> = [];
  // Rajouté pour l'environnement :
  private controllerBaseUrl!: string;

  constructor(
    private HttpClient: HttpClient
  ) {
    //this.feedIt();  // On coupe pour aller chercher les données dans le back
    this.controllerBaseUrl = `${environment.apiBaseUrl}/stagiaires`;
    // A ce stade => http://localhost:3000/stagiaires pour aller chercher le serveur json
  }

  private feedIt(): void {  // La fonction n'est utilisée que pour afficher les trois lignes du haut (invisibles plus tard)
    let stagiaire = new Stagiaire();
    stagiaire.setId(1);
    stagiaire.setLastName("Zidane");
    stagiaire.setFirstName("Zinedine");
    stagiaire.setPhoneNumber("06 04 02 00 08");
    stagiaire.setEmail("zzidane@gmail.com");
    stagiaire.setBirthDate(new Date(1972, 5, 23));
    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(2);
    stagiaire.setLastName("Aubert");
    stagiaire.setFirstName("Jean-Luc");
    stagiaire.setPhoneNumber("05 04 03 02 01");
    stagiaire.setEmail("jl@gmail.com");
    stagiaire.setBirthDate(new Date(1968, 3, 30));
    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(3);
    stagiaire.setLastName("Bond");
    stagiaire.setFirstName("James");
    stagiaire.setPhoneNumber("01 02 03 04 05");
    stagiaire.setEmail("bond@outlook.com");
    stagiaire.setBirthDate(new Date(1900, 1, 1));
    this.stagiaires.push(stagiaire);
  }

  public getStagiaires(): Array<Stagiaire> {
    return this.stagiaires;
  }

  public getVisibleStagiaireNumber(date: Date | null): number {
    if (date === null) {
      return this.stagiaires.length;
    }
    return (date.getDate() === 31) ?
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() > date).length :
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() < date).length;
  }

  public delete(stagiaire: Stagiaire): void {
    console.log(`Le composant me demande de supprimer ${stagiaire.getLastName()}`);
    // Mise en relation avec le back :
    //1. Call backend
    this.HttpClient.delete(
      //`http://localhost:8080/api/stagiaire/${stagiaire.getId()}`
      `${this.controllerBaseUrl}/${stagiaire.getId()}`
      ).subscribe((res: any) =>
    console.log("ok")
    )
    //2. Adapt local list
    const stagiaireIndex: number = this.stagiaires.findIndex(
      (obj: Stagiaire) => obj.getId()
    );
  }

  // Etape du json :
  
  public findAll(): Observable<Stagiaire[]> {
    return this.HttpClient.get<any>(
      //'localhost:3000/stagiaires'
      //'http://localhost:8080/api/stagiaire'
      this.controllerBaseUrl    // => `${environment.apiBaseUrl}/stagiaires`;
    )
    .pipe(
      take(1),
      map((stagiaires: any[]) => {
        return stagiaires.map((inputStagiaire: any) => {
          const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(inputStagiaire.id);
          stagiaire.setLastName(inputStagiaire.lastName);
          stagiaire.setFirstName(inputStagiaire.firstName);
          stagiaire.setEmail(inputStagiaire.email);
          stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
          stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
          return stagiaire;
        })
      })
    )
  }

  // Suite du travail avec le back :

  /*
  public findId(int id): Observable<Stagiaire> {
    return this.HttpClient.get<any>(
      this.controllerBaseUrl
    )
    .pipe(
      take(1)
    )
  }*/

  public add(stagiaire: Stagiaire): void {
    // hack to provoque error
    stagiaire.setFirstName('');
    //end hack
    
    console.log("Le add a appelé ", stagiaire);
    this.HttpClient.post(this.controllerBaseUrl, stagiaire)   // On a un pb avec le stagiaire en camel case ou pas
      .pipe(
        //take(1),
        // take + map : res Json => Stagiaire
        catchError((error: HttpErrorResponse) => {
          console.log("Stagiaire not created : ", error);
          return throwError(() => new Error("Not created"));
        }
      ))
      .subscribe(res => console.log("Réponse : ", res));

      // .subscribe(
      //   //_ => console.log("Sent")
      //   response => console.log("Réponse : ", response)
      //   // push in local array stagiaires (pour que ça se rafraichisse tout seul)
      // );
  }
}