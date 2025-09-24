import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon,
  ],
})
export class HomePage {
  private router = inject(Router);

  photoDataUrl: string | null = null;

  async pickImage() {
    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl, 
        source: CameraSource.Prompt,          
        allowEditing: false
      });
      this.photoDataUrl = photo?.dataUrl ?? null;
    } catch (err) {
      this.photoDataUrl = null;
      console.warn('Imagen no seleccionada', err);
    }
  }

  async getLocation() {
    console.log('Prefiero ReactNative :D');
  }

  goTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
