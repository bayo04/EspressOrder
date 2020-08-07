import MenuItemStore from '../../../stores/menuItemStore';
import Form, { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { Modal, Input, InputNumber, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import rules from './createOrUpdateMenuItem.validation';
import { L } from '../../../lib/abpUtility';
// import { GetAllCategoryOutput } from '../../../services/categories/dto/getAllCategoryOutput';

export interface ICreateOrUpdateMenuItemProps extends FormComponentProps {
  menuItemStore: MenuItemStore;
  // categories: GetAllCategoryOutput[];
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onOk: () => void;
}

class CreateOrUpdateMenuItem extends React.Component<ICreateOrUpdateMenuItemProps> {
  state = {
    confirmDirty: false,
  };

  render() {
    let options;
    if(this.props.menuItemStore.menuItems){
      console.log("aaa");
      options = this.props.menuItemStore.menuItems.items.map((category) => {
        return <Select.Option key={category.id}>aaa</Select.Option>;
      })
    }
    console.log("bbb");

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
        title={L('MenuItem')}
        onOk={this.props.onOk}
      >
        <FormItem label={L('Name')} {...formItemLayout}>
          {getFieldDecorator('name', { rules: rules.name })(<Input />)}
        </FormItem>
        <FormItem label={L('Description')} {...formItemLayout}>
          {getFieldDecorator('description')(<Input />)}
        </FormItem>
        <FormItem label={L('MeasureUnit')} {...formItemLayout}>
          {getFieldDecorator('measureUnit', { rules: rules.measureUnit })(<Input />)}
        </FormItem>
        <FormItem label={L('Price')} {...formItemLayout}>
          {getFieldDecorator('price', { rules: rules.price })(<InputNumber />)}
        </FormItem>
        <FormItem label={L('Category')} {...formItemLayout}>
          {getFieldDecorator('categoryId', { rules: rules.category })(
            <Select>
              {options}
            </Select>
          )}
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create<ICreateOrUpdateMenuItemProps>()(CreateOrUpdateMenuItem);
