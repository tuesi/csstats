import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from './match-details/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'csMatch';

  constructor(private themeService: ThemeService) { }

  isChecked = false;

  onToggleChange(event: any): void {
    var checkStatus = event.target.checked;
    localStorage.setItem('juodulys', checkStatus.toString());
    this.isChecked = checkStatus;
    this.themeService.setCheckedState(this.isChecked);
  }

  ngOnInit() {
    this.themeService.getCheckedState().subscribe((state) => {
      this.isChecked = state;
    })
  }

}
