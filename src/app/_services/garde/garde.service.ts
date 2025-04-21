import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GardeService {

  constructor(private http: HttpClient) {}

    recupererGardes() {
      return this.http.get<any>(`${environment.apiUrl}/garde`);
    }

}
