import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import DbJson from '../../../../_datas/db.json';

interface IDays {
  id: string;
  fetes: string;
  mrmme: string;
  cestarrive: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodayService {

  public todayDate: Date = new Date();
  // public fetes: string = '';
  // public cestarrive: string = '';
  private dayTab: IDays[] = DbJson.today;
  private accesUrl!: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.accesUrl = `http://localhost:3000/today/${`${this.todayDate.getMonth()+1}${this.todayDate.getDate()}`}`;
    //this.feedIt();
  }

  //  private feedIt(): void {
  //  }

  // Fonction générique inutilisée ici
  public getDayIndice(day: Date): number {
    let monthNumber: string = `${day.getMonth()+1}`;
    let dayNumber: string = `${day.getDate()}`;
    if(day.getMonth()+1 < 10) {
      monthNumber = `0${day.getMonth()+1}`;
    }
    if(day.getDate() < 10) {
      dayNumber = `0${day.getDate()}`;
    }
    const monthday: string = monthNumber + dayNumber;
    function getMonthday(element: IDays) {
      return element.id === monthday;
    }
    return this.dayTab.findIndex(getMonthday);
  }

  public getTodayIndice(): number {
    let monthNumber: string = `${this.todayDate.getMonth()+1}`;
    let dayNumber: string = `${this.todayDate.getDate()}`;
    if(this.todayDate.getMonth()+1 < 10) {
      monthNumber = `0${this.todayDate.getMonth()+1}`;
    }
    if(this.todayDate.getDate() < 10) {
      dayNumber = `0${this.todayDate.getDate()}`;
    }
    const monthday: string = monthNumber + dayNumber;
    //console.log("monthday = " + monthday);
    function getMonthday(element: IDays) {
      return element.id === monthday;
    }
    return this.dayTab.findIndex(getMonthday);
  }

  public getTodayFetes(): string {
    const indice = this.getTodayIndice();
    return this.dayTab[indice].fetes;
  }

  public getTodayMrMme(): string {
    const indice = this.getTodayIndice();
    return this.dayTab[indice].mrmme;
  }

  public getTodayCestarrive(): string {
    const indice = this.getTodayIndice();
    return this.dayTab[indice].cestarrive;
  }
}
