export interface Character {
  id: string;
  name: string;
  house?: string;
  image: string;
  species?: string;
  wizard?: boolean;
  ancestry?: string;
  actor?: string;
  wand?: {
    wood?: string;
    core?: string;
    length?: number;
  };
}