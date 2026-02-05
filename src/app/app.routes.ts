import { Routes } from '@angular/router';
import { PlantasTable } from './plantas/plantas-table/plantas-table';
import { Home } from './components/home/home';
import { PlantasList } from './plantas/plantas-list/plantas-list';
import { PlantasDetalle } from './plantas/plantas-detalle/plantas-detalle';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { userGuard } from './guards/user-guard-guard';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'plantas', canActivate: [userGuard], component: PlantasList},
    {path: 'plantas/:search', component: PlantasList},
    {path: 'plantasTabla', component: PlantasTable},
    {path: 'planta/:id', component: PlantasDetalle},
    {path: 'login', component: Login},
    {path: 'registro', component: Register},
    {path: '**', pathMatch: 'full',redirectTo: '#home'},
];
