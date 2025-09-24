import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { PhotosService } from '../../core/services/photos.service';
import { Photo } from '../../core/models/photo.model';

@Component({
  selector: 'app-comme-page',
  standalone: true,
  templateUrl: './comme-page.page.html',
  styleUrls: ['./comme-page.page.scss'],
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonButton
  ],
})
export class CommePage {
  private photosSvc = inject(PhotosService);

  photos$: Observable<Photo[]> = this.photosSvc.getPhotos();

  
  concatTitleId(p: Photo): string {
    return `${p.title} - ${p.id}`;
  }


  reload() {
    this.photos$ = this.photosSvc.getPhotos();
  }
}
