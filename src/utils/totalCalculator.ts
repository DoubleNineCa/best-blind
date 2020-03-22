import { Item } from "../entity/Item"
import { PartType } from "../entity/Part";

export const totalCal =
    async (items: Item[], discount: number, installation: number, installationDiscount: number) => {
        const total = items.reduce((accumulator, item) => {
            const singlePrice = item.partType === PartType.FABRIC ? (item.price - Math.floor(item.price * discount) / 100) : item.price * item.handrailLength;
            return accumulator + singlePrice;
        }, 0);
        return roundCal(total + installation - installationDiscount, 100);
    }

export const roundCal = (input: number, digits: number) => {
    return Math.round(input * digits) / digits
}

export const roundUp = (input: number, digits: number) => {
    return Math.ceil((Math.floor(input * digits * 10) / (digits * 10)) * digits) / 10;
}