import { GalleryItem } from '../types';

export const galleryCategories = [
  { id: 'all', label: 'Все фото' },
  { id: 'interior', label: 'Интерьер' },
  { id: 'hair', label: 'Волосы' },
  { id: 'nails', label: 'Ногти' },
  { id: 'makeup', label: 'Макияж' },
  { id: 'details', label: 'Детали и косметика' },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Зона отдыха и ресепшн салона',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Элегантный светлый интерьер зоны отдыха LUMIÈRE BEAUTY',
  },
  {
    id: 'gal-2',
    title: 'Airtouch окрашивание и укладка',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Сложное окрашивание блонд с плавными переходами',
  },
  {
    id: 'gal-3',
    title: 'Эстетичный нюдовый маникюр',
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=80',
    alt: 'Аккуратный нюдовый маникюр с глянцевым финишем',
  },
  {
    id: 'gal-4',
    title: 'Вечерний макияж с сияющей кожей',
    category: 'makeup',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Вечерний макияж глаз и сияющий тон лица',
  },
  {
    id: 'gal-5',
    title: 'Премиальная селективная косметика',
    category: 'details',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Флаконы органических сывороток и масел на мраморной полке',
  },
  {
    id: 'gal-6',
    title: 'Рабочее место стилиста с мягким светом',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Зеркала в полный рост и парикмахерские кресла премиум-класса',
  },
  {
    id: 'gal-7',
    title: 'Идеальные локоны и естественный объем',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Стрижка и объемная текстурная укладка волос',
  },
  {
    id: 'gal-8',
    title: 'Детали декора и живые цветы',
    category: 'details',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
    alt: 'Букет белых цветов и ароматические диффузоры в салоне',
  },
  {
    id: 'gal-9',
    title: 'Дизайн ногтей френч в стиле «микро»',
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80',
    alt: 'Минималистичный микрофренч на натуральных ногтях',
  },
];
