import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../../models/member';
import { Payment } from '../../../models/payment';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent implements OnInit {
    payment: Payment = new Payment();
    paymentForm: FormGroup = new FormGroup({
    pMonth: new FormControl(undefined, Validators.required),
    memberId: new FormControl('', Validators.required),
    pAmount: new FormControl('', Validators.required)
  })
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private datePipe:DatePipe
  ) { }
  members: Member[] = [];
  get f() {
    return this.paymentForm.controls;
  }
  insert() {
    if (this.paymentForm.invalid) return;
    this.payment.pMonth = this.f.pMonth.value;
    this.payment.pMonth = new Date(<string>this.datePipe.transform(this.payment.pMonth, "yyyy-MM-dd"));
    this.payment.memberId = this.f.memberId.value;
    this.payment.pAmount = this.f.pAmount.value;
    this.dataSvc.postPayment(this.payment)
      .subscribe(r => {
        this.notifySvc.success("Succeeded to save data", "DISMISS");
        this.paymentForm.reset({});
        console.log(r);
      }, err => {
        this.notifySvc.fail("Failed to save data", "DISMISS");
      });
  }
  ngOnInit(): void {
    this.dataSvc.getMember().
      subscribe(x => {
        this.members = x;
      }, err => {
        this.notifySvc.fail("Failed to load member data", "DISMISS");
      });
  }

}
