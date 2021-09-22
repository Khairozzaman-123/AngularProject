import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../../models/member';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
  picFile!: File;
  member: Member = new Member();
  memberForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    mAmount: new FormControl('', [Validators.required]),
    mPicture: new FormControl(undefined, [Validators.required])
  });
  get f() {
    return this.memberForm.controls;
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService
  ) { }
  insert(): void {
    if (this.memberForm.invalid) return;
    console.log(this.memberForm.value);

    Object.assign(this.member, this.memberForm.value);
    console.log(this.member);
    this.member.mPicture = 'no-pic.png';
    this.member.name = this.f.name.value;
    this.member.phone = this.f.phone.value;
    this.member.mAmount = this.f.mAmount.value;
    this.dataSvc.postMember(this.member)
      .subscribe(m => {
        this.upload(Number(m.memberId));
      }, err => {
        this.notifySvc.fail("Failed to save member data", "DISMISS");
      })
  }
  upload(id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.dataSvc.upload(id,this.picFile)
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
  }

}
