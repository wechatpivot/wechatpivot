import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class TextMessage extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="horizontal">
        <FormItem label="发送给">
          {getFieldDecorator('to')(<Input suffix={<Icon type="reload" />} placeholder="开发者的微信号" />)}
        </FormItem>
        <FormItem label="来自">
          {getFieldDecorator('from', )(<Input suffix={<Icon type="reload" />} placeholder="粉丝的 OpenId" />)}
        </FormItem>
        <FormItem label="时间">
          {getFieldDecorator('createTime', )(<Input suffix={<Icon type="reload" />} placeholder="消息创建时间（整型）" />)}
        </FormItem>
        <FormItem label="内容">
          {getFieldDecorator('content', )(<Input suffix={<Icon type="reload" />} placeholder="文本消息内容" />)}
        </FormItem>
        <FormItem label="MsgID">
          {getFieldDecorator('msgId', )(<Input suffix={<Icon type="reload" />} placeholder="消息id，64位整型" />)}
        </FormItem>
        <FormItem>
          <Button type="primay" htmlType="button" style={{ float: 'right' }}>校验 <Icon type="arrow-right" /></Button>
        </FormItem>
      </Form>
    );
  }
}

const Wrapped = Form.create()(TextMessage);

export default Wrapped;
