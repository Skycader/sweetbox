import { Pipe, PipeTransform } from '@angular/core';
import { Mission } from '../../components/missions-list/missions-list.component';

@Pipe({
  name: 'completed',
})
export class CompletedPipe implements PipeTransform {
  transform(missions: Mission[]): number {
    return missions.reduce(
      (total, mission) => (mission.isCompleted() ? (total += 1) : total),
      0,
    );
  }
}
