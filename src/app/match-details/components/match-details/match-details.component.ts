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
const noRank = 'assets/images/skillgroup_none.png';
const silver1 = 'assets/images/skillgroup1.png';
const silver2 = 'assets/images/skillgroup2.png';
const silver3 = 'assets/images/skillgroup3.png';
const silver4 = 'assets/images/skillgroup4.png';
const silverElite = 'assets/images/skillgroup5.png';
const silverEliteMaster = 'assets/images/skillgroup6.png';
const gold1 = 'assets/images/skillgroup7.png';
const gold2 = 'assets/images/skillgroup8.png';
const gold3 = 'assets/images/skillgroup9.png';
const goldMaster = 'assets/images/skillgroup10.png';
const masterGuardian = 'assets/images/skillgroup11.png';
const masterGuardian2 = 'assets/images/skillgroup12.png';
const masterGuardianElite = 'assets/images/skillgroup13.png';
const distinguishedMasterGuardian = 'assets/images/skillgroup14.png';
const legendaryEagle = 'assets/images/skillgroup15.png';
const legendaryEagleMaster = 'assets/images/skillgroup16.png';
const supremeMaster = 'assets/images/skillgroup17.png';
const global = 'assets/images/skillgroup18.png';

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
    if (rank == 1) {
      return silver1;
    } else if (rank == 2) {
      return silver2;
    } else if (rank == 3) {
      return silver3
    } else if (rank == 4) {
      return silver4;
    } else if (rank == 5) {
      return silverElite;
    } else if (rank == 6) {
      return silverEliteMaster
    } else if (rank == 7) {
      return gold1;
    } else if (rank == 8) {
      return gold2;
    } else if (rank == 9) {
      return gold3;
    } else if (rank == 10) {
      return goldMaster;
    } else if (rank == 11) {
      return masterGuardian;
    } else if (rank == 12) {
      return masterGuardian2;
    } else if (rank == 13) {
      return masterGuardianElite;
    } else if (rank == 14) {
      return distinguishedMasterGuardian;
    } else if (rank == 15) {
      return legendaryEagle;
    } else if (rank == 16) {
      return legendaryEagleMaster;
    } else if (rank == 17) {
      return supremeMaster;
    } else if (rank == 18) {
      return global;
    } else if (rank > 50 && rank <= 5000) {
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
    } else if (rank >= 30000) {
      return thirtyThousandUrl;
    } else {
      return noRank;
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
    } else if (rank > 30000) {
      return "#ffd700";
    } else {
      return "black";
    }
  }
}
