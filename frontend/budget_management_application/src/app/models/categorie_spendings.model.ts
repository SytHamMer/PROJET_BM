export class CategorieSpendings {
    id!: number;
    id_user!: number;
    name!: string;
    budget!: number;
  
    constructor(
      id: number,
      id_user: number,
      name: string,
      budget: number,
    ) {
      this.id = id;
      this.id_user = id_user;
      this.name = name;
      this.budget = budget;
    }
  
  }