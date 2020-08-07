import * as React from 'react';
import AppComponentBase from '../../components/AppComponentBase';
import { observer, inject } from 'mobx-react';
import { Card, Row, Col, Button, Table, Dropdown, Menu, Modal } from 'antd';
import { L } from '../../lib/abpUtility';
import { FormComponentProps } from 'antd/lib/form';
import TableStore from '../../stores/tableStore';
import Stores from '../../stores/storeIdentifier';
import CreateOrUpdateTable from './components/createOrUpdateTable';
import { EntityDto } from '../../services/dto/entityDto';

export interface ITableProps extends FormComponentProps {
  tableStore: TableStore;
}

export interface ITableState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  tableId: string;
}

const confirm = Modal.confirm;

@inject(Stores.TableStore)
@observer
class TableGrid extends AppComponentBase<ITableProps, ITableState> {
  formRef: any;

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    tableId: "",
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.tableStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount });
  }

  handleTableChange = (pagination: any) => {
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
        if (this.state.tableId === "") {
          await this.props.tableStore.create(values);
        } else {
          await this.props.tableStore.update({ id: this.state.tableId, ...values });
        }
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form.resetFields();
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto<string>) {
    if (entityDto.id === "") {
      this.props.tableStore.createTable();
    } else {
      await this.props.tableStore.getTableForEdit(entityDto);
    }

    this.setState({ tableId: entityDto.id });
    this.Modal();

    this.formRef.props.form.setFieldsValue({ ...this.props.tableStore.tableEdit });
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
        self.props.tableStore.delete(input);
      },
      onCancel() {},
    });
  }

  render() {
    const { tables } = this.props.tableStore;
    const columns = [
      { title: L('Index'), dataIndex: 'index', key: 'index', render: (text: string) => <div>{text}</div> },
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
            <h2>{L('Tables')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 1, offset: 21 }}
            xl={{ span: 1, offset: 21 }}
            xxl={{ span: 1, offset: 21 }}
          >
            <Button type="primary" shape="circle" icon="plus" onClick={() => this.createOrUpdateModalOpen({ id: "" })} />
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
              pagination={{ pageSize: this.state.maxResultCount, total: tables === undefined ? 0 : tables.totalCount, defaultCurrent: 1 }}
              columns={columns}
              loading={tables === undefined ? true : false}
              dataSource={tables === undefined ? [] : tables.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>

        <CreateOrUpdateTable
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.tableId === "" ? 'edit' : 'create'}
          onOk={this.handleCreate}
          tableStore={this.props.tableStore}
        />
      </Card>
    );
  }
}

export default TableGrid;
