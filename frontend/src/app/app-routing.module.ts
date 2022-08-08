import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AdminComponent } from './admin/admin.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { AuthGuard } from './services/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UsereditprofileComponent } from './usereditprofile/usereditprofile.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path:'', redirectTo:'homepage', pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'login',component:UserloginComponent},
  {path:'profile',component:UserprofileComponent, canActivate:[AuthGuard]},
  {path:'usereditprofile',component:UsereditprofileComponent, canActivate:[AuthGuard]},
  {path:'admin/users', component:AdminUsersComponent, canActivate:[AuthGuard]},
  {path:'admin/addUser', component: AdminAddUserComponent, canActivate:[AuthGuard]},
  {path: 'admin/users/update/:id', component:AdminUserUpdateComponent, canActivate:[AuthGuard]},
  {path: 'homepage', component: HomepageComponent},
  {path:'category-listing', component: CategoryListingComponent},
  {path:'products', component:ProductsComponent},
  {path:'category-listing/:department', component: CategoryListingComponent},
  {path:'product-detail/:id', component: ProductDetailComponent},
  {path:'admin-login', component:AdminLoginComponent},
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard]},
  {path:'admin/add-new-product', component:AddNewProductComponent, canActivate:[AuthGuard]},
  { path:'admin/manage-products', component:ManageProductsComponent, canActivate:[AuthGuard]},
  {path:'admin/manage-products/:id', component:ProductDetailsComponent, canActivate:[AuthGuard]},
  {path:'admin/manage-products/edit/:id', component:ProductUpdateComponent, canActivate:[AuthGuard]},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path:'orders', component:OrdersComponent, canActivate:[AuthGuard]},
  {path:'admin/orders', component:AdminOrdersComponent, canActivate:[AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
