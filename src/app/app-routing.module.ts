import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { SampleDataComponent } from './components/sample-data/sample-data.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'sample', component: SampleDataComponent },
  { path: 'upload', component: UploadComponent },
  // { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
