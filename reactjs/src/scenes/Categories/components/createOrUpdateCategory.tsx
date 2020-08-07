import CategoryStore from '../../../stores/categoryStore';
import Form, { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { Modal, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import rules from './createOrUpdateCategory.validation';
import { L } from '../../../lib/abpUtility';

export interface ICreateOrUpdateCategoryProps extends FormComponentProps {
    categoryStore: CategoryStore;
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onOk: () => void;
  }
  
  class CreateOrUpdateCategory extends React.Component<ICreateOrUpdateCategoryProps> {
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
          <FormItem label={L('Name')} {...formItemLayout}>
            {getFieldDecorator('name', { rules: rules.name })(<Input />)}
          </FormItem>
          <FormItem label={L('Description')} {...formItemLayout}>
            {getFieldDecorator('description')(<Input />)}
          </FormItem>
        </Modal>
      );
    }
  }
  
  export default Form.create<ICreateOrUpdateCategoryProps>()(CreateOrUpdateCategory);