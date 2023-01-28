import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public Editor = ClassicEditor;
  public data: any = '';
  public id: any = '';

  constructor(private afs: AngularFirestore, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
      await this.getAboutUs();
  }

  async getAboutUs() {
    this.spinner.show();
    let res = await this.afs.collection('aboutUs').get().toPromise();
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
        this.afs.collection('aboutUs').doc(this.id).update(reqData).then(async res => {
          await this.getAboutUs();
          this.spinner.hide();
        });
      } else {
        this.spinner.show();
        this.afs.collection('aboutUs').add(reqData).then(async res => {
          await this.getAboutUs();
          this.spinner.hide();
        });
      }
    }
  }
}
