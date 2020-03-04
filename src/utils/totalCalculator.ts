import { Item } from "../entity/Item"

export const totalCal =
    async (items: Item[], discount: number, installation: number, installationDiscount: number) => {
        const total = items.reduce((accumulator, item) => {
            return accumulator + roundCal(item.price * (100 - discount) / 100);
        }, 0);
        return roundCal(total + installation - installationDiscount);
    }

export const roundCal = (input: number) => { return Math.round(input * 100) / 100 } 