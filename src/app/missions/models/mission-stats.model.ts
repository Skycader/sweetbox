export interface MissionStats {
  progress: number;
  disabledUntil: number;
  isCompletedUntil: number;
  skillXp: number;
  doneToday: number;
  todoDate: string;
  notifiedReady: boolean;
  hearts: number;
  maxHearts: number;
  lastCompleted: number;
  onFire: number;
}
