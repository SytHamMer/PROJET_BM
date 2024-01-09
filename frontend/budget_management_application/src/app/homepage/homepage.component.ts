import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PieChartComponent } from '../piechart-budget/piechart-budget.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,PieChartComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  isMenuPhoneHidden: boolean = true;

  toggleMobileMenu() {
    this.isMenuPhoneHidden = !this.isMenuPhoneHidden;
  }
}
