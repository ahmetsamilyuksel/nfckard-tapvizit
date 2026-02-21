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
  whatsapp?: string;
  telegram?: string;
  vkontakte?: string;
  max?: string;
  tiktok?: string;
  wechat?: string;
  youtube?: string;
  facebook?: string;
  snapchat?: string;
  wildberries?: string;
  ozon?: string;
  yandexmarket?: string;
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
  cardType: "online" | "standard" | "premium" | "metal";
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
  whatsapp?: string | null;
  telegram?: string | null;
  vkontakte?: string | null;
  max?: string | null;
  tiktok?: string | null;
  wechat?: string | null;
  youtube?: string | null;
  facebook?: string | null;
  snapchat?: string | null;
  wildberries?: string | null;
  ozon?: string | null;
  yandexmarket?: string | null;
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
