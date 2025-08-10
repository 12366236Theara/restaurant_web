export type Dietary = 'vegan' | 'vegetarian' | 'gluten-free' | 'spicy' | 'halal'

export interface MenuChoice {
  code: string
  name: string
  price: number
}

export interface MenuOptionGroup {
  code: string
  name: string
  required: boolean
  multiselect: boolean
  choices: MenuChoice[]
}

export interface MenuItem {
  id: string
  name: string // Khmer or EN
  description?: string // optional (we’ll compose from ingredients if desired)
  price: number
  image?: string
  category: string // Khmer if available, else EN
  tags?: Dietary[]
  available?: boolean
  featured?: boolean
  options?: MenuOptionGroup[]
}
