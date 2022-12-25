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
  public fetes: string = '';
  public cestarrive: string = '';
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

  public getDayIndice(day: Date): number {
    const monthday: string = `${day.getMonth()+1}${day.getDate()}`;
    function getMonthday(element: IDays) {
      return element.id === monthday;
    }
    return this.dayTab.findIndex(getMonthday);
  }

  public getTodayIndice(): number {
    const monthday: string = `${this.todayDate.getMonth()+1}${this.todayDate.getDate()}`;
    function getMonthday(element: IDays) {
      return element.id === monthday;
    }
    return this.dayTab.findIndex(getMonthday);
  }

  public getTodayFetes(): string {
    const indice = this.getTodayIndice();
    return this.fetes = this.dayTab[indice].fetes;
  }

  public getTodayMrMme(): string {
    const indice = this.getTodayIndice();
    return this.fetes = this.dayTab[indice].mrmme;
  }

  public getTodayCestarrive(): string {
    const indice = this.getTodayIndice();
    return this.fetes = this.dayTab[indice].cestarrive;
  }
}
