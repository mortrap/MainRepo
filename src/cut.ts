import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Cut {
    id_code: string;
    old_price: number;
    price: number;
    none_cut: number;
    cut: number;
    whs: number[];
    constructor(id_code, old_price, price, none_cut, cut, whs) {

        this.id_code = id_code;
        this.old_price = old_price;
        this.price = price;
        this.none_cut = none_cut;
        this.cut = cut;

        this.whs = whs;
    }
};