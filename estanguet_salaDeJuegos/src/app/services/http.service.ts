import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface photos{
  src:any;
  medium:any;
}

export interface imagen{
  photos:photos[];
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) {

  }

  h = {
    headers: new HttpHeaders(
      {
        Authorization: environment.apiPexels
      }
    )
  };

  getImage(url:string):Observable<imagen>{
    return this.http.get(url, this.h) as Observable<imagen>; 

  }

}
