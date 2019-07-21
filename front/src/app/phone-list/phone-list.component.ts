import { Component, OnInit } from '@angular/core';
import {CrudService} from "../crud.service";
import {PhoneModel} from "../phone-model";

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.less']
})
export class PhoneListComponent implements OnInit {
  phones :PhoneModel[];
  error :Error;
  status :string = "data";
  loadingIndicator :boolean = false;

  uploadFile :boolean = false;
  uploader :FileUploader = new FileUploader({url: this.crudService.fileUrl, itemAlias: 'file'});

  constructor(
    private crudService: CrudService
  ) {
  }

  ngOnInit() {
    this.loadingIndicator = true;
    this.getList();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.uploadFile = false;
      console.log('FileUpload:uploaded:', item, status, response);
      this.getList();
    };
  }

  getList() :void {
    this.crudService.list().subscribe(
      phones => {
        this.phones = phones;
        this.loadingIndicator = false;
      },
      error => {
        this.status = 'error';
        this.error = error;
        this.loadingIndicator = false;
      }
    );
  }

  erase(event: Event, phone :PhoneModel) :void {
    event.stopPropagation();
    if (phone.remove) {
      this.crudService.delete(phone.name).subscribe(
        () => {
          this.getList();
        },
        error => {
          console.error(error);
        }
      )
    } else {
      phone.remove = true;
    }
  }

  download() :void {
    let blob = new Blob([JSON.stringify(this.phones)], { type: 'application/json'});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url, 'file', 'menubar=yes,toolbar=yes,location=yes,status=yes');
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
    }
  }

  upload() :void {
    if (!this.uploadFile) {
      this.uploadFile = true;
    } else {
      this.uploadFile = false;
    }
  }
}
