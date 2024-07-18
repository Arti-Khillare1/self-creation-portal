import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SubTasksResourcesComponent } from '../components/sub-tasks-resources/sub-tasks-resources.component';
import { ProjectDetailsComponent } from '../components/project-details/project-details.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CertificatesComponent } from '../components/certificates/certificates.component';
import { canDeactivateGuard } from 'lib-shared-modules';

const routes: Routes = [
  {
    path:'',
    redirectTo:'project',
    pathMatch:'full'
  },
  {
    path:'project',
    component:LayoutComponent,
    children:[
      {
        path:'project-details',
        component:ProjectDetailsComponent
      },
      {
        path:'tasks',
        component:TasksComponent
      },
      {
          path:'sub-tasks',
          component:SubTasksResourcesComponent
      },
      {
        path:'certificate',
        component:CertificatesComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewModuleRoutingModule { }
