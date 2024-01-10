export class CategorieIncomes {
    id!: string;
    id_user!: string;
    name!: string;
  
    constructor(
      id: string,
      id_user: string,
      name: string,
    ) {
      this.id = id;
      this.id_user = id_user;
      this.name = name;
    }
  
  }