import { observable, action } from 'mobx';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetAllCategoryOutput } from '../services/categories/dto/getAllCategoryOutput';
import categoryService from '../services/categories/categoryService';
import { CreateCategoryInput } from '../services/categories/dto/createCategoryInput';
import { PagedFilterAndSortedRequest } from '../services/dto/pagedFilterAndSortedRequest';
import { EntityDto } from '../services/dto/entityDto';
import { UpdateCategoryInput } from '../services/categories/dto/updateCategoryInput';
import { CreateOrUpdateCategoryInput } from '../services/categories/dto/createOrUpdateCategoryInput';

class CategoryStore {
    @observable categories!: PagedResultDto<GetAllCategoryOutput>;
    @observable categoryEdit!: CreateOrUpdateCategoryInput;
    @observable categoriesDropDown!: GetAllCategoryOutput[];
  
    @action
    async create(createCategoryInput: CreateCategoryInput) {
      await categoryService.create(createCategoryInput);
    }
  
    @action
    async getAll(request: PagedFilterAndSortedRequest) {
      let result = await categoryService.getAll(request);
      this.categories = result;
      this.categoriesDropDown = result.items;
    }

    @action
    async createCategory() {
      this.categoryEdit = {
      };
    }
  
    @action
    async delete(entityDto: EntityDto<string>) {
      await categoryService.delete(entityDto);
      this.categories.items = this.categories.items.filter((x: GetAllCategoryOutput) => {
          return x.id !== entityDto.id;
      });
    }
  
    @action
    async getCategoryForEdit(entityDto: EntityDto<string>) {
      let result = await categoryService.getCategoryForEdit(entityDto);
      this.categoryEdit = result;
    }
  
    @action
    async update(updateCategoryInput: UpdateCategoryInput) {
      await categoryService.update(updateCategoryInput);
      this.categories.items
        .filter((x: GetAllCategoryOutput) => x.id === updateCategoryInput.id)
        .map((x: GetAllCategoryOutput) => {
          return (x = updateCategoryInput);
        });
    }
  }
  
  export default CategoryStore;