import { Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    { path: 'signup', component: InscriptionComponent },
    { path: '', component: LoginComponent },
    { path: 'home', component: HomepageComponent},
    {path:'user',component: UserComponent},
];
