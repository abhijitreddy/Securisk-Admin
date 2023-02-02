import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {

  settings = {
    columns: {
      s_no: {
        title: 'S No.',
        filter: false,
      },
      name: {
        title: 'Sector Name',
        filter: false
      },
      description: {
        title: 'Sector Description',
        filter: false
      },
      image: {
        title: 'Image',
        filter: false,
        type: 'custom',
        renderComponent: SectorsImageComponent
      },
      icon: {
        title: 'Icon',
        filter: false,
        type: 'custom',
        renderComponent: SectorsImageComponent
      },
      bannerImage: {
        title: 'Banner Image',
        filter: false,
        type: 'custom',
        renderComponent: SectorsImageComponent
      },
      actions: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        renderComponent: SectorsActionComponent,
        onComponentInitFunction: (instance) => {
          instance.onEdit.subscribe(res => {
            console.log('Edit', res);
            this.addEditLabel = 'Edit';
            this.editId = res.id;
            this.sectorForm.patchValue({
              name: res.name,
              description: res.description
            });

            this.selectedImage = res.image;
            this.selectedIcon = res.icon;
            this.selectedBannerImage = res.bannerImage;

            if (this.selectedImage && this.selectedImage.name) this.sectorForm.controls['image'].disable();
            if (this.selectedIcon && this.selectedIcon.name) this.sectorForm.controls['icon'].disable();
            if (this.selectedBannerImage && this.selectedBannerImage.name) this.sectorForm.controls['bannerImage'].disable();
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
  public sectorForm: FormGroup;
  public addEditLabel: string = 'Add New';
  public editId: string = '';
  public selectedImage: any = {};
  public selectedIcon: any = {};
  public selectedBannerImage: any = {};

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private storage: AngularFireStorage, private spinner: NgxSpinnerService, private toastr: ToastrService) { 
    this.sectorForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      icon: new FormControl('', [Validators.required]),
      bannerImage: new FormControl('', [Validators.required]),
    })
  }

  async ngOnInit() {
    await this.getSectors();
  }

  async getSectors() {
    this.spinner.show();
    let res: any = await this.afs.collection('sectors').get().toPromise();
    this.spinner.hide();
    let sectors: any[] = [];
    for (let i in res.docs) {
      let data = res.docs[i].data();
      data.image = data.image && data.image.charAt(0) == '{' ? JSON.parse(data.image) : {};
      data.icon = data.icon && data.icon.charAt(0) == '{' ? JSON.parse(data.icon) : {};
      data.bannerImage = data.bannerImage && data.bannerImage.charAt(0) == '{' ? JSON.parse(data.bannerImage) : {};
      let id = res.docs[i].id;
      sectors.push({
        s_no: +i+1,
        id,
        ...data
      });
    }

    this.source = new LocalDataSource(sectors);
  }
  
  delete(id: any) {
    this.spinner.show();
    this.afs.collection('sectors').doc(id).delete().then(async res => {
      await this.getSectors();
      this.spinner.hide();
      this.toastr.success('Sector deleted successfully', 'Successful');
    }).catch(err => {
      this.spinner.hide();
      this.toastr.error(err.message, 'Error');
    });
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'name',
        search: query
      },
      {
        field: 'description',
        search: query
      }
    ], false); 
  }

  removeImage(name: string) {
    let self = this;
    self[name] = {};

    let controlName = name.split('selected')[1].slice(0, 1).toLowerCase() + name.split('selected')[1].slice(1);
    this.sectorForm.controls[controlName].enable();
  }

  previewImage(name: string) {
    let self: any = this;
    let a = document.createElement('a');
    a.href = self[name].fileUrl;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  uploadImg(name: string, event: any) {
    let controlName = name.split('selected')[1].slice(0, 1).toLowerCase() + name.split('selected')[1].slice(1);
    let file = event.target.files[0];
    let extension = file.name.split('.')[1];
    console.log(file);
    let ref = this.storage.ref(`sectors/${this.sectorForm.controls['name'].value ? (this.sectorForm.controls['name'].value.replace(' ', "") + name.split('selected')[1] + '.' + extension) : file.name}`);
    this.spinner.show();
    ref.put(file).then(async (uploadedData) => {
      this.spinner.hide();
      const downloadUrl = await ref.getDownloadURL().toPromise();
      let self: any = this;
      self[name] = {
        name: file.name,
        fileUrl: downloadUrl
      };
      this.sectorForm.controls[controlName].disable();
      this.toastr.success('Image uploaded successfully', 'Successful');
    }).catch(err => {
      this.spinner.hide();
      this.toastr.error(err.message, 'Error');
      this.sectorForm.controls[controlName].reset();
    })
  }

  onSubmit() {
    for (let i in this.sectorForm.controls) {
      this.sectorForm.controls[i].markAsTouched();
      this.sectorForm.controls[i].updateValueAndValidity();
    }

    if (this.sectorForm.valid) {
      let reqData = {
        name: this.sectorForm.controls['name'].value,
        description: this.sectorForm.controls['description'].value,
        image: JSON.stringify(this.selectedImage),
        icon: JSON.stringify(this.selectedIcon),
        bannerImage: JSON.stringify(this.selectedBannerImage),
      }
      if (this.editId) {
        this.spinner.show();
        this.afs.collection('sectors').doc(this.editId).update(reqData).then(async (res) => {
          this.sectorForm.reset();
          this.editId = '';
          this.addEditLabel = 'Add New';
          this.selectedImage = {};
          this.selectedIcon = {};
          this.selectedBannerImage = {};
          this.sectorForm.controls['image'].enable();
          this.sectorForm.controls['icon'].enable();
          this.sectorForm.controls['bannerImage'].enable();
          await this.getSectors();
          this.spinner.hide();
          this.toastr.success('Sector updated successfully', 'Successful');
        }).catch(err => {
          this.spinner.hide();
          this.toastr.error(err.message, 'Error');
        });
      } else {
        this.spinner.show();
        this.afs.collection('sectors').add(reqData).then(async (res) => {
          this.sectorForm.reset();
          this.selectedImage = {};
          this.selectedIcon = {};
          this.selectedBannerImage = {};
          this.sectorForm.controls['image'].enable();
          this.sectorForm.controls['icon'].enable();
          this.sectorForm.controls['bannerImage'].enable();
          await this.getSectors();
          this.spinner.hide();
          this.toastr.success('Sector added successfully', 'Successful');
        }).catch(err => {
          this.spinner.hide();
          this.toastr.error(err.message, 'Error');
        });
      }
    }
  }
}


@Component({
  selector: 'app-sector-action',
  template: `
    <div class="actions">
      <a (click)="edit()">Edit</a>
      <a (click)="delete()">Delete</a>
    </div>
  `,
  styles: ['.actions {display: flex;gap: 10px;justify-content: center;} .actions a {color: #8a3265;cursor: pointer;}']
})
export class SectorsActionComponent implements OnInit {
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
  selector: 'app-sector-image',
  template: `
    <div class="actions">
      <a [href]="value.fileUrl" target="_blank">{{value.name}}</a>
    </div>
  `,
  styles: ['.actions {display: flex;gap: 10px;justify-content: center;} .actions a {color: #8a3265;cursor: pointer;}']
})
export class SectorsImageComponent implements OnInit {
  @Input() value: any = '';
  @Input() rowData: any;

  ngOnInit(): void {
    console.log('value from custom: ', this.value);
  }
}