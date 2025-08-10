// Raw types from your API response (only the fields we need)
export interface ApiPaginationRes<T> {
  success: boolean
  data: T[]
  meta: {
    totalItems: number
    currentPage: number
    currentPageLength: number
    totalPages: number
  }
}

export interface ApiCategory {
  DESC_EN?: string
  DESC_KH?: string
  DESC_CN?: string
}

export interface ApiIngredientDetail {
  ITEM_DESC: string
  ITEM_TYPE: string
  ITEM_PRICE1: number
  ITEM_DCOST: number
}

export interface ApiIngredient {
  ITEM_CODE: string
  QTY: number
  TYPE: string
  INGREDIENTS_DETAIL: ApiIngredientDetail
}

export interface ApiChoiceIng {
  ING_CODE: string
  QTY: number
  INGREDIENTS: {
    ITEM_CODE: string
    ITEM_DESC: string
    ITEM_TYPE: string
    ITEM_DCOST: number
    ITEM_PRICE1: number
    ITEM_LOOKUP: string
  }
}

export interface ApiChoice {
  CHOICE_CODE: string
  CHOICE_NAME: string
  PRICE: number
  CHOICE_INGS?: ApiChoiceIng[]
}

export interface ApiGroupDetail {
  GROUP_CODE: string
  GROUP_NAME: string
  STATUS: string // "A" active
  IS_REQUIRED: boolean
  IS_MULTISELECT: boolean
  OPT_CHOICES?: ApiChoice[]
}

export interface ApiGroupOption {
  DB_CODE: string
  MENU_CODE: string
  GROUP_CODE: string
  GROUP_DETAIL?: ApiGroupDetail[]
}

export interface ApiMenuItem {
  DB_CODE: string
  ITEM_CODE: string
  ITEM_DESC: string // Khmer in your sample
  ITEM_PRICE1: number
  ITEM_TYPE: string // "I"
  ITEM_DCOST: number
  ITEM_STAT: string // "A" active
  ITEM_IMG?: string // "pos_uploads/menu/AA001/002.jpg"
  CAT_CODE?: string
  category?: ApiCategory
  CAT_DESC_EN?: string
  CAT_DESC_KH?: string
  CAT_DESC_CN?: string
  GROUP_OPTIONS?: ApiGroupOption[]
  INGREDIENTS?: ApiIngredient[]
}
