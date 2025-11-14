import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Occupation } from '../models/occupation.model';
import { CalculatePremiumRequest, CalculatePremiumResponse } from '../models/premium.models';

@Injectable({ providedIn: 'root' })
export class PremiumService {
  private http = inject(HttpClient);

  // Using Angular proxy; call relative paths:
  getOccupations(): Observable<Occupation[]> {
    return this.http.get<Occupation[]>('/api/occupations');
  }

  calculatePremium(payload: CalculatePremiumRequest): Observable<CalculatePremiumResponse> {
    return this.http.post<CalculatePremiumResponse>('/api/premium/calculate', payload);
  }
}
