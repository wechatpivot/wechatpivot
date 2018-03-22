import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import TextMessage from '../components/message/TextMessage';


@connect(state => ({
  message: state.message
}))
export default class MessagePage extends Component {
  constructor(props) {
    super(props);

    this.select = this.select.bind(this);
    this.upload = this.upload.bind(this);
  }

  select(x, y) {
    this.props.dispatch({
      type: 'menu/select',
      payload: { x, y },
    });
  }

  upload() {
    this.props.dispatch({ type: 'menu/upload' });
  }

  render() {
    return (
      <Row>
        <Col span="8">
          <Tabs tabPosition="left">
            <TabPane tab="文字消息" key="text-message"><TextMessage /></TabPane>
            <TabPane tab="Tab 2" key="2" />
            <TabPane tab="Tab 3" key="3" />
          </Tabs>
        </Col>
        <Col span="7" offset="1">
        Hello 1
        </Col>
        <Col span="7" offset="1">
        Hello 2
        </Col>
      </Row>
    );
  }
}
