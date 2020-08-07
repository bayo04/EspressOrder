import { observable, action } from 'mobx';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetAllMenuItemOutput } from '../services/menuItems/dto/getAllMenuItemOutput';
import { CreateOrUpdateMenuItemInput } from '../services/menuItems/dto/createOrUpdateMenuItemInput';
import { CreateMenuItemInput } from '../services/menuItems/dto/createMenuItemInput';
import menuItemService from '../services/menuItems/menuItemService';
import { PagedFilterAndSortedRequest } from '../services/dto/pagedFilterAndSortedRequest';
import { EntityDto } from '../services/dto/entityDto';
import { UpdateMenuItemInput } from '../services/menuItems/dto/updateMenuItemInput';

class MenuItemStore {
  @observable menuItems!: PagedResultDto<GetAllMenuItemOutput>;
  @observable menuItemEdit!: CreateOrUpdateMenuItemInput;

  @action
  async create(createMenuItemInput: CreateMenuItemInput) {
    await menuItemService.create(createMenuItemInput);
  }

  @action
  async getAll(request: PagedFilterAndSortedRequest) {
    let result = await menuItemService.getAll(request);
    this.menuItems = result;
  }

  @action
  async createMenuItem() {
    this.menuItemEdit = {};
  }

  @action
  async delete(entityDto: EntityDto<string>) {
    await menuItemService.delete(entityDto);
    this.menuItems.items = this.menuItems.items.filter((x: GetAllMenuItemOutput) => {
      return x.id !== entityDto.id;
    });
  }

  @action
  async getMenuItemForEdit(entityDto: EntityDto<string>) {
    let result = await menuItemService.getMenuItemForEdit(entityDto);
    this.menuItemEdit = result;
  }

  @action
  async update(updateMenuItemInput: UpdateMenuItemInput) {
    await menuItemService.update(updateMenuItemInput);
    this.menuItems.items
      .filter((x: GetAllMenuItemOutput) => x.id === updateMenuItemInput.id)
      .map((x: GetAllMenuItemOutput) => {
        return (x = updateMenuItemInput);
      });
  }
}

export default MenuItemStore;
