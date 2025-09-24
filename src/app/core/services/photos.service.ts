import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Photo } from '../models/photo.model';

@Injectable({ providedIn: 'root' })
export class PhotosService {
  private http = inject(HttpClient);
  private base = environment.jsonPlaceholderBase;

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.base}/photos`);
  }
}
