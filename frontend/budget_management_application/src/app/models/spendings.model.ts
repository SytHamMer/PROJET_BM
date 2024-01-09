import { CategorieIncomes } from "./categorie_incomes.model";
import { CategorieSpendings } from "./categorie_spendings.model";

export class Spendings {
    id!: number;
    categorie!: CategorieSpendings;
    id_user!: number;
    name!: string;
    amount!: number;
    date?: Date;
  
    constructor(
        id: number,
        categorie: CategorieSpendings,
        id_user: number,
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