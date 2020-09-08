export interface Property {
  title: string;
  category: string;
  surface: string;
  rooms: string;
  description?: string; // ? car description pas obligatoire
  price: string;
  sold: boolean;
  photo?: string; // url de  la photo
}
