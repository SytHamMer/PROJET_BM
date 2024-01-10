import { CategorieIncomes } from "./categorie_incomes.model";
import { CategorieSpendings } from "./categorie_spendings.model";

export class Spendings {
    id!: string;
    categorie!: CategorieSpendings;
    id_user!: string;
    name!: string;
    amount!: number;
    date?: Date;
  
    constructor(
        id: string,
        categorie: CategorieSpendings,
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