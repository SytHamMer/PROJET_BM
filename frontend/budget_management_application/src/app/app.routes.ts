import { Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AjoutDepenseComponent } from './ajout-depense/ajout-depense.component';
import { AjoutRevenuComponent } from './ajout-revenu/ajout-revenu.component';
import { AjoutCategorieComponent } from './ajout-categorie/ajout-categorie.component';
import { UserComponent } from './user/user.component';
import { SpendingPageComponent } from './spending-page/spending-page.component';
import { ActivityPageComponent } from './activity-page/activity-page.component';

export const routes: Routes = [
    { path: 'signup', component: InscriptionComponent },
    { path: '', component: LoginComponent },
    { path: 'home', component: HomepageComponent},
    {path:'user',component: UserComponent},
    { path: 'spending', component: SpendingPageComponent},
    { path: 'activity', component: ActivityPageComponent},
    { path: 'categorie', component: AjoutCategorieComponent}

];
