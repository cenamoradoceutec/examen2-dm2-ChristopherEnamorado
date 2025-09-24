import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonInput, IonSelect, IonSelectOption, IonButton, IonAvatar, IonText,
  IonItemSliding, IonItemOptions, IonItemOption, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CharacterService } from '../../core/services/character.service';
import { Character, CharacterInput } from '../../core/models/character.model';
import type { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-character-crud',
  standalone: true,
  templateUrl: './character-crud.page.html',
  styleUrls: ['./character-crud.page.scss'],
  imports: [
    CommonModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
    IonInput, IonSelect, IonSelectOption, IonButton, IonAvatar, IonText,
    IonItemSliding, IonItemOptions, IonItemOption, IonGrid, IonRow, IonCol
  ],
})
export class CharacterCrudPage {
  private fb = inject(FormBuilder);
  private svc = inject(CharacterService);

  characters$: Observable<Character[]> = this.svc.list();

  createForm = this.fb.group({
    name: ['', Validators.required],
    gender: ['Male', Validators.required],
    status: ['Alive', Validators.required],
    species: ['Human'],
    image: [''],
  });

  editingId: string | null = null;
  editForm = this.fb.group({
    name: ['', Validators.required],
    gender: ['Male', Validators.required],
    status: ['Alive', Validators.required],
    species: ['Human'],
    image: [''],
  });

  async createOne() {
    if (this.createForm.invalid) return;
    const v = this.createForm.value;
    const now = new Date();
    const data: CharacterInput = {
      id: Math.floor(1000 + Math.random() * 900000),
      name: v.name!,
      gender: v.gender!,
      status: v.status!,
      species: v.species || '',
      image: v.image || 'https://via.placeholder.com/128x128.png?text=Char',
      type: '',
      url: 'https://example.com/character',
      created: now.toISOString(),
    };
    await this.svc.create(data);
    this.createForm.reset({
      name: '',
      gender: 'Male',
      status: 'Alive',
      species: 'Human',
      image: '',
    });
  }

  async seed3() {
    await this.svc.seed(3);
  }

  startEdit(item: Character) {
    this.editingId = item.firestoreId;
    this.editForm.reset({
      name: item.name,
      gender: item.gender,
      status: item.status,
      species: item.species ?? 'Human',
      image: item.image ?? '',
    });
  }

  async saveEdit() {
    if (!this.editingId || this.editForm.invalid) return;
    const v = this.editForm.value;
    await this.svc.update(this.editingId, {
      name: v.name!,
      gender: v.gender!,
      status: v.status!,
      species: v.species || '',
      image: v.image || '',
    });
    this.editingId = null;
  }

  cancelEdit() {
    this.editingId = null;
  }

  async remove(item: Character) {
    const ok = confirm(`¿Eliminar "${item.name}"?`);
    if (!ok) return;
    await this.svc.remove(item.firestoreId);
  }

  toDate(value: string | number | Timestamp): Date | null {
    if (value && typeof value === 'object' && 'toDate' in value) {
      return (value as Timestamp).toDate();
    }
    if (typeof value === 'number') return new Date(value);
    if (typeof value === 'string') {
      const trimmed = value.trim();
      const asNum = Number(trimmed);
      if (!Number.isNaN(asNum) && /^\d+$/.test(trimmed)) {
        const ms = trimmed.length <= 10 ? asNum * 1000 : asNum;
        return new Date(ms);
      }
      const d = new Date(trimmed);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }
}
