import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Character, CharacterInput } from '../models/character.model';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private readonly injector = inject(EnvironmentInjector);
  private readonly firestore = inject(Firestore);
  private readonly colRef = collection(this.firestore, 'characters');

  private inCtx<T>(fn: () => T): T {
    return runInInjectionContext(this.injector, fn);
  }

  list(): Observable<Character[]> {
    return this.inCtx(() => {
      const q = query(this.colRef, orderBy('created', 'desc'));
      return collectionData(q, { idField: 'firestoreId' }) as Observable<Character[]>;
    });
  }

  async create(data: CharacterInput): Promise<string> {
    return this.inCtx(async () => {
      const ref = await addDoc(this.colRef, data);
      return ref.id;
    });
  }

  async update(firestoreId: string, patch: Partial<CharacterInput>): Promise<void> {
    return this.inCtx(async () => {
      const ref = doc(this.firestore, `characters/${firestoreId}`);
      await updateDoc(ref, patch as any);
    });
  }

  async remove(firestoreId: string): Promise<void> {
    return this.inCtx(async () => {
      const ref = doc(this.firestore, `characters/${firestoreId}`);
      await deleteDoc(ref);
    });
  }

  async createSample(): Promise<string> {
    const genders = ['Male', 'Female', 'Unknown'];
    const statuses = ['Alive', 'Dead', 'Unknown'];
    const species = ['Human', 'Alien', 'Robot', 'Animal', 'Mythological'];
    const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    const now = new Date();
    const sample: CharacterInput = {
      id: Math.floor(1000 + Math.random() * 900000),
      name: `Test ${now.getTime()}`,
      gender: rand(genders),
      status: rand(statuses),
      species: rand(species),
      type: '',
      image: 'https://via.placeholder.com/128x128.png?text=Char',
      url: 'https://example.com/character',
      created: now.toISOString(),
    };

    return this.create(sample);
  }

  async seed(count = 3): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.createSample();
    }
  }
  getAll() {
  return this.inCtx(() => {
    const q = query(this.colRef, orderBy('created', 'desc'));
    return collectionData(q, { idField: 'firestoreId' }) as Observable<Character[]>;
  });
}
 getAliveMales() {
  return this.inCtx(() => {
    // OJO: usamos 'gender' y 'status' en minúsculas porque así está tu colección
    const q = query(
      this.colRef,
      where('gender', '==', 'Male'),
      where('status', '==', 'Alive'),
      orderBy('created', 'desc')
    );
    return collectionData(q, { idField: 'firestoreId' }) as Observable<Character[]>;
  });
}
}
