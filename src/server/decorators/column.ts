import { schema } from "../config";

export function column(target: any, key: string) {
    schema.table.meal.columns.push(key);
}

export function key(target: any, key: string) {
    schema.table.meal.key.push(key);
}

export function foreignKey(target: any, key: string) {
    schema.table.meal.foreignKey.push(key);
}