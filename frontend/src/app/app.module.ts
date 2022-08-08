import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserService } from './services/user.service';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegisterComponent } from './register/register.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UsereditprofileComponent } from './usereditprofile/usereditprofile.component';
import { FilterPipe } from './pipes/filter.pipe';

import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminUsersComponent,
    AdminAddUserComponent,
    AdminUserUpdateComponent,
    HomepageComponent,
    CarouselComponent,
    CategoryListingComponent,
    ProductDetailComponent,
    AdminComponent,
    AddNewProductComponent,
    ManageProductsComponent,
    ProductUpdateComponent,
    ProductDetailsComponent,
    AdminLoginComponent,
    RegisterComponent,
    UserloginComponent,
    UserprofileComponent,
    UsereditprofileComponent,
    FilterPipe,
    CartComponent,
    ProductsComponent,
    OrdersComponent,
    AdminOrdersComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
