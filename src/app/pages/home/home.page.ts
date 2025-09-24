import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonText
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
    IonButton, IonIcon, IonText
  ],
})
export class HomePage {
  private router = inject(Router);

  photoDataUrl: string | null = null;

  async pickImage() {
    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,  // fácil de mostrar en <img>
        source: CameraSource.Prompt,           // cámara o galería
        allowEditing: false
      });
      this.photoDataUrl = photo?.dataUrl ?? null;
    } catch (err) {
      // Usuario canceló o error → no mostramos nada
      this.photoDataUrl = null;
      console.warn('Imagen no seleccionada', err);
    }
  }

  // Opcional: acción de ubicación (solo demo)
  async getLocation() {
    console.log('Aquí podrías integrar Geolocation si lo necesitas');
  }

  goTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
