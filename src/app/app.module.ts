import { VendorProfileComponent } from './components/common/header/vendor-profile/vendor-profile.component';
import { RequestInterceptor } from './services/request.interceptor';
import { LabelModule } from '@progress/kendo-angular-label';
import { AppErrorHandler } from './shared/app-error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { HeaderComponent } from './components/common/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { PipeModule } from './pipes/pipe.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { TagInputModule } from 'ngx-chips';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AwsUploadComponent } from './components/aws-upload/aws-upload.component';
import { AttrOptionComponent } from './components/attr-option/attr-option.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LoginComponent } from './components/login/login/login.component';
import { OrderReportComponent } from './components/report/order-report/order-report.component';
import { ProductReportComponent } from './components/report/product-report/product-report.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { CategoryReportComponent } from './components/report/category-report/category-report.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActiveOrderComponent } from './components/order/active-order/active-order.component';
import { InProgressOrderComponent } from './components/order/in-progress-order/in-progress-order.component';
import { CompletedOrderComponent } from './components/order/completed-order/completed-order.component';
import { ViewOrderDetailsComponent } from './components/order/view-order-details/view-order-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    ProductListComponent,
    ProductFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
    AwsUploadComponent,
    AttrOptionComponent,
    LoginComponent,
    OrderReportComponent,
    ProductReportComponent,
    CategoryReportComponent,
    DashboardComponent,
    ActiveOrderComponent,
    InProgressOrderComponent,
    CompletedOrderComponent,
    VendorProfileComponent,
    ViewOrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TagInputModule,
    ChartsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    InputsModule,
    DateInputsModule,
    LabelModule,
    GridModule,
    DropDownsModule,
    PipeModule,
    CKEditorModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
