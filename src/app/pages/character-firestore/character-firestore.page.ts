import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonAvatar, IonChip, IonText,
  IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';
import { CharacterService } from '../../core/services/character.service';
import { Character } from '../../core/models/character.model';
import { Observable } from 'rxjs';
import type { Timestamp } from 'firebase/firestore';

type ViewMode = 'all' | 'aliveMales';

@Component({
  selector: 'app-character-firestore',
  standalone: true,
  templateUrl: './character-firestore.page.html',
  styleUrls: ['./character-firestore.page.scss'],
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonAvatar, IonChip, IonText,
    IonSegment, IonSegmentButton
  ],
})
export class CharacterFirestorePage {
  private readonly service = inject(CharacterService);

  mode: ViewMode = 'all';
  /** ✅ Por defecto: TODOS */
  characters$: Observable<Character[]> = this.service.getAll();

  onModeChange(ev: CustomEvent) {
    const value = (ev.detail as any).value as ViewMode;
    this.mode = value;
    this.characters$ = value === 'all'
      ? this.service.getAll()
      : this.service.getAliveMales(); // usa gender/status en minúsculas
  }

  /** Convierte string | number | Timestamp a Date (o null si no parsea) */
  toDate(value: string | number | Timestamp): Date | null {
    // Timestamp de Firestore
    if (value && typeof value === 'object' && 'toDate' in value) {
      return (value as Timestamp).toDate();
    }
    // number epoch
    if (typeof value === 'number') return new Date(value);
    // string: puede ser epoch en texto o ISO
    if (typeof value === 'string') {
      const trimmed = value.trim();
      const asNum = Number(trimmed);
      if (!Number.isNaN(asNum) && trimmed.match(/^\d+$/)) {
        // epoch en ms o s: si parece de 10 dígitos, multiplícalo a ms
        const ms = trimmed.length <= 10 ? asNum * 1000 : asNum;
        return new Date(ms);
      }
      const d = new Date(trimmed);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }
}
