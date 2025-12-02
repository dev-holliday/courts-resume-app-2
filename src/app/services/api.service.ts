import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface Item {
  id: number;
  name: string;
  // add other Django fields as needed
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Example: GET /api/items/
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/api/items/`);
  }

  // Example: POST /api/items/
  createItem(name: string): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/api/items/`, { name });
  }

  // Example: GET /api/hello/
getHello(): Observable<HelloResponse> {
  return this.http.get<HelloResponse>(`${this.baseUrl}/api/hello`);
}
}

export interface HelloResponse {
  message: {name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    client: string;
    period: string;
  }[];}
  
}
