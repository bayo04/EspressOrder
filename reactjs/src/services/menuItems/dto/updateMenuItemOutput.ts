import { GetAllCategoryOutput } from '../../categories/dto/getAllCategoryOutput';

export interface UpdateMenuItemOutput {
  name: string;
  description: string;
  meausreUnit: string;
  price: number;
  category: GetAllCategoryOutput;
  id: string;
  }