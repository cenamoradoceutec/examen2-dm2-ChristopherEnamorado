import type { Timestamp } from 'firebase/firestore';

export interface CharacterInput {
  id: number;
  name: string;
  gender: string;
  status: string;
  image?: string;
  species?: string;
  type?: string;
  url?: string;
  created: string | number | Timestamp;
}

export interface Character extends CharacterInput {
  firestoreId: string;
}
