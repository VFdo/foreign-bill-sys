import { Item } from "./item"

export type Bill = {
    _id: string
    date: Date
    items: Item[]
    total: number
    patientId: string
}