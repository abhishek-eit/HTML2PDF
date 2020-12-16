import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MainService {
  serverUrl: string = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  getData(id) {
    return this.http.post(`${this.serverUrl}getData`, { id });
  }
}
