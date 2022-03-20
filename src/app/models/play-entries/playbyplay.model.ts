export class PlayByPlay {
    public _id:string;
    public game_id: number;
    public team_a_score: number;
    public team_b_score: number;
    public inning_number: number;
    public inning_half: number;
    public outs: number;
    public balls: number;
    public strikes: number;
    public hitter_id: string;
    public runner_on_first: string;
    public runner_on_second: string;
    public runner_on_third: string;
    public description: string;
    public player_scored: string;
    public player_out: string;
    public result: string;
}