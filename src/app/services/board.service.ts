import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard, ISubBoard } from '../model/board.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  // private localApi:string = '../../assets/data.json';
  private localApi:string = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  fetch () {
    return this.http.get<ISubBoard[]>(this.localApi);
  }
}
