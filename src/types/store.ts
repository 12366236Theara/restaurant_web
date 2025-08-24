export interface StoreConfig {
  dbcode: string // AA001
  name: string // display name
  logo?: string // relative or absolute URL
  primaryColor?: string // e.g. "#0f766e"
  secondaryColor?: string
  accentColor?: string
  currency?: string // e.g. "KHR" | "USD"
  layout?: 'grid' | 'list'
  showPrices?: boolean
}
