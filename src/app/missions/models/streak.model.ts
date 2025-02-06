export interface StreakInterface {
  days: number;
  doneToday: boolean;
}

export class Streak implements StreakInterface {
  public static getStreak(): Streak {
    const streak = new Streak(0, false);
    return JSON.parse(localStorage.getItem('streak') || JSON.stringify(streak));
  }

  constructor(
    public days: number,
    public doneToday: boolean,
  ) { }

  public static markDoneToday() {
    const streakDefault = new Streak(0, false);

    if (!localStorage.getItem('streak'))
      localStorage.setItem('streak', JSON.stringify(streakDefault));
    const streak = this.getStreak();

    if (streak.doneToday) return;
    streak.doneToday = true;
    streak.days += 1;
    localStorage.setItem('streak', JSON.stringify(streak));
  }
}
