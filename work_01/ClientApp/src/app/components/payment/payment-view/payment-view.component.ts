import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from '../../../models/member';
import { Payment } from '../../../models/payment';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  payments: Payment[] = [];
  members: Member[] = [];

  dataSource: MatTableDataSource<Payment> = new MatTableDataSource(this.payments);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["Month", "Amount","memberId","actions"];

  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private dialog:MatDialog  ) { }
  getMemberName(id: number) {
    let m = this.members.find(m => m.memberId == id);
    return m ? m.name : '';
  }
  ngOnInit(): void {
    this.dataSvc.getPayment().subscribe(x => {
      this.payments = x;
      console.log(x);
      this.dataSource.data = this.payments;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSvc.getMember().
        subscribe(x => {
          this.members = x;
        }, err => {
          this.notifySvc.fail("Failed to load member data", "DISMISS");
        });
    })
  }
  confirmDelete(item: Payment) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deletePayment(Number(item.paymentId))
        .subscribe(x => {
          this.notifySvc.success("Data Deleted Successfully!!", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.paymentId != x.paymentId);
        }, err => {
          this.notifySvc.fail("Data delete fail!!!", "DISMISS");
        })
    })
  }

}
