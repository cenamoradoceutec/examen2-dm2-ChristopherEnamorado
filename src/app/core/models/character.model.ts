import type { Timestamp } from 'firebase/firestore';

export interface Character {
  /** id del documento de Firestore (si usas collectionData(...,{idField:'id'}) es string) */
  id: string;
  name: string;
  gender: string;    // <- minúsculas, como en tu colección
  status: string;    // <- minúsculas, como en tu colección
  image?: string;
  species?: string;
  /**
   * Puede venir como string (ISO o epoch en texto), number (epoch) o Timestamp de Firestore.
   */
  created: string | number | Timestamp;
}
