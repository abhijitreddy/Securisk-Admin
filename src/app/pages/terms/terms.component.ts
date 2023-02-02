import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  public Editor = ClassicEditor;
  public data: any = '';
  public id: any = '';

  constructor(private afs: AngularFirestore, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  async ngOnInit() {
      await this.getTerms();
  }

  async getTerms() {
    this.spinner.show();
    let res = await this.afs.collection('terms').get().toPromise();
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
        this.afs.collection('terms').doc(this.id).update(reqData).then(async res => {
          await this.getTerms();
          this.spinner.hide();
          this.toastr.success('Terms updated successfully', 'Successful');
        }).catch(err => {
          this.spinner.hide();
          this.toastr.error(err.message, 'Error');
        });
      } else {
        this.spinner.show();
        this.afs.collection('terms').add(reqData).then(async res => {
          await this.getTerms();
          this.spinner.hide();
          this.toastr.success('Terms added successfully', 'Successful');
        }).catch(err => {
          this.spinner.hide();
          this.toastr.error(err.message, 'Error');
        });
      }
    }
  }
}
