import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { filter, map, take } from 'rxjs/operators';
import { Poe } from '../models/poe';
import { PoeDto } from 'src/app/poes/dto/poe-dto';
import { from, Observable } from 'rxjs';
import { TypeofExpr } from '@angular/compiler';
import { Stagiaire } from '../models/stagiaire';

@Injectable({
  providedIn: 'root'
})
export class PoeService {

  private controllerBaseUrl!: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.controllerBaseUrl = `${environment.apiBaseUrl}/poe`;
  }

  public findAll(): Observable<Poe[]> {
    return this.httpClient.get<any>(this.controllerBaseUrl)
      .pipe(
        take(1),
        map((poes: any[]) => {
          return poes.map((inputPoe: any) => {
            const poe: Poe = new Poe();
            poe.setId(inputPoe.id);
            poe.setTitle(inputPoe.title);
            poe.setPoeType(inputPoe.poeType);
            poe.setBeginDate(new Date(inputPoe.beginDate));
            poe.setEndDate(new Date(inputPoe.endDate));
            poe.setIdAelion(inputPoe.idAelion);
            return poe;
          })
        })
      );
  }

  public findOne(id: number): Observable<Poe> {
    return this.httpClient.get<any>(`${this.controllerBaseUrl}/${id}`)
      .pipe(
        take(1),
        map((inputPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(inputPoe.id);
          poe.setTitle(inputPoe.title);
          poe.setPoeType(inputPoe.poeType);
          poe.setBeginDate(new Date(inputPoe.beginDate));
          poe.setEndDate(new Date(inputPoe.endDate));
          poe.setIdAelion(inputPoe.idAelion);
          return poe;
        })
      );
  }

  public add(poeDto: PoeDto): Observable<Poe> {
    return this.httpClient.post<PoeDto>(this.controllerBaseUrl, poeDto)
      .pipe(
        take(1),
        map((inputDto: PoeDto) => {
          const poe: Poe = new Poe();
          poe.setId(inputDto.id!);
          poe.setTitle(inputDto.title);
          poe.setPoeType(inputDto.poeType);
          poe.setBeginDate(new Date(inputDto.beginDate));
          poe.setEndDate(new Date(inputDto.endDate));
          poe.setIdAelion(inputDto.idAelion);
          return poe;
        })
      );
  }

  public update(poe: Poe): Observable<Poe> {
    return this.httpClient.put<Poe>(`${this.controllerBaseUrl}`, poe)
      .pipe(
        take(1),
        map((inputPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(inputPoe.id!);
          poe.setTitle(inputPoe.title);
          poe.setPoeType(inputPoe.poeType);
          poe.setBeginDate(new Date(inputPoe.beginDate));
          poe.setEndDate(new Date(inputPoe.endDate));
          poe.setIdAelion(inputPoe.idAelion);
          return poe;
        })
      );
  }

  public delete(poe: Poe): Observable<HttpResponse<any>> {
    return this.httpClient.delete(`${this.controllerBaseUrl}/${poe.getId()}`,
      { observe: 'response' });
  }

  public getAllPoeTypes(): string[] {
    let typesTab: string[] = [];
    let typesSet: Set<string> = new Set<string>();
    this.httpClient.get<any>(this.controllerBaseUrl)
      .pipe(
        take(1),
        map((poes: any[]) => {
          return poes.map((inputPoe: any) => {
            typesSet.add(inputPoe.poeType);
          })
        })
      );
    // for (let type of typesSet) {
    //   typesTab.push(type);
    // }
    typesTab.push("POEC");
    typesTab.push("POEI");
    return typesTab;
  }

  // Fonctions concernant les stagiaires de la Poe

  public addStagiaire(poe: Poe, stagiaire: Stagiaire): Observable<Poe> {
    return this.httpClient.post<Poe>
    (`${this.controllerBaseUrl}/${poe.getId()}/addStagiaire/${stagiaire.getId()}`, poe)
      .pipe(
        take(1),
        map((inputPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(inputPoe.id!);
          poe.setTitle(inputPoe.title);
          poe.setBeginDate(new Date(inputPoe.beginDate));
          poe.setEndDate(new Date(inputPoe.endDate));
          poe.setPoeType(inputPoe.poeType);
          poe.setIdAelion(inputPoe.idAelion);
          poe.setStagiaires(inputPoe.stagiaires);
          return poe;
        })
      );
  }

  public addManyStagiaires(id: number, ids: Array<number>): Observable<Poe> {
    return this.httpClient.patch<any>(`${this.controllerBaseUrl}/${id}/addStagiaires`, ids)
      .pipe(
        take(1),
        map((inputPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(inputPoe.id);
          poe.setTitle(inputPoe.title);
          poe.setBeginDate(inputPoe.beginDate);
          poe.setEndDate(inputPoe.endDate);
          poe.setPoeType(inputPoe.poeType);
          const stagiaires: Array<Stagiaire> = inputPoe.stagiaires
            .map((inputStagiaire: any) => {
              const stagiaire: Stagiaire = new Stagiaire();
              stagiaire.setId(inputStagiaire.id);
              stagiaire.setLastName(inputStagiaire.lastName);
              stagiaire.setFirstName(inputStagiaire.firstName);
              stagiaire.setEmail(inputStagiaire.email);
              stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
              stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
              return stagiaire;
            });
          poe.setStagiaires(stagiaires);
          return poe;
        })
      );
  }

  public deleteStagiaire(poe: Poe, stagiaire: Stagiaire): Observable<Poe> {
    return this.httpClient.delete(`${this.controllerBaseUrl}/${poe.getId()}/removeStagiaire/${stagiaire.getId()}`)
      .pipe(
        take(1),
        map((inputPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(inputPoe.id!);
          poe.setTitle(inputPoe.title);
          poe.setBeginDate(new Date(inputPoe.beginDate));
          poe.setEndDate(new Date(inputPoe.endDate));
          poe.setPoeType(inputPoe.poeType);
          poe.setIdAelion(inputPoe.idAelion);
          poe.setStagiaires(inputPoe.stagiaires);
          return poe;
        })
      );
  }  
}
