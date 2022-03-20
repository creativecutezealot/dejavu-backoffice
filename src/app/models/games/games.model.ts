export class Games {
    public _id:string;
    public GameID: number;
    public Season: number;
    public SeasonType: number;
    public Status: string;
    public Day: Date;
    public DateTime: Date;
    public AwayTeam: string;
    public HomeTeam: string;
    public AwayTeamID: number;
    public HomeTeamID: number;
    public RescheduledGameID: number;
    public StadiumID: number;
    public Channel: string;
    public Inning: number;
    public InningHalf: string;
    public AwayTeamRuns: number;
    public HomeTeamRuns: number;
    public AwayTeamHits: number;
    public HomeTeamHits: number;
    public AwayTeamErrors: number;
    public HomeTeamErrors: number;
    public WinningPitcherID: number;
    public LosingPitcherID: number;
    public SavingPitcherID: number;
    public Attendance: number;
    public AwayTeamProbablePitcherID: number;
    public HomeTeamProbablePitcherID: number;
    public Outs: number;
    public Balls: number;
    public Strikes: number;
    public CurrentPitcherID: number;
    public CurrentHitterID: number;
    public AwayTeamStartingPitcherID: number;
    public HomeTeamStartingPitcherID: number;
    public CurrentPitchingTeamID: number;
    public CurrentHittingTeamID: number;
    public PointSpread: number;
    public OverUnder: number;
    public AwayTeamMoneyLine: number;
    public HomeTeamMoneyLine: number;
    public ForecastTempLow: number;
    public ForecastTempHigh: number;
    public ForecastDescription: string;
    public ForecastWindChill: number;
    public ForecastWindSpeed: number;
    public ForecastWindDirection: number;
    public RescheduledFromGameID: number;
    public RunnerOnFirst: boolean;
    public RunnerOnSecond: boolean;
    public RunnerOnThird: boolean;
    public AwayTeamStartingPitcher: string;
    public HomeTeamStartingPitcher: string;
    public CurrentPitcher: string;
    public CurrentHitter: string;
    public WinningPitcher: string;
    public LosingPitcher: string;
    public SavingPitcher: string;
    public DueUpHitterID1: number;
    public DueUpHitterID2: number;
    public DueUpHitterID3: number;
    public GlobalGameID: number;
    public GlobalAwayTeamID: number;
    public GlobalHomeTeamID: number;
    public PointSpreadAwayTeamMoneyLine: number;
    public PointSpreadHomeTeamMoneyLine: number;
    public LastPlay: string;
    public IsClosed: boolean;
    public Updated: Date;
    public GameEndDateTime: Date;
    public HomeRotationNumber: number;
    public AwayRotationNumber: number;
    public created_at: Date;
    public updated_at: Date;
}