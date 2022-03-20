export class GameSchedule {
    public _id:string;
    public sport_id: number;
    public assigned_to: string;
    public team_a: string;
    public team_b: string;
    public status: number;
    public schedule: Date;
    public created_at: Date;
    public updated_at: Date;
}