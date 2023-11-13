import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchDetailService } from '../../services/match-detail.service';
import { ActivatedRoute } from '@angular/router';
import { MatchDetails } from '../../models/matchDetails.model';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerStats } from '../../models/playerStats.model';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent implements OnInit {

  constructor(private matchDetailService: MatchDetailService, private route: ActivatedRoute) { }

  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('sort2') sort2!: MatSort;

  matchId!: string;
  matchData!: MatchDetails;

  dataSourceTeam2!: MatTableDataSource<PlayerStats>;
  dataSourceTeam3!: MatTableDataSource<PlayerStats>;

  wonTeam!: number;
  looseTeam!: number;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.matchId = params['matchId'];
      if (this.matchId) {
        this.matchDetailService.getMatchData(this.matchId).subscribe(data => {
          if (data) {
            this.matchData = data.foundMatch;

            // Create MatTableDataSource for players with Team 2
            const team2 = this.matchData.playerStats.filter(player => player.team === 2);
            team2.sort((b, a) => a.score - b.score);
            this.dataSourceTeam2 = new MatTableDataSource(team2);


            // Create MatTableDataSource for players with Team 3
            const team3 = this.matchData.playerStats.filter(player => player.team === 3);
            team3.sort((b, a) => a.score - b.score);
            this.dataSourceTeam3 = new MatTableDataSource(team3);

            if (team2[0].matchWon) {
              this.wonTeam = 2;
              this.looseTeam = 3;
            } else {
              this.wonTeam = 3;
              this.looseTeam = 2;
            }

            setTimeout(() => {
              this.dataSourceTeam2.sort = this.sort1;
              this.dataSourceTeam3.sort = this.sort2;

              // Apply default sorting after setting the MatSort
              this.dataSourceTeam2.sort.sort(({ id: 'score', start: 'desc' }) as MatSortable);
              this.dataSourceTeam3.sort.sort(({ id: 'score', start: 'desc' }) as MatSortable);
            }, 100);
          }
        })
      }
    })
  }
}

//https://steamcommunity.com/profiles/76561198447475184