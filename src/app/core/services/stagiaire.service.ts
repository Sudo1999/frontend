import { HttpBackend, HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { StagiaireDto } from 'src/app/stagiaires/dto/stagiaire-dto';
import { environment } from 'src/environments/environment';
import { Stagiaire } from '../models/stagiaire';

@Injectable({   // Injection de dépendance => Angular va créer la classe nécessaire si elle n'existe pas
  providedIn: 'root'
})
export class StagiaireService {

  private stagiaires: Array<Stagiaire> = [];  
  private controllerBaseUrl!: string;   // Rajouté pour aller chercher l'information dans environment.ts

  constructor(
    private httpClient: HttpClient  // Le service httpClient contient les méthodes CRUD
  ) {
    //this.feedIt();  // On coupe pour aller chercher les données dans le back
    this.controllerBaseUrl = `${environment.apiBaseUrl}/stagiaire`; // apiBaseUrl est définie dans environment.ts
  }

  private feedIt(): void {
    // La fonction est utilisée pour afficher les trois lignes du haut (invisibles plus tard)
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
    stagiaire.setBirthDate(new Date(1900, 0, 7));
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

  public delete(stagiaire: Stagiaire): Observable<HttpResponse<any>> {
    console.log(`Le composant veut supprimer ${stagiaire.getFirstName()} ${stagiaire.getLastName()} id ${stagiaire.getId()}`);
    // Mise en relation avec le back :
    // 1. Call backend
    return this.httpClient.delete(
      `${this.controllerBaseUrl}/${stagiaire.getId()}`, // => `${environment.apiBaseUrl}/stagiaire/${stagiaire.getId()}`
      // Suite post-routage :
      { observe: 'response' }
    );
  }

  public findAll(): Observable<Stagiaire[]> {
    return this.httpClient.get<any>(this.controllerBaseUrl)
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
      );
  }

  public findOne(id: number): Observable<Stagiaire> {
    return this.httpClient.get<any>(`${this.controllerBaseUrl}/${id}`)
      .pipe(
        take(1),
        map((inputStagiaire: any) => {
          const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(inputStagiaire.id);
          stagiaire.setLastName(inputStagiaire.lastName);
          stagiaire.setFirstName(inputStagiaire.firstName);
          stagiaire.setEmail(inputStagiaire.email);
          stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
          stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
          return stagiaire;
        })
      );
  }

  public add(stagiaireDto: StagiaireDto): Observable<Stagiaire> {
    console.log("Le add a appelé ", stagiaireDto);
    return this.httpClient.post<StagiaireDto>(this.controllerBaseUrl, stagiaireDto)
      .pipe(
        take(1),
        map((inputDto: StagiaireDto) => {
          const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(inputDto.id!);
          stagiaire.setLastName(inputDto.lastName);
          stagiaire.setFirstName(inputDto.firstName);
          stagiaire.setEmail(inputDto.email);
          stagiaire.setPhoneNumber(inputDto.phoneNumber);
          stagiaire.setBirthDate(new Date(inputDto.birthDate))
          return stagiaire;
        })
      );
  }

  public update(stagiaire: Stagiaire): Observable<Stagiaire> {
    // Dans l'absolu il faudrait rajouter une ligne pour être sûrs que l'objet récupéré sera transformé en stagiaire.
    // On ne peut pas être sûrs sinon que le back renverra exactement l'objet et seulement lui :
    // const stagiaire: Stagiaire = stagiaireDto.toStagiaire();
    return this.httpClient.put<Stagiaire>(`${this.controllerBaseUrl}`, stagiaire)
    .pipe(
      take(1),
      map((inputStagiaire: any) => {
        const stagiaire: Stagiaire = new Stagiaire();
        stagiaire.setId(inputStagiaire.id!);
        stagiaire.setLastName(inputStagiaire.lastName);
        stagiaire.setFirstName(inputStagiaire.firstName);
        stagiaire.setBirthDate(new Date(inputStagiaire.birthdate));
        stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
        stagiaire.setEmail(inputStagiaire.email);
        return stagiaire;
      })
    )
  }}
