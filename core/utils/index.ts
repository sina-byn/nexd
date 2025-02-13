import { twMerge } from 'tailwind-merge';
import { clsx, type ClassArray } from 'clsx';

export const cn = (...inputs: ClassArray) => twMerge(clsx(inputs));

export const isEmptyObject = (obj: object) => Object.keys(obj).length === 0;

export const normalizeTitle = (title: string) => title.split(/-|_/).join(' ');
