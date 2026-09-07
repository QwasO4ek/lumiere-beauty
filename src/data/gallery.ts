import { GalleryItem } from '../types';

export const galleryCategories = [
  { id: 'all', label: 'Все кадры' },
  { id: 'interior', label: 'Пространство' },
  { id: 'hair', label: 'Волосы' },
  { id: 'nails', label: 'Ногти' },
  { id: 'makeup', label: 'Макияж' },
  { id: 'details', label: 'Эстетика и уход' },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Светлое минималистичное пространство студии',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85',
    alt: 'Светлый интерьер салона красоты LUMIÈRE BEAUTY в Алматы',
  },
  {
    id: 'gal-2',
    title: 'Airtouch блонд с шелковым переливом',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    alt: 'Идеальное окрашивание блонд с мягкими переливами цвета',
  },
  {
    id: 'gal-3',
    title: 'Чистый эстетичный маникюр с микрофренчем',
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85',
    alt: 'Минималистичный чистый маникюр',
  },
  {
    id: 'gal-4',
    title: 'Glass Skin макияж с сияющим акцентом',
    category: 'makeup',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85',
    alt: 'Сияющий натуральный макияж',
  },
  {
    id: 'gal-5',
    title: 'Селективные сыворотки и масла Lebel & Davines',
    category: 'details',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=85',
    alt: 'Премиальная косметика для ухода',
  },
  {
    id: 'gal-6',
    title: 'Зона зеркал в естественном дневном свете',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
    alt: 'Просторная рабочая зона салона с естественным светом',
  },
  {
    id: 'gal-7',
    title: 'Воздушная укладка и текстурный объем',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85',
    alt: 'Текстурные локоны и естественная укладка',
  },
  {
    id: 'gal-8',
    title: 'Зона релаксации и чаепития',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=1200&q=85',
    alt: 'Зона ожидания и отдыха гостей',
  },
  {
    id: 'gal-9',
    title: 'Нюдовое покрытие с идеальным бликом',
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85',
    alt: 'Аккуратное нюдовое покрытие ногтей',
  },
];
