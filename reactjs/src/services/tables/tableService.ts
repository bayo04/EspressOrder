import http from '../httpService';
import { CreateTableInput } from './dto/createTableInput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { CreateTableOutput } from './dto/createTableOutput';
import { GetAllTableOutput } from './dto/getAllTableOutput';
import { PagedFilterAndSortedRequest } from '../dto/pagedFilterAndSortedRequest';
import { EntityDto } from '../dto/entityDto';
import { GetTableForEditOutput } from './dto/getTableForEditOutput';
import { UpdateTableInput } from './dto/updateTableInput';
import { UpdateTableOutput } from './dto/updateTableOutput';

class TableService {
  public async create(createTableInput: CreateTableInput): Promise<PagedResultDto<CreateTableOutput>> {
    let result = await http.post('api/services/app/Table/Create', createTableInput);
    return result.data.result;
  }

  public async getAll(request: PagedFilterAndSortedRequest): Promise<PagedResultDto<GetAllTableOutput>> {
    let result = await http.get('api/services/app/Table/GetAll', { params: request });
    return result.data.result;
  }

  public async delete(entityDto: EntityDto<string>) {
    let result = await http.delete('api/services/app/Table/Delete', { params: entityDto });
    return result.data;
  }

  public async getTableForEdit(entityDto: EntityDto<string>): Promise<GetTableForEditOutput> {
    let result = await http.get('api/services/app/Table/Get', { params: entityDto });
    return result.data.result;
  }

  public async update(updateTableInput: UpdateTableInput): Promise<UpdateTableOutput> {
    let result = await http.put('api/services/app/Table/Update', updateTableInput);
    return result.data.result as UpdateTableOutput;
  }
}

export default new TableService();