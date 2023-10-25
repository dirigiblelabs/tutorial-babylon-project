import { dao as daoApi } from "@dirigible/db"

export interface Book {
    readonly id?: number;
    readonly isbn: string;
    readonly title: string;
    readonly publisher: string;
    readonly date: Date;
    readonly price: number;
}

export class BookRepository {

    private repository;

    constructor(dataSourceName?: string, logCtxName?: string) {
        this.repository = daoApi.create({
            table: "BABYLON_BOOKS",
            properties: [
                {
                    name: "id",
                    column: "BOOK_ID",
                    type: "INTEGER",
                    id: true,
                    required: true
                }, {
                    name: "isbn",
                    column: "BOOK_ISBN",
                    type: "CHAR",
                    id: false,
                    required: false
                }, {
                    name: "title",
                    column: "BOOK_TITLE",
                    type: "VARCHAR",
                    id: false,
                    required: false
                }, {
                    name: "publisher",
                    column: "BOOK_PUBLISHER",
                    type: "VARCHAR",
                    id: false,
                    required: false
                }, {
                    name: "date",
                    column: "BOOK_DATE",
                    type: "DATE",
                    id: false,
                    required: true
                }, {
                    name: "price",
                    column: "BOOK_PRICE",
                    type: "DOUBLE",
                    id: false,
                    required: true
                }]
        }, logCtxName, dataSourceName);
    }

    public list = (settings?): Book[] => {
        return this.repository.list(settings);
    };

    public findById = (id: number): Book | null => {
        return this.repository.find(id);
    };

    public create = (entity: Book): Book => {
        return this.repository.insert(entity);
    };

    public update = (entity: Book): Book => {
        return this.repository.update(entity);
    };

    public deleteById = (id: number): void => {
        this.repository.remove(id);
    };

    public count = (): number => {
        return this.repository.count();
    }
}