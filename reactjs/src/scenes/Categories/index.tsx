import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import CategoryStore from '../../stores/categoryStore';
import { Modal, Dropdown, Menu, Button, Card, Row, Col, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import AppComponentBase from '../../components/AppComponentBase';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import CreateOrUpdateCategory from './components/createOrUpdateCategory';

export interface ICategoryProps extends FormComponentProps {
  categoryStore: CategoryStore;
}

export interface ICategoryState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  categoryId: string;
}

const confirm = Modal.confirm;

@inject(Stores.CategoryStore)
@observer
class Category extends AppComponentBase<ICategoryProps, ICategoryState> {
  formRef: any;

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    categoryId: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.categoryStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount });
  }

  handleCategoryChange = (pagination: any) => {
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
        if (this.state.categoryId === '') {
          await this.props.categoryStore.create(values);
        } else {
          await this.props.categoryStore.update({ id: this.state.categoryId, ...values });
        }
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form.resetFields();
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto<string>) {
    if (entityDto.id === '') {
      this.props.categoryStore.createCategory();
    } else {
      await this.props.categoryStore.getCategoryForEdit(entityDto);
    }

    this.setState({ categoryId: entityDto.id });
    this.Modal();

    this.formRef.props.form.setFieldsValue({ ...this.props.categoryStore.categoryEdit });
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
        self.props.categoryStore.delete(input);
      },
      onCancel() {},
    });
  }

  render() {
    const { categories } = this.props.categoryStore;
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
            <h2>{L('Categories')}</h2>
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
              pagination={{ pageSize: this.state.maxResultCount, total: categories === undefined ? 0 : categories.totalCount, defaultCurrent: 1 }}
              columns={columns}
              loading={categories === undefined ? true : false}
              dataSource={categories === undefined ? [] : categories.items}
              onChange={this.handleCategoryChange}
            />
          </Col>
        </Row>

        <CreateOrUpdateCategory
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.categoryId === '' ? 'edit' : 'create'}
          onOk={this.handleCreate}
          categoryStore={this.props.categoryStore}
        />
      </Card>
    );
  }
}

export default Category;
