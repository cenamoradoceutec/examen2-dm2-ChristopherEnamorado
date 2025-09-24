import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  orderBy,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private readonly firestore = inject(Firestore);

  /**
   * Obtiene personajes con:
   *  Gender == 'Male'
   *  Status == 'Alive'
   *  Ordenados por created desc
   */
  getAliveMales(): Observable<Character[]> {
    const colRef = collection(this.firestore, 'characters');
    const q = query(
      colRef,
      where('Gender', '==', 'Male'),
      where('Status', '==', 'Alive'),
      orderBy('created', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Character[]>;
  }
}
