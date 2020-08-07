import http from '../httpService';
import { EntityDto } from '../dto/entityDto';
import { PagedFilterAndSortedRequest } from '../dto/pagedFilterAndSortedRequest';
import { PagedResultDto } from '../dto/pagedResultDto';
import { CreateCategoryInput } from './dto/createCategoryInput';
import { CreateCategoryOutput } from './dto/createCategoryOutput';
import { GetAllCategoryOutput } from './dto/getAllCategoryOutput';
import { GetCategoryForEditOutput } from './dto/getCategoryForEditOutput';
import { UpdateCategoryInput } from './dto/updateCategoryInput';
import { UpdateCategoryOutput } from './dto/updateCategoryOutput';

class CategoryService {
  public async create(createCategoryInput: CreateCategoryInput): Promise<PagedResultDto<CreateCategoryOutput>> {
    let result = await http.post('api/services/app/Category/Create', createCategoryInput);
    return result.data.result;
  }

  public async getAll(request: PagedFilterAndSortedRequest): Promise<PagedResultDto<GetAllCategoryOutput>> {
    let result = await http.get('api/services/app/Category/GetAll', { params: request });
    return result.data.result;
  }

  public async delete(entityDto: EntityDto<string>) {
    let result = await http.delete('api/services/app/Category/Delete', { params: entityDto });
    return result.data;
  }

  public async getCategoryForEdit(entityDto: EntityDto<string>): Promise<GetCategoryForEditOutput> {
    let result = await http.get('api/services/app/Category/Get', { params: entityDto });
    return result.data.result;
  }

  public async update(updateCategoryInput: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    let result = await http.put('api/services/app/Category/Update', updateCategoryInput);
    return result.data.result as UpdateCategoryOutput;
  }
}

export default new CategoryService();
