export interface Cake {
  id: number;
  name: string;
  flavour: string;
  size: string;
  price: string | number;
  description: string;
  image: string;
  image_url?: string;
  available: boolean;
}

export interface CartItem {
  id: string;
  cake: Cake;
  quantity: number;
  customization?: CakeCustomization;
}

export interface CakeCustomization {
  message: string;
  egg_version: boolean;
  toppings: string[];
  shape: string;
}

export interface Customer {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_no: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export type Page = 'home' | 'menu' | 'about' | 'contact' | 'cart';
