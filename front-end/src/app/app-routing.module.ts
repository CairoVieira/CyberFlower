import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantaListComponent } from './planta/planta-list/planta-list.component';

const routes: Routes = [
    {path: 'planta', component: PlantaListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
