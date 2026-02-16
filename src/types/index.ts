export type CardTheme = "dark" | "light" | "gradient" | "modern" | "elegant" | "minimal" | "vibrant" | "professional";

export interface CardFormData {
  firstName: string;
  lastName: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  address?: string;
  bio?: string;
  theme: CardTheme;
  primaryColor: string;
  photoUrl?: string;
}

export interface OrderFormData {
  quantity: number;
  cardType: "standard" | "premium" | "metal";
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  notes?: string;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface CardWithOrder {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  title?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  address?: string | null;
  bio?: string | null;
  theme: string;
  primaryColor: string;
  photoUrl?: string | null;
  isActive: boolean;
  viewCount: number;
  createdAt: Date;
  order?: {
    id: string;
    quantity: number;
    cardType: string;
    status: string;
    totalPrice: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string | null;
    shippingAddress: string;
    notes?: string | null;
    createdAt: Date;
  } | null;
}
