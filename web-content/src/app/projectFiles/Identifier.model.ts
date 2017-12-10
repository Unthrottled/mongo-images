export class Identifier {
    constructor(id: string = '') {
        this._id = id;
    }

    private _id: string;

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
}