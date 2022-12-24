import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodayService {
  
  public todayDate: Date = new Date();
  public fetes: string = '';
  public cestarrive: string = '';
  private accesUrl!: string;

  constructor(
    private httpClient: HttpClient
  ) {
    //this.feedIt();
    this.accesUrl = `http://localhost:3000/today`;
   }

  //  private feedIt(): void {
  //  }

   private getOneDay(monthday: string): string {
    return `http://localhost:3000/today/${monthday}`;
  }

  public getTodayFetes(monthday: string): string {
    if (this.todayDate.getMonth() === 0) {
      let todayAdress = '01-' + this.todayDate.getDate();
      return this.fetes = `${this.getOneDay(todayAdress)}/`;
    } else {
      return this.fetes = ` Paramètre ${this.todayDate.getMonth() + 1}-${this.todayDate.getDate()}`;
    }
  }

  public getTodayCestarrive(): string {
    return this.cestarrive = 'yyy';
  }
}
