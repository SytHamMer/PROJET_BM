export class CategorieSpendings {
    id!: string;
    id_user!: string;
    name!: string;
    budget!: number;
  
    constructor(
      id: string,
      id_user: string,
      name: string,
      budget: number,
    ) {
      this.id = id;
      this.id_user = id_user;
      this.name = name;
      this.budget = budget;
    }
  
  }