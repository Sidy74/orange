import { Routes } from '@angular/router';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { PharmacieDeGardeComponent } from './components/pharmacie-de-garde/pharmacie-de-garde.component';
import { GardeComponent } from './garde/garde.component';

export const routes: Routes = [
    { path: 'pharmacies-garde', component: PharmacieDeGardeComponent },
    { path: 'pharmacies', component: PharmaciesComponent },
    { path: 'gardes', component: GardeComponent },

];
