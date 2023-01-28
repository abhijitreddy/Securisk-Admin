import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  settings = {
    columns: {
      s_no: {
        title: 'S No.',
        filter: false,
      },
      name: {
        title: 'Product Name',
        filter: false
      },
      description: {
        title: 'Description',
        filter: false
      },
      icon: {
        title: 'Icon',
        filter: false,
        type: 'custom',
        renderComponent: ProductImageComponent
      },
      sector: {
        title: 'Sector',
        filter: false
      },
      actions: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        renderComponent: ProductsActionComponent,
        onComponentInitFunction: (instance) => {
          instance.onEdit.subscribe(res => {
            console.log('Edit', res);
            this.addEditLabel = 'Edit';
            this.editId = res.id;
            this.productForm.patchValue({name: res.name, description: res.description, sector: res.sector_id});

            this.productIcon = res.icon;

            if (this.productIcon.name)
              this.productForm.controls['icon'].disable();
          });
          instance.onDelete.subscribe(res => console.log('Delete', res));
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

  public source!: LocalDataSource;
  public productForm: FormGroup;
  public addEditLabel: string = 'Add New';
  public editId: string = '';
  public sectors: any[] = [];
  public productIcon: any = {};

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private storage: AngularFireStorage, private spinner: NgxSpinnerService) { 
    this.productForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      icon: new FormControl('', [Validators.required]),
      sector: new FormControl('', [Validators.required]),
    })
  }

  async ngOnInit() {
    await this.getSectors();
    await this.getProducts();
  }

  async getSectors() {
    this.spinner.show();
    let res: any = await this.afs.collection('sectors').get().toPromise();
    this.spinner.hide();
    let sectors: any[] = [];
    for (let i in res.docs) {
      let data = res.docs[i].data();
      let id = res.docs[i].id;
      sectors.push({
        id,
        name: data.name
      });
    }
    this.sectors = sectors;
  }

  async getProducts() {
    this.spinner.show();
    let res = await this.afs.collection('products').get().toPromise();
    this.spinner.hide();
    let products: any[] = [];
    for (let i in res.docs) {
      let data: any = res.docs[i].data();
      data.icon = data.icon && data.icon.charAt(0) == '{' ? JSON.parse(data.icon) : {};
      let sectorData = await this.afs.doc(data.sector).get().toPromise();
      let sector: any = sectorData.data();
      let sectorId: any = sectorData.id;
      console.log(sector.name);
      let id = res.docs[i].id;
      products.push({
        s_no: +i+1,
        id,
        ...data,
        sector: sector.name,
        sector_id: sectorId
      });
    }

    this.source = new LocalDataSource(products);
  }

  async delete(id: any) {
    this.spinner.show();
    this.afs.collection('products').doc(id).delete().then(async res => {
      await this.getProducts();
      this.spinner.hide();
    })
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
      },
      {
        field: 'sector',
        search: query
      },
    ], false); 
  }

  removeImage() {
    this.productIcon = {}

    this.productForm.controls['icon'].enable();
  }

  previewImage() {
    let a = document.createElement('a');
    a.href = this.productIcon.fileUrl;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  uploadImg(event) {
    let file = event.target.files[0];
    let extension = file.name.split('.')[1];
    console.log(file);
    let ref = this.storage.ref(`products/${this.productForm.controls['name'].value ? (this.productForm.controls['name'].value.replace(' ', "") + extension) : file.name}`);
    this.spinner.show();
    ref.put(file).then(async (uploadedData) => {
      this.spinner.hide();
      const downloadUrl = await ref.getDownloadURL().toPromise();
      let self: any = this;
      this.productIcon = {
        name: file.name,
        fileUrl: downloadUrl
      };
      if (this.productIcon.name)
        this.productForm.controls['icon'].disable();
    }).catch(err => this.spinner.hide())
  }
  
  onSubmit() {
    for (let i in this.productForm.controls) {
      this.productForm.controls[i].markAsTouched();
      this.productForm.controls[i].updateValueAndValidity();
    }

    if (this.productForm.valid) {
      let reqData = {
        name: this.productForm.controls['name'].value,
        description: this.productForm.controls['description'].value,
        icon: JSON.stringify(this.productIcon),
        sector: this.afs.doc(`sectors/${this.productForm.controls['sector'].value}`).ref,
        sectorId: this.productForm.controls['sector'].value
      }
      console.log(reqData);
      if (this.editId) {
        this.spinner.show();
        this.afs.collection('products').doc(this.editId).update(reqData).then(async (res) => {
          this.spinner.hide();
          this.productForm.reset();
          this.editId = '';
          this.addEditLabel = 'Add New';
          this.productIcon = {};
          this.productForm.controls['icon'].enable();
          await this.getProducts();
        }).catch(err => this.spinner.hide());
      } else {
        this.spinner.hide();
        this.afs.collection('products').add(reqData).then(async (res) => {
          this.productForm.reset();
          this.productIcon = {};
          this.productForm.controls['icon'].enable();
          await this.getProducts();
          this.spinner.hide();
        }).catch(err => this.spinner.hide());
      }
    }
  }
}


@Component({
  selector: 'app-products-action',
  template: `
    <div class="actions">
      <a (click)="edit()">Edit</a>
      <a (click)="delete()">Delete</a>
    </div>
  `,
  styles: ['.actions {display: flex;gap: 10px;justify-content: center;} .actions a {color: #8a3265;cursor: pointer;}']
})
export class ProductsActionComponent implements OnInit {
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
  selector: 'app-product-image',
  template: `
    <div class="actions">
      <a [href]="value.fileUrl" target="_blank">{{value.name}}</a>
    </div>
  `,
  styles: ['.actions {display: flex;gap: 10px;justify-content: center;} .actions a {color: #8a3265;cursor: pointer;}']
})
export class ProductImageComponent implements OnInit {
  @Input() value: any = '';
  @Input() rowData: any;

  ngOnInit(): void {
    console.log('value from custom: ', this.value);
  }
}