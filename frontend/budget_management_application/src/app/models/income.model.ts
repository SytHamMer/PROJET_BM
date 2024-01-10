import { CategorieIncomes } from "./categorie_incomes.model";

export class Income {
    id!: string;
    categorie!: CategorieIncomes;
    id_user!: string;
    name!: string;
    amount!: number;
    date?: Date;
  
    constructor(
        id: string,
        categorie: CategorieIncomes,
        id_user: string,
        name: string,
        amount: number,
        date: Date
    ) {
        this.id = id;
        this.categorie = categorie;
        this.id_user = id_user;
        this.name = name;
        this.amount = amount;
        this.date = date;
    }
  
  }