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
  private readonly colRef = collection(this.firestore, 'characters'); // <- nombre exacto

  /** ✅ Obtener TODOS los documentos, sin filtros ni orden */
  getAll(): Observable<Character[]> {
    return collectionData(this.colRef, { idField: 'id' }) as Observable<Character[]>;
  }

  /** (Opcional) Todos, ordenados por "created" descendente.
   *  OJO: si "created" mezcla tipos (string/number/Timestamp) Firestore ordena distinto.
   */
  getAllByCreatedDesc(): Observable<Character[]> {
    const q = query(this.colRef, orderBy('created', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Character[]>;
  }

  /** (Opcional) Filtro con campos en MINÚSCULAS: gender == 'Male', status == 'Alive' */
  getAliveMales(): Observable<Character[]> {
    const q = query(
      this.colRef,
      where('gender', '==', 'Male'),
      where('status', '==', 'Alive'),
      orderBy('created', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Character[]>;
  }
}
