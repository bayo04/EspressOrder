import { action, observable } from 'mobx';
import { CreateTableInput } from '../services/tables/dto/createTableInput';
import tableService from '../services/tables/tableService';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetAllTableOutput } from '../services/tables/dto/getAllTableOutput';
import { PagedFilterAndSortedRequest } from '../services/dto/pagedFilterAndSortedRequest';
import { CreateOrUpdateTableInput } from '../services/tables/dto/createOrUpdateTableInput';
import { EntityDto } from '../services/dto/entityDto';
import { UpdateTableInput } from '../services/tables/dto/updateTableInput';

class TableStore {
  @observable tables!: PagedResultDto<GetAllTableOutput>;
  @observable tableEdit!: CreateOrUpdateTableInput;

  @action
  async create(createTableInput: CreateTableInput) {
    await tableService.create(createTableInput);
  }

  @action
  async getAll(request: PagedFilterAndSortedRequest) {
    let result = await tableService.getAll(request);
    this.tables = result;
  }

  @action
  async createTable() {
    this.tableEdit = {
    };
  }

  @action
  async delete(entityDto: EntityDto<string>) {
    await tableService.delete(entityDto);
    this.tables.items = this.tables.items.filter((x: GetAllTableOutput) => x.id !== entityDto.id);
  }

  @action
  async getTableForEdit(entityDto: EntityDto<string>) {
    let result = await tableService.getTableForEdit(entityDto);
    this.tableEdit = result;
  }

  @action
  async update(updateTableInput: UpdateTableInput) {
    await tableService.update(updateTableInput);
    this.tables.items
      .filter((x: GetAllTableOutput) => x.id === updateTableInput.id)
      .map((x: GetAllTableOutput) => {
        return (x = updateTableInput);
      });
  }
}

export default TableStore;