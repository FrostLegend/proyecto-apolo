import { Routes } from '@angular/router';
import { PlantasTable } from './plantas/plantas-table/plantas-table';
import { Home } from './components/home/home';
import { PlantasList } from './plantas/plantas-list/plantas-list';
import { PlantasDetalle } from './plantas/plantas-detalle/plantas-detalle';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'plantas', component: PlantasList},
    {path: 'plantasTabla', component: PlantasTable},
    {path: 'planta/:id', component: PlantasDetalle},
    {path: '**', pathMatch: 'full',redirectTo: '#home'},
];
