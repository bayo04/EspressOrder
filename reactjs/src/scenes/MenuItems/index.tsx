import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import MenuItemStore from '../../stores/menuItemStore';
import { Modal, Dropdown, Menu, Button, Card, Row, Col, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import AppComponentBase from '../../components/AppComponentBase';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import CreateOrUpdateMenuItem from './components/createOrUpdateMenuItem'

export interface IMenuItemProps extends FormComponentProps {
  menuItemStore: MenuItemStore;
}

export interface IMenuItemState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  menuItemId: string;
}

const confirm = Modal.confirm;

@inject(Stores.MenuItemStore)
@observer
class MenuItem extends AppComponentBase<IMenuItemProps, IMenuItemState> {
  formRef: any;

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    menuItemId: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.menuItemStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount });
  }

  handleMenuItemChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields(async (err: any, values: any) => {
      if (err) {
        return;
      } else {
        if (this.state.menuItemId === '') {
          await this.props.menuItemStore.create(values);
        } else {
          await this.props.menuItemStore.update({ id: this.state.menuItemId, ...values });
        }
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form.resetFields();
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto<string>) {
    if (entityDto.id === '') {
      this.props.menuItemStore.createMenuItem();
    } else {
      await this.props.menuItemStore.getMenuItemForEdit(entityDto);
    }

    this.setState({ menuItemId: entityDto.id });
    this.Modal();

    this.formRef.props.form.setFieldsValue({ ...this.props.menuItemStore.menuItemEdit });
  }

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  delete(input: EntityDto<string>) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.menuItemStore.delete(input);
      },
      onCancel() {},
    });
  }

  render() {
    const { menuItems } = this.props.menuItemStore;
    const columns = [
      { title: L('Name'), dataIndex: 'name', key: 'name', render: (text: string) => <div>{text}</div> },
      { title: L('Description'), dataIndex: 'description', key: 'description', render: (text: string) => <div>{text}</div> },
      {
        title: L('Actions'),
        width: 150,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>{L('Edit')}</Menu.Item>
                  <Menu.Item onClick={() => this.delete({ id: item.id })}>{L('Delete')}</Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon="setting">
                {L('Actions')}
              </Button>
            </Dropdown>
          </div>
        ),
      },
    ];

    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 4, offset: 0 }}
            sm={{ span: 4, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
            xxl={{ span: 2, offset: 0 }}
          >
            {' '}
            <h2>{L('MenuItems')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 1, offset: 21 }}
            xl={{ span: 1, offset: 21 }}
            xxl={{ span: 1, offset: 21 }}
          >
            <Button type="primary" shape="circle" icon="plus" onClick={() => this.createOrUpdateModalOpen({ id: '' })} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <Table
              rowKey="id"
              size={'default'}
              bordered={true}
              pagination={{ pageSize: this.state.maxResultCount, total: menuItems === undefined ? 0 : menuItems.totalCount, defaultCurrent: 1 }}
              columns={columns}
              loading={menuItems === undefined ? true : false}
              dataSource={menuItems === undefined ? [] : menuItems.items}
              onChange={this.handleMenuItemChange}
            />
          </Col>
        </Row>

        <CreateOrUpdateMenuItem
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.menuItemId === '' ? 'edit' : 'create'}
          onOk={this.handleCreate}
          menuItemStore={this.props.menuItemStore}
        />
      </Card>
    );
  }
}

export default MenuItem;
