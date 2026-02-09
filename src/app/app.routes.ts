import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { PlantasList } from './plantas/plantas-list/plantas-list';
import { PlantasDetalle } from './plantas/plantas-detalle/plantas-detalle';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { userGuard } from './guards/user-guard-guard';
import { AdministradorPlantas } from './plantas/administrador-plantas/administrador-plantas';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'plantas', canActivate: [userGuard], component: PlantasList},
    {path: 'plantas/:search', component: PlantasList},
    {path: 'plantasAdministrar', component: AdministradorPlantas},
    {path: 'planta/:id', component: PlantasDetalle},
    {path: 'login', component: Login},
    {path: 'registro', component: Register},
    {path: '**', pathMatch: 'full',redirectTo: '#home'},
];
