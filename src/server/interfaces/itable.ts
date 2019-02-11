export default interface ITable {
    toSelect(table: ITable): string;
    toAdd(): string;
    toUpdate(): string;
    toDelete(): string;
}