import { Item } from "./item"

export type Procedure = {
    _id: string
    name: string
    items: Item[]
}