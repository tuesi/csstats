import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchDetailService } from '../../services/match-detail.service';
import { ActivatedRoute } from '@angular/router';
import { MatchDetails } from '../../models/matchDetails.model';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerStats } from '../../models/playerStats.model';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';

const sliverUrl = 'assets/images/silver.png';
const fiveThousandUrl = 'assets/images/5000.png';
const tenThousandUrl = 'assets/images/10,000.png';
const fifteenThousandUrl = 'assets/images/15,000.png';
const twentyThousandUrl = 'assets/images/20,000.png';
const twentyFiveThousandUrl = 'assets/images/25,000.png';
const thirtyThousandUrl = 'assets/images/30,000.png';

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

            this.setRanks(team2, team3);

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

  setRanks(team2: PlayerStats[], team3: PlayerStats[]) {
    team2.forEach(player => {
      player.rankUrl = this.getRanks(player.rankNew);
    });

    team3.forEach(player => {
      player.rankUrl = this.getRanks(player.rankNew);
    });
  }

  getRanks(rank: number) {
    if (rank < 5000) {
      return sliverUrl;
    } else if (rank > 5000 && rank <= 9999) {
      return tenThousandUrl;
    } else if (rank > 10000 && rank <= 14999) {
      return fiveThousandUrl;
    } else if (rank > 15000 && rank <= 19999) {
      return fifteenThousandUrl;
    } else if (rank > 20000 && rank <= 24999) {
      return twentyThousandUrl;
    } else if (rank > 25000 && rank <= 29999) {
      return twentyFiveThousandUrl;
    } else {
      return thirtyThousandUrl;
    }
  }

  getRankColor(rank: number) {
    if (rank < 5000) {
      return "#b6c5d5";
    } else if (rank > 5000 && rank <= 9999) {
      return "#8ec2ef";
    } else if (rank > 10000 && rank <= 14999) {
      return "#677ce8";
    } else if (rank > 15000 && rank <= 19999) {
      return "#bc6afc";
    } else if (rank > 20000 && rank <= 24999) {
      return "#df13ec";
    } else if (rank > 25000 && rank <= 29999) {
      return "#e84948";
    } else {
      return "#ffd700";
    }
  }
}
