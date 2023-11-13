import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/matchDetails.model';

@Injectable({
  providedIn: 'root'
})
export class MatchDetailService {

  constructor(private http: HttpClient) { }

  getMatchData(matchId: string) {
    return this.http.get<Data>(`http://localhost:3000/cs/match?matchId=${matchId}`);
  }
}
