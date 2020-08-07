import * as React from 'react';
import TableStore from '../../../stores/tableStore';
import Form, { FormComponentProps } from 'antd/lib/form';
import { Modal, Input } from 'antd';
import { L } from '../../../lib/abpUtility';
import FormItem from 'antd/lib/form/FormItem';
import rules from './createOrUpdateTable.validation';

export interface ICreateOrUpdateTableProps extends FormComponentProps {
  tableStore: TableStore;
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onOk: () => void;
}

class CreateOrUpdateTable extends React.Component<ICreateOrUpdateTableProps> {
  state = {
    confirmDirty: false,
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        visible={this.props.visible}
        cancelText={L('Cancel')}
        okText={L('OK')}
        onCancel={this.props.onCancel}
        title={L('Role')}
        onOk={this.props.onOk}
      >
        <FormItem label={L('Index')} {...formItemLayout}>
          {getFieldDecorator('index', { rules: rules.index })(<Input />)}
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create<ICreateOrUpdateTableProps>()(CreateOrUpdateTable);
