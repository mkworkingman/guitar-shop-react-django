export interface CatalogueLink {
  url: string
  text: string
}

export interface DiscountItemsInterface {
  __typename: string
  id: string
  name: string
  instType: string
  image: string
  strings: number
  frets: number
  brand: string
  orientation: string
  price: number
  discount: number
}