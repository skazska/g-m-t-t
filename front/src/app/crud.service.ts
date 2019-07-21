import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PhoneModel} from "./phone-model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  crudUrl = 'http://localhost:3000/phone-book';

  constructor(
    private crud: HttpClient
  ) { }

  list() :Observable<PhoneModel[]> {
    return <Observable<PhoneModel[]>>this.crud.get(this.crudUrl);
  }

  new() :Observable<PhoneModel> {
    return new Observable(subscriber => {
      subscriber.next(new PhoneModel('', ''));
      subscriber.complete();
    });
  }

  add(record :PhoneModel) {
    return this.crud.post<PhoneModel>(this.crudUrl, record);
  }

  update(name, record :PhoneModel) {
    return this.crud.put<PhoneModel>(this.crudUrl + '/' + name, record);
  }

  get(name :string) :Observable<PhoneModel> {
    return <Observable<PhoneModel>>this.crud.get(this.crudUrl + '/' + name);
  }

  delete(name :string) {
    return this.crud.delete(this.crudUrl + '/' + name);
  }
}
