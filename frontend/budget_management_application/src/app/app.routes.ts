import { Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AjoutDepenseComponent } from './ajout-depense/ajout-depense.component';
import { AjoutRevenuComponent } from './ajout-revenu/ajout-revenu.component';
import { AjoutCategorieComponent } from './ajout-categorie/ajout-categorie.component';

export const routes: Routes = [
    { path: 'signup', component: InscriptionComponent },
    { path: '', component: LoginComponent },
    { path: 'home', component: HomepageComponent},
    { path: 'depense', component: AjoutDepenseComponent},
    { path: 'revenu', component: AjoutRevenuComponent},
    { path: 'categorie', component: AjoutCategorieComponent}
];
