import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  

  constructor(private http:HttpClient) { }

  getPaises(continente:string):Observable<any[]>{ 
    if(continente == 'all'){
      return this.http.get('https://restcountries.com/v3.1/all?fields=name,flags') as Observable<any[]>;
    }
  
    return this.http.get(`https://restcountries.com/v3.1/region/${continente}`) as Observable<any[]>;
  }
}
