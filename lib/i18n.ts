import type { Language } from './types'

export const UI_STRINGS = {
  es: {
    outOfStock: 'Agotado',
    loading: 'Cargando...',
    save: 'Guardar',
    cancel: 'Cancelar',
    addProduct: 'Agregar producto',
    editProduct: 'Editar producto',
    name: 'Nombre',
    description: 'Descripción',
    price: 'Precio',
    category: 'Categoría',
    available: 'Disponible',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    email: 'Correo electrónico',
    password: 'Contraseña',
    loginError: 'Correo o contraseña incorrectos',
    uploadPhoto: 'Subir foto',
    noPhoto: 'Sin foto',
    saving: 'Guardando...',
  },
  en: {
    outOfStock: 'Out of stock',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    addProduct: 'Add product',
    editProduct: 'Edit product',
    name: 'Name',
    description: 'Description',
    price: 'Price',
    category: 'Category',
    available: 'Available',
    login: 'Sign in',
    logout: 'Sign out',
    email: 'Email',
    password: 'Password',
    loginError: 'Incorrect email or password',
    uploadPhoto: 'Upload photo',
    noPhoto: 'No photo',
    saving: 'Saving...',
  },
} as const

type UIKey = keyof typeof UI_STRINGS.es

export function getUIString(language: Language, key: UIKey): string {
  return UI_STRINGS[language][key]
}
