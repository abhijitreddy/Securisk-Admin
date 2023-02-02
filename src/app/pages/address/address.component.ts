import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  settings = {
    columns: {
      s_no: {
        title: 'S No.',
        filter: false,
      },
      branch_name: {
        title: 'Branch Name',
        filter: false
      },
      address_type: {
        title: 'Address Type',
        filter: false
      },
      email: {
        title: 'Email',
        filter: false
      },
      mobile: {
        title: 'Mobile Number',
        filter: false
      },
      address: {
        title: 'Address',
        filter: false
      },
      actions: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        renderComponent: AddressActionComponent,
        onComponentInitFunction: (instance) => {
          instance.onEdit.subscribe(res => {
            console.log('Edit', res);
            this.addEditLabel = 'Edit';
            this.editId = res.id;
            this.addressForm.patchValue({branchName: res.branch_name, branchAddress: res.address, addressType: res.address_type, email: res.email, mobile: res.mobile, whatsappNumber: res.whatsappNumber, maps_link: res.maps_link});
          });
          instance.onDelete.subscribe(res => this.delete(res.id));
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
  public addressForm: FormGroup; 
  public addEditLabel: string = 'Add New';
  public editId: string = '';
  public addresses: any[] = [];
  constructor(private fb: FormBuilder, private afs: AngularFirestore, private spinner: NgxSpinnerService, private toastr: ToastrService) { 
    this.addressForm = this.fb.group({
      branchName: new FormControl('', [Validators.required]),
      branchAddress: new FormControl('', [Validators.required]),
      addressType: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      whatsappNumber: new FormControl('', [Validators.required]),
      maps_link: new FormControl('', []),
    })
  }

  async ngOnInit() {
    await this.getAdresses();
    // this.source = new LocalDataSource(this.data);
  }

  async getAdresses() {
    this.spinner.show();
    const res = await this.afs.collection('Address').get().toPromise();
    this.spinner.hide();
    console.log(res.docs[0].data());
    let addresses: any[] = [];
    for (let i in res.docs) {
      let data: any = res.docs[i].data();
      let id: any = res.docs[i].id;
      addresses.push({
        s_no: +i+1,
        id,
        branch_name: data['location'],
        address: data['address'],
        address_type: data['addressType'],
        email: data['email'],
        mobile: data['mobile'],
        whatsappNumber: data['whatsappNumber'],
        maps_link: data['mapsLink']
      })
    }
    this.addresses = addresses;
    this.source = new LocalDataSource(addresses);
  }

  onSearch(query: string = '') {
    if (query != '') {
      this.source.setFilter([
        {
          field: 'branch_name',
          search: query
        },
        {
          field: 'address',
          search: query
        },
        {
          field: 'address_type',
          search: query
        },
        {
          field: 'email',
          search: query
        },
        {
          field: 'mobile',
          search: query
        },
      ], false); 
    } else {
      this.source.reset();
    }
  }

  delete(id: any) {
    this.spinner.show();
    this.afs.collection('Address').doc(id).delete().then(async res => {
      await this.getAdresses();
      this.spinner.hide();
      this.toastr.success('Address deleted successfully!', 'Successful');
    }).catch(err => this.toastr.error(err.message, 'Error'));
  }

  onSubmit() {
    console.log(this.addressForm.value);
    for (let i in this.addressForm.controls) {
      this.addressForm.controls[i].markAsTouched();
      this.addressForm.controls[i].updateValueAndValidity();
    }

    if (this.addressForm.valid) {
      let reqData = {
        address: this.addressForm.controls['branchAddress'].value,
        location: this.addressForm.controls['branchName'].value,
        addressType: this.addressForm.controls['addressType'].value,
        email: this.addressForm.controls['email'].value,
        mobile: this.addressForm.controls['mobile'].value,
        whatsappNumber: this.addressForm.controls['whatsappNumber'].value,
        mapsLink: this.addressForm.controls['maps_link'].value || '',
      }

      let index = this.addresses.findIndex((ele: any) => ele.address_type == reqData.addressType);
      if (index >= 0) this.editId = this.addresses[index].id;

      if (this.editId) {
        this.spinner.show();
        this.afs.collection('Address').doc(this.editId).update(reqData).then(async res => {
          this.editId = '';
          this.addEditLabel = 'Add New';
          this.addressForm.reset();
          await this.getAdresses();
          this.spinner.hide();
          this.toastr.success('Address updated successfully', 'Successful');
        }).catch(err => this.toastr.error(err.message, 'Error'));
      } else {
        this.spinner.show();
        this.afs.collection('Address').add(reqData).then(async res => {
          this.addressForm.reset();
          await this.getAdresses();
          this.spinner.hide();
          this.toastr.success('Address added successfully', 'Successful');
        }).catch(err => this.toastr.error(err.message, 'Error'));
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
export class AddressActionComponent implements OnInit {
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