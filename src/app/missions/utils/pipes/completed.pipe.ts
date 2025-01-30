import { Pipe, PipeTransform } from '@angular/core';
import { Mission } from '../../services/mission.class';

@Pipe({
  name: 'completed',
  pure: false,
})
export class CompletedPipe implements PipeTransform {
  transform(missions: Mission[]): number {
    return missions.reduce(
      (total, mission) => (mission.isCompleted() ? (total += 1) : total),
      0,
    );
  }
}
