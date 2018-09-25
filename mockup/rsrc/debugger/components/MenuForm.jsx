import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class MenuForm extends Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
  }

  save() {
    const { x, y } = this.props.dataSource;
    const command = { ...this.props.form.getFieldsValue(), x, y };
    this.props.save(command);
  }

  render() {
    const form = this.props.dataSource;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 14 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <Form>
        <FormItem {...formItemLayout} label="Type">
          {getFieldDecorator('type', { initialValue: form.type })(
            <Select>
              <Option value="group">有子菜单</Option>
              <Option value="view">普通网页</Option>
              <Option value="view/snsapi_base">获取用户 OpenId 网页</Option>
              <Option value="view/snsapi_userinfo">获取用户信息网页</Option>
            </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label="Name">
          {getFieldDecorator('name', { initialValue: form.name })(<Input autoComplete="off" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Url">
          {getFieldDecorator('url', { initialValue: form.url })(<Input autoComplete="off" />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" size="default" htmlType="button" onClick={this.save}>更新</Button>
        </FormItem>
      </Form>
    );
  }
}

const Wrapped = Form.create()(MenuForm);

export default Wrapped;

// template: (/* .vue */
//   <form class="form-horizontal" v-if="x >= 0">
//     <div class="form-group">
//       <div class="col-sm-4 col-sm-offset-2">
//         <button type="button" class="btn btn-default" @click="save"><i class="glyphicon glyphicon-chevron-left"></i> 更新</button>
//     </div>
//     <div class="col-sm-6 text-right">
//       <button type="button" class="btn btn-danger" v-if="canRemove" @click="remove"><i class="glyphicon glyphicon-remove"></i></button>
//     <button type="button" class="btn btn-default" v-if="canMoveUp" @click="moveUp"><i class="glyphicon glyphicon-arrow-up"></i></button>
//   <button type="button" class="btn btn-default" v-if="canMoveDown" @click="moveDown" > <i class="glyphicon glyphicon-arrow-down"></i></button >
//     <button type="button" class="btn btn-default" v-if="canMoveLeft" @click="moveLeft" > <i class="glyphicon glyphicon-arrow-left"></i></button >
//       <button type="button" class="btn btn-default" v-if="canMoveRight" @click="moveRight" > <i class="glyphicon glyphicon-arrow-right"></i></button >
//       </div >
//     </div >
//   </form >
//   )/* .vue */,
