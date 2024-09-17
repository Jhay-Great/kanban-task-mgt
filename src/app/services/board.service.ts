import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard, } from '../model/board.interface';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

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
    return this.http.get<{boards: IBoard[]}>(this.localApi);
    
  }
}
