import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonAvatar, IonText,
  IonSegment, IonSegmentButton, IonSkeletonText
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
    IonList, IonItem, IonLabel, IonAvatar, IonText,
    IonSegment, IonSegmentButton, IonSkeletonText
  ],
})
export class CharacterFirestorePage {
  private readonly service = inject(CharacterService);

  mode: ViewMode = 'all';
  characters$: Observable<Character[]> = this.service.getAll(); // por defecto: todos desc

  onModeChange(ev: CustomEvent) {
    const value = (ev.detail as any).value as ViewMode;
    this.mode = value;
    this.characters$ = value === 'all'
      ? this.service.getAll()
      : this.service.getAliveMales();
  }

  statusClass(status: string | null | undefined): string {
    const s = (status || '').toLowerCase();
    if (s === 'alive') return 'status alive';
    if (s === 'dead')  return 'status dead';
    return 'status unknown';
  }

  toDate(value: string | number | Timestamp): Date | null {
    if (value && typeof value === 'object' && 'toDate' in value) return (value as Timestamp).toDate();
    if (typeof value === 'number') return new Date(value);
    if (typeof value === 'string') {
      const t = value.trim();
      const n = Number(t);
      if (!Number.isNaN(n) && /^\d+$/.test(t)) {
        const ms = t.length <= 10 ? n * 1000 : n;
        return new Date(ms);
      }
      const d = new Date(t);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }
}
