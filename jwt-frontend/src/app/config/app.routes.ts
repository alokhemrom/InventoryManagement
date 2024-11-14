import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { AdminDashboardComponent } from '../components/dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from '../components/dashboard/user-dashboard/user-dashboard.component';
import { authGuard } from '../_guards/auth.guard';
import { roleGuard } from '../_guards/role.guard';
import { ForbiddenComponent } from '../components/forbidden/forbidden.component';
import { EmployeeListComponent } from '../components/_list/employee-list/employee-list.component';
import { InventoryListComponent } from '../components/_list/inventory-list/inventory-list.component';
import { CompanyListComponent } from '../components/_list/company-list/company-list.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
  },
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'USER' },
  },
  { path: 'inventory-list/:companyId', component: InventoryListComponent },
  { path: 'employee-list/:companyId', component: EmployeeListComponent },
  { path: 'company-list', component: CompanyListComponent },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  { path: '**', redirectTo: '' },
];

