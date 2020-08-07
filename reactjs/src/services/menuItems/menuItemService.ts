import http from '../httpService';
import { EntityDto } from '../dto/entityDto';
import { CreateMenuItemInput } from './dto/createMenuItemInput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { CreateMenuItemOutput } from './dto/createMenuItemOutput';
import { PagedFilterAndSortedRequest } from '../dto/pagedFilterAndSortedRequest';
import { GetAllMenuItemOutput } from './dto/getAllMenuItemOutput';
import { GetMenuItemForEditOutput } from './dto/getMenuItemForEditOutput';
import { UpdateMenuItemOutput } from './dto/updateMenuItemOutput';
import { UpdateMenuItemInput } from './dto/updateMenuItemInput';

class MenuItemService {
    public async create(createMenuItemInput: CreateMenuItemInput): Promise<PagedResultDto<CreateMenuItemOutput>> {
      let result = await http.post('api/services/app/MenuItem/Create', createMenuItemInput);
      return result.data.result;
    }
  
    public async getAll(request: PagedFilterAndSortedRequest): Promise<PagedResultDto<GetAllMenuItemOutput>> {
      let result = await http.get('api/services/app/MenuItem/GetAll', { params: request });
      return result.data.result;
    }
  
    public async delete(entityDto: EntityDto<string>) {
      let result = await http.delete('api/services/app/MenuItem/Delete', { params: entityDto });
      return result.data;
    }
  
    public async getMenuItemForEdit(entityDto: EntityDto<string>): Promise<GetMenuItemForEditOutput> {
      let result = await http.get('api/services/app/MenuItem/Get', { params: entityDto });
      return result.data.result;
    }
  
    public async update(updateMenuItemInput: UpdateMenuItemInput): Promise<UpdateMenuItemOutput> {
      let result = await http.put('api/services/app/MenuItem/Update', updateMenuItemInput);
      return result.data.result as UpdateMenuItemOutput;
    }
  }
  
  export default new MenuItemService();
  