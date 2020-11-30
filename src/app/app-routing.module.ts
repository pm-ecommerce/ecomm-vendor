import { AuthGuard } from './services/auth-guard.service';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderReportComponent } from './components/report/order-report/order-report.component';
import { ProductReportComponent } from './components/report/product-report/product-report.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActiveOrderComponent } from "./components/order/active-order/active-order.component";
import { InProgressOrderComponent } from "./components/order/in-progress-order/in-progress-order.component";
import { CompletedOrderComponent } from "./components/order/completed-order/completed-order.component";
import { CategoryReportComponent } from "./components/report/category-report/category-report.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':type',
        component: ProductListComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'categories/add', component: CategoryFormComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'categories/:id', component: CategoryFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories', component: CategoryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    children: [
      {
        path: '',
        component: ActiveOrderComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':type',
        component: ActiveOrderComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'report',
    children: [
      {
        path: 'sales',
        component: OrderReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'category',
        component: CategoryReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'product',
        component: ProductReportComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
