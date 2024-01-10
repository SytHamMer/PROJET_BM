import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PieChartComponent } from '../piechart-budget/piechart-budget.component';
import { AjoutDepenseComponent } from '../ajout-depense/ajout-depense.component';
import { MatDialog } from '@angular/material/dialog';
import { AjoutRevenuComponent } from '../ajout-revenu/ajout-revenu.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,PieChartComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  isMenuPhoneHidden: boolean = true;

  constructor(public dialog: MatDialog) {}

  toggleMobileMenu() {
    this.isMenuPhoneHidden = !this.isMenuPhoneHidden;
  }

  openNewSpending(): void {
    this.dialog.open(AjoutDepenseComponent, {
      width: '400px',
      height: '600px'
    });
  }

  openNewIncome(): void {
    this.dialog.open(AjoutRevenuComponent, {
      width: '400px',
      height: '600px'
    });
  }
}
