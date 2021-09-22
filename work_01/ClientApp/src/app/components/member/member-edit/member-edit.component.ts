import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../models/member';
import { Payment } from '../../../models/payment';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  picFile!: File;
  member: Member = new Member();
  memberForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    mAmount: new FormControl('', [Validators.required]),
    mPicture: new FormControl(undefined, [Validators.required])
  });
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private activatedRoute:ActivatedRoute
  ) { }
  get f() {
    return this.memberForm.controls;
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }

  update(): void {
    if (this.memberForm.invalid) return;
    console.log(this.memberForm.value);

    Object.assign(this.member, this.memberForm.value);
    console.log(this.member);
    this.member.name = this.f.name.value;
    this.member.phone = this.f.phone.value;
    this.member.mAmount = this.f.mAmount.value;

    this.dataSvc.putMember(this.member)
      .subscribe(m => {
        if (this.picFile != null && this.member.memberId) {
          this.upload(Number(this.member.memberId));
        }
        else {
          this.notifySvc.fail("Succeeded to save member data", "DISMISS");
        }
      }, err => {
        this.notifySvc.fail("Failed to save member data", "DISMISS");
      })
  }

  upload(id: number): void {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.dataSvc.upload(id, this.picFile)
        .subscribe(r => {
          this.member.mPicture = r.imagePath;
          this.notifySvc.success("Member data saved successfully!!", "DISMISS");
          this.memberForm.reset({});
        }, err => {
          this.notifySvc.fail("Failed to upload Image", "DISMISS");
        })
    })
    reader.readAsDataURL(this.picFile);
  }

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.dataSvc.getMemberById(id)
      .subscribe(x => {
        this.member = x;
        this.memberForm.patchValue(this.member);
      }, err => {
        this.notifySvc.fail("Failed to load member data", "DISMISS");
      });
    
  }
  
}
