import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberCreateComponent } from './components/member/member-create/member-create.component';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';
import { MemberViewComponent } from './components/member/member-view/member-view.component';
import { PaymentCreateComponent } from './components/payment/payment-create/payment-create.component';
import { PaymentEditComponent } from './components/payment/payment-edit/payment-edit.component';
import { PaymentViewComponent } from './components/payment/payment-view/payment-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'member', component: MemberViewComponent },
  { path: 'add-member', component: MemberCreateComponent },
  { path: 'edit-member/:id', component: MemberEditComponent },
  { path: 'payment', component: PaymentViewComponent },
  { path: 'add-pament', component: PaymentCreateComponent },
  { path: 'edit-payment/:id', component: PaymentEditComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
