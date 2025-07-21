import {Routes} from '@angular/router';
import {HomepageComponent} from '@views/homepage/homepage.component';
import {TimelineComponent} from '@views/timeline/timeline.component';
import {ManagerComponent} from '@views/manager/manager.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'timeline',
    component: TimelineComponent
  },
  {
    path: 'manage',
    component: ManagerComponent
  },
];
