export interface Service {
  id: string;
  name: string;
  category: 'hair' | 'nails' | 'brows-lashes' | 'makeup' | 'skincare' | 'spa';
  categoryLabel: string;
  price: number;
  formattedPrice: string;
  duration: string;
  description: string;
  popular?: boolean;
}

export interface Master {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  bio: string;
  specialties: string[];
  rating: number;
  reviewsCount: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'hair' | 'nails' | 'makeup' | 'details';
  image: string;
  alt: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: 'coloring' | 'haircut' | 'brows' | 'makeup';
  categoryName: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  masterName: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  serviceId: string;
  masterId: string;
  date: string;
  time: string;
  comment: string;
  agreedToPolicy: boolean;
}
