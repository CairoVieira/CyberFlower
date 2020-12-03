import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantaListComponent } from './planta/planta-list/planta-list.component';
import { PlantaFormComponent } from './planta/planta-form/planta-form.component';

const routes: Routes = [
    {path: 'planta', component: PlantaListComponent},
    {path: 'planta/novo', component: PlantaFormComponent},
    {path: 'planta/:id', component: PlantaFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
