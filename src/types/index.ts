export type CardTheme = "dark" | "light" | "gradient" | "modern" | "elegant" | "minimal" | "vibrant" | "professional";
export type CardLayout = "classic" | "modern" | "sidebar" | "minimal" | "bold" | "stylish" | "elegant" | "creative";

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
  backgroundColor?: string; // Background color for text area
  gradientIntensity?: number; // 0-100, controls gradient strength (default 50)
  photoUrl?: string;
  layout?: CardLayout;
  photoZoom?: number;
  photoPosition?: { x: number; y: number };
  originalPhotoUrl?: string; // Original uncropped photo for re-editing
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
