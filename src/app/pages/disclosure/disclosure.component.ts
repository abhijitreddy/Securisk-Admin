import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-disclosure',
  templateUrl: './disclosure.component.html',
  styleUrls: ['./disclosure.component.scss']
})
export class DisclosureComponent implements OnInit {
  public Editor = ClassicEditor;
  public data: any = '';
  public id: any = '';

  constructor(private afs: AngularFirestore, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  async ngOnInit() {
      await this.getDisclosure();
  }

  async getDisclosure() {
    this.spinner.show();
    let res = await this.afs.collection('disclosure').get().toPromise();
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
        this.afs.collection('disclosure').doc(this.id).update(reqData).then(async res => {
          await this.getDisclosure();
          this.spinner.hide();
          this.toastr.success('Disclosure updated successfully', 'Successful');
        }).catch(err => {
          this.spinner.hide();
          this.toastr.error(err.message, 'Error');
        });
      } else {
        this.spinner.show();
        this.afs.collection('disclosure').add(reqData).then(async res => {
          await this.getDisclosure();
          this.spinner.hide();
          this.toastr.success('Disclosure added successfully', 'Successful');
        }).catch(err => {
          this.spinner.hide();
          this.toastr.error(err.message, 'Error');
        });
      }
    }
  }
}
