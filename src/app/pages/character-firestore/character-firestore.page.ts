import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonAvatar, IonChip, IonText
} from '@ionic/angular/standalone';
import { CharacterService } from '../../core/services/character.service';
import { Character } from '../../core/models/character.model';
import { Observable } from 'rxjs';
import type { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-character-firestore',
  standalone: true,
  templateUrl: './character-firestore.page.html',
  styleUrls: ['./character-firestore.page.scss'],
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonAvatar, IonChip, IonText
  ],
})
export class CharacterFirestorePage {
  private readonly service = inject(CharacterService);

  characters$: Observable<Character[]> = this.service.getAliveMales();

  // Convierte number | Timestamp a Date para el pipe date
  toDate(value: number | Timestamp): Date {
    // si es Timestamp (tiene .toDate), lo convertimos
    const maybeTs = value as Timestamp & { toDate?: () => Date };
    return typeof maybeTs?.toDate === 'function' ? maybeTs.toDate() : new Date(value as number);
  }
}
