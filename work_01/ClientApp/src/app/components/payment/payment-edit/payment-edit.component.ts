import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../models/member';
import { Payment } from '../../../models/payment';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css']
})
export class PaymentEditComponent implements OnInit {
  members: Member[] = [];
  payment!: Payment;
  paymentForm: FormGroup = new FormGroup({
    pMonth: new FormControl(undefined, Validators.required),
    memberId: new FormControl('', Validators.required),
    pAmount: new FormControl('', Validators.required)
  });
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) { }
  get f() {
    return this.paymentForm.controls;
  }
  update() {
    if (this.paymentForm.invalid) return;
    this.payment.pMonth = this.f.pMonth.value;
    this.payment.pMonth = new Date(<string>this.datePipe.transform(this.payment.pMonth, "yyyy-MM-dd"));
    this.payment.memberId = this.f.memberId.value;
    this.payment.pAmount = this.f.pAmount.value;
    this.dataSvc.putPayment(this.payment)
      .subscribe(r => {
        this.notifySvc.success("Data Updated Successfully!!", "DISMISS");
        this.paymentForm.reset({});
        console.log(r);
      }, err => {
        this.notifySvc.fail("Failed to update data", "DISMISS");
      });
  }

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.dataSvc.getPaymentId(id)
      .subscribe(x => {
        this.payment = x;
        this.paymentForm.patchValue(this.payment);
      }, err => {
        this.notifySvc.fail("Failed to load payment data", "DISMISS");
      });
    this.dataSvc.getMember().
      subscribe(x => {
        this.members = x;
      }, err => {
        this.notifySvc.fail("Failed to load member data", "DISMISS");
      });
  }

}
