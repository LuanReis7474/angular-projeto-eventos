import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urlAPi } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http: HttpClient) { }

  editEvent(body: any, id?: any) {
    console.log(id);
    return this.http.put(urlAPi + `/events/${id}`, body);
  }

  registerEvent(body: any) {
    return this.http.post(urlAPi + `/events`, body);
  }

  getEventsByUserId(id: string): Observable<any> {
    return this.http.get(urlAPi + `/events/user/${id}`);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(urlAPi + `/events/${id}`);
  }

  getEvent(id: string): Observable<any> {
    return this.http.get(urlAPi + `/events/${id}`);
  }
}
