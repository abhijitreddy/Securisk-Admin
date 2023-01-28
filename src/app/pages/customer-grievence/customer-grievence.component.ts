import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-customer-grievence',
  templateUrl: './customer-grievence.component.html',
  styleUrls: ['./customer-grievence.component.scss']
})
export class CustomerGrievenceComponent implements OnInit {
  public Editor = ClassicEditor;
  public data: any = '';
  public id: any = '';

  constructor(private afs: AngularFirestore, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
      await this.getCustomerGrievence();
  }

  async getCustomerGrievence() {
    this.spinner.show();
    let res = await this.afs.collection('customerGrievence').get().toPromise();
    this.spinner.hide();
    let data: any = res.docs[0].data();
    this.data = data.data;
    this.id = res.docs[0].id;
  }

  onSave() {
    if (this.data) {
      let reqData = {data: this.data};
      if (this.id) {
        this.spinner.show();
        this.afs.collection('customerGrievence').doc(this.id).update(reqData).then(async res => {
          await this.getCustomerGrievence();
          this.spinner.hide();
        }).catch(err => this.spinner.hide());
      } else {
        this.spinner.show();
        this.afs.collection('customerGrievence').add(reqData).then(async res => {
          await this.getCustomerGrievence();
          this.spinner.hide();
        }).catch(err => this.spinner.hide());
      }
    }
  }
}
