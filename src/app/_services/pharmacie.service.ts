import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PharmacieModel } from '../_models/PharmacieModel';

@Injectable({
  providedIn: 'root',
})
export class PharmacieService {
  constructor(private http: HttpClient) {}

  ajouterPharmacie(pharmacie: any) {
    return this.http.post<any>(`${environment.apiUrl}/pharmacies/ajouter`, {
      name: pharmacie.name,
    });
  }

  recupererPharmacies() {
    return this.http.get<any>(`${environment.apiUrl}/pharmacies`);
  }
  supprimerPharmacie(code: String) {
    return this.http.delete<any>(
      `${environment.apiUrl}/pharmacies/supprimer/${code}`
    );
  }

  modifierPharmacie(pharmacie: PharmacieModel) {
    return this.http.put<any>(`${environment.apiUrl}/pharmacies/modifier`, {
      code: pharmacie.code,
      name: pharmacie.name,
    });
  }
  recupererGardes(start: string | null, end: string | null) {
    const now = new Date();
    const defaultStart = new Date(
      now.getFullYear() - 1,
      now.getMonth(),
      now.getDate()
    )
      .toISOString()
      .split('T')[0]; // 1 an avant
    const defaultEnd = new Date(
      now.getFullYear() + 1,
      now.getMonth(),
      now.getDate()
    )
      .toISOString()
      .split('T')[0]; // 1 an après

    return this.http.get<any>(`${environment.apiUrl}/pharmacies/garde`, {
      params: {
        start: start || defaultStart, // Utiliser start ou la valeur par défaut
        end: end || defaultEnd, // Utiliser end ou la valeur par défaut
      },
    });
  }

  addGarde(dayOfGarde: string, pharmacieIds: number[]) {
    return this.http.post<any>(`${environment.apiUrl}/garde/ajouter`, {
      dayOfGarde: dayOfGarde,
      pharmacieIds: pharmacieIds
    });
  }
}
