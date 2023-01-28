import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public Editor = ClassicEditor;
  public footerForm: FormGroup;
  public id: any;
  constructor(private fb: FormBuilder, private afs: AngularFirestore, private spinner: NgxSpinnerService) { 
    this.footerForm = this.fb.group({
      data: new FormControl('', [Validators.required]),
      fb_link: new FormControl(''),
      twitter_link: new FormControl(''),
      youtube_link: new FormControl(''),
    })
  }

  async ngOnInit() {
    await this.getFooter();
  }

  async getFooter() {
    this.spinner.show();
    let res = await this.afs.collection('footer').get().toPromise();
    this.spinner.hide();
    let dataa: any = res.docs[0].data();
    let { data, facebookLink, twitterLink, youtubeLink } = dataa;
    this.id = res.docs[0].id;
    this.footerForm.patchValue({data, fb_link: facebookLink, twitter_link: twitterLink, youtube_link: youtubeLink})
  }

  onSubmit() {
    for (let i in this.footerForm.controls) {
      this.footerForm.controls[i].markAsDirty();
      this.footerForm.controls[i].updateValueAndValidity();
    }

    if (this.footerForm.valid) {
      let { data, fb_link, twitter_link, youtube_link } = this.footerForm.value;
      let reqData = {
        data,
        facebookLink: fb_link || '',
        twitterLink: twitter_link || '',
        youtubeLink: youtube_link || ''
      }

      if (this.id) {
        this.spinner.show();
        this.afs.collection('footer').doc(this.id).update(reqData).then(async res => {
          await this.getFooter();
          this.spinner.hide();
        }).catch(err => this.spinner.hide());
      } else {
        this.spinner.show();
        this.afs.collection('footer').add(reqData).then(async res => {
          await this.getFooter();
          this.spinner.hide();
        }).catch(err => this.spinner.hide());
      }
    }
  }
}
