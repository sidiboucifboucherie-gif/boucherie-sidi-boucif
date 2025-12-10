import { LucideIcon } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: 'beef' | 'poultry' | 'lamb' | 'triperie';
  description: string;
  badges: string[];
  imageUrl: string;
  price: string;
}

export interface ServiceHighlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface OperatingHours {
  day: string;
  open: string;
  isClosed: boolean;
  isSunday?: boolean;
}

export enum Section {
  HOME = 'HOME',
  PRODUCTS = 'PRODUCTS',
  STORY = 'STORY',
  CONTACT = 'CONTACT',
  ASSISTANT = 'ASSISTANT'
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: string;
  servings: number;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  ingredients: string[];
  steps: string[];
}