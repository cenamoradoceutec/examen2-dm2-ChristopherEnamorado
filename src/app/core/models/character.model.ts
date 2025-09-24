import type { Timestamp } from 'firebase/firestore';

export type CharacterGender = 'Male' | 'Female' | 'Unknown' | string;
export type CharacterStatus = 'Alive' | 'Dead' | 'Unknown' | string;

/**
 * Estructura esperada en la colección "characters"
 * Campos recomendados: name, gender (o "Gender"), status (o "Status"), image, species, created
 * OJO: En Firestore los nombres son sensibles. Usamos las keys exactamente como pides:
 *  - "Gender"
 *  - "Status"
 *  - "created"
 */
export interface Character {
  id?: string;
  name: string;
  Gender: CharacterGender;   // campo exacto en Firestore
  Status: CharacterStatus;   // campo exacto en Firestore
  image?: string;
  species?: string;
  created: number | Timestamp; // epoch ms o Timestamp de Firestore
}
