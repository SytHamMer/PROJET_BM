export class CategorieIncomes {
    id!: number;
    id_user!: number;
    name!: string;
  
    constructor(
      id: number,
      id_user: number,
      name: string,
    ) {
      this.id = id;
      this.id_user = id_user;
      this.name = name;
    }
  
  }