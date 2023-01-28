import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-leadership-team',
  templateUrl: './leadership-team.component.html',
  styleUrls: ['./leadership-team.component.scss']
})
export class LeadershipTeamComponent implements OnInit {

  settings = {
    columns: {
      s_no: {
        title: 'S No.',
        filter: false,
      },
      name: {
        title: 'Name',
        filter: false
      },
      designation: {
        title: 'Designation',
        filter: false,
      },
      profile_img: {
        title: 'Profile Image',
        filter: false,
        type: 'custom',
        renderComponent: LeadershipImageComponent
      },
      actions: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        renderComponent: LeadershipActionComponent,
        onComponentInitFunction: (instance) => {
          instance.onEdit.subscribe(res => {
            console.log('Edit', res);
            this.addEditLabel = 'Edit';
            this.editId = res.id;
            console.log()
            this.memberForm.patchValue({
              name: res.name,
              designation: res.designation,
              // profile_img: res.image,
              fb_link: res.facebookLink,
              insta_link: res.instagramLink,
              youtube_link: res.youtubeLink,
              twitter_link: res.twitterLink
            });
            this.selectedProfileImg = res.image;
            this.memberForm.controls['profile_img'].disable();
          });
          instance.onDelete.subscribe(async res => await this.delete(res.id));
        }
      }
    },
    pager: {
      display: true,
      perPage: 10
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  public source: LocalDataSource = new LocalDataSource([]);
  public memberForm: FormGroup;
  public addEditLabel: string = 'Add New';
  public editId: string = '';
  public selectedProfileImg: any = {};
  
  constructor(private fb: FormBuilder, private afs: AngularFirestore, private storage: AngularFireStorage, private spinner: NgxSpinnerService) { 
    this.memberForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      profile_img: new FormControl('', [Validators.required]),
      fb_link: new FormControl(''),
      insta_link: new FormControl(''),
      twitter_link: new FormControl(''),
      youtube_link: new FormControl(''),
    })
  }

  async ngOnInit() {
    await this.getLeadershipTeam();
  }

  async getLeadershipTeam() {
    this.spinner.show();
    let res: any = await this.afs.collection('leadershipTeam').get().toPromise();
    this.spinner.hide();
    let leadershipTeam: any[] = [];
    for (let i in res.docs) {
      let { name, designation, description, image, facebookLink, twitterLink, instagramLink, youtubeLink } = res.docs[i].data();
      image = (image && image.charAt(0) == '{') ? JSON.parse(image) : {};
      let id: any = res.docs[i].id;
      leadershipTeam.push({
        s_no: +i+1,
        id,
        name,
        designation,
        description,
        image,
        profile_img: image.file,
        fb_link: facebookLink,
        insta_link: instagramLink,
        twitter_link: twitterLink,
        youtube_link: youtubeLink
      });
    }

    this.source = new LocalDataSource(leadershipTeam);
  }
  
  delete(id: any) {
    this.spinner.show();
    this.afs.collection('leadershipTeam').doc(id).delete().then(async res => {
      await this.getLeadershipTeam();
      this.spinner.hide();
    });
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'name',
        search: query
      },
      {
        field: 'designation',
        search: query
      },
      {
        field: 'description',
        search: query
      }
    ], false); 
  }

  uploadImg(event) {
    let file = event.target.files[0];
    let extension = file.name.split('.')[1];
    console.log(file);
    let data = new FormData();
    data.append(file.name, file);
    let ref = this.storage.ref(`leadershipTeam/${this.memberForm.controls['name'].value ? (this.memberForm.controls['name'].value + extension) : file.name}`);
    this.spinner.show();
    ref.put(file).then(async (uploadedData) => {
      const downloadUrl = await ref.getDownloadURL().toPromise();
      this.selectedProfileImg = {
        name: file.name,
        file: data,
        fileUrl: downloadUrl
      };
      this.memberForm.controls['profile_img'].disable();
      this.spinner.hide();
    }).catch(err => this.spinner.hide())
  }

  removeImg() {
    this.selectedProfileImg = {};
    this.memberForm.controls['profile_img'].disable();
  }

  previewImg() {
    let a = document.createElement('a');
    a.href = this.selectedProfileImg.fileUrl;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  onSubmit() {
    for (let i in this.memberForm.controls) {
      this.memberForm.controls[i].markAsTouched();
      this.memberForm.controls[i].updateValueAndValidity();
    }

    if (this.memberForm.valid) {
      let reqData = {
        name: this.memberForm.controls['name'].value,
        designation: this.memberForm.controls['designation'].value,
        description: this.memberForm.controls['description'].value,
        image: JSON.stringify(this.selectedProfileImg),
        facebookLink: this.memberForm.controls['fb_link'].value || '',
        instagramLink: this.memberForm.controls['insta_link'].value || '',
        twitterLink: this.memberForm.controls['twitter_link'].value || '',
        youtubeLink: this.memberForm.controls['youtube_link'].value || ''
      }
      if (this.editId) {
        this.spinner.show();
        this.afs.collection('leadershipTeam').doc(this.editId).update(reqData).then(async (res) => {
          this.memberForm.reset();
          this.editId = '';
          this.addEditLabel = 'Add New';
          this.selectedProfileImg = {};
          this.memberForm.controls['profile_img'].enable();
          await this.getLeadershipTeam();
          this.spinner.hide();
        });
      } else {
        this.spinner.show();
        this.afs.collection('leadershipTeam').add(reqData).then(async (res) => {
          this.memberForm.reset();
          this.selectedProfileImg = {};
          this.memberForm.controls['profile_img'].enable();
          await this.getLeadershipTeam();
          this.spinner.hide();
        });
      }
    }
  }
}


@Component({
  selector: 'app-leadership-action',
  template: `
    <div class="actions">
      <a (click)="edit()">Edit</a>
      <a (click)="delete()">Delete</a>
    </div>
  `,
  styles: ['.actions {display: flex;gap: 10px;justify-content: center;} .actions a {color: #8a3265;cursor: pointer;}']
})
export class LeadershipActionComponent implements OnInit {
  @Input() rowData: any;
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  ngOnInit(): void {
    
  }

  edit() {
    this.onEdit.emit(this.rowData);
  }

  delete() {
    this.onDelete.emit(this.rowData);
  }
}


@Component({
  selector: 'app-profile-image',
  template: `
    <div class="actions">
      <a [href]="rowData.image.fileUrl" target="_blank">{{rowData.image.name}}</a>
    </div>
  `,
  styles: ['.actions {display: flex;gap: 10px;justify-content: center;} .actions a {color: #8a3265;cursor: pointer;}']
})
export class LeadershipImageComponent implements OnInit {
  @Input() rowData: any;

  ngOnInit(): void {
    
  }
}