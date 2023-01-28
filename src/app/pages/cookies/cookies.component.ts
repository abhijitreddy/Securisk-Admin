import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {
  public Editor = ClassicEditor;
  public data: any = '';
  public id: any = '';

  constructor(private afs: AngularFirestore, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
      await this.getCookies();
  }

  async getCookies() {
    this.spinner.show();
    let res = await this.afs.collection('cookies').get().toPromise();
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
        this.afs.collection('cookies').doc(this.id).update(reqData).then(async res => {
          await this.getCookies();
          this.spinner.hide();
        }).catch(err => this.spinner.hide());
      } else {
        this.spinner.show();
        this.afs.collection('cookies').add(reqData).then(async res => {
          await this.getCookies();
          this.spinner.hide();
        }).catch(err => this.spinner.hide());
      }
    }
  }
}
