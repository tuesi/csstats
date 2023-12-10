import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this.checkStorageForDarkTheme();
  }

  private isCheckedSubject = new BehaviorSubject<boolean>(false);
  isChecked$ = this.isCheckedSubject.asObservable();

  setCheckedState(isChecked: boolean): void {
    this.isCheckedSubject.next(isChecked);
  }

  getCheckedState(): Observable<boolean> {
    return this.isChecked$;
  }

  checkStorageForDarkTheme() {
    const storedValue = localStorage.getItem('juodulys') === 'true';
    this.setCheckedState(storedValue);
  }
}
