import { PlayerStats } from "./playerStats.model";

export interface Data {
    foundMatch: MatchDetails;
}

export interface MatchDetails {
    map: string;
    team1Score: number;
    team2Score: number;
    playerStats: PlayerStats[];
}