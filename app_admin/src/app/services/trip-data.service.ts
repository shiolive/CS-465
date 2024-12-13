import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { Authresponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }
  
  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = '${this.apiBaseUrl}trips/';

  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }
  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.tripUrl, formData);
  }
  getTrip(tripCode: string) : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl + '/' + tripCode);
  }
  updateTrip(formData: Trip) : Observable<Trip> {
    return this.http.put<Trip>(this.tripUrl + '/' + formData.code, formData);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<Authresponse> { 
    return this.makeAuthApiCall('login', user); 
  } 
  public register(user: User): Promise<Authresponse> { 
    return this.makeAuthApiCall('register', user); 
  } 
private async makeAuthApiCall(urlPath: string, user: User): Promise<Authresponse> { 
  const url: string = `${this.apiBaseUrl}/${urlPath}`; 
  return await lastValueFrom(
    this.http
      .post<Authresponse>('${this.apiBaseUrl}/${urlPath}', user)
  ).catch(this.handleError);
} 
}
