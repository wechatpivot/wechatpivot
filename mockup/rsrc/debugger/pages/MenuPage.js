import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Button, Modal } from 'antd';
import MenuGroup from '../components/MenuGroup';
import MenuForm from '../components/MenuForm';
const { confirm } = Modal;


@connect(state => ({
  menu: state.menu
}))
export default class MenuPage extends Component {
  constructor(props) {
    super(props);

    this.select = this.select.bind(this);
    this.update = this.update.bind(this);
    this.upload = this.upload.bind(this);
  }

  select(x, y) {
    this.props.dispatch({
      type: 'menu/select',
      payload: { x, y },
    });
  }

  update(command) {
    this.props.dispatch({ type: 'menu/update', payload: command });
  }

  upload() {
    confirm({
      title: '',
      content: '确认上传新的菜单配置？',
      onOk: () => {
        this.props.dispatch({ type: 'menu/upload' }).then(() => this.props.dispatch({ type: 'menu/download' }) );
      },
    });
  }

  render() {
    const { menus, sx, sy, form } = this.props.menu;

    return (
      <div>
        <Row>
          <Col span="4">
            <MenuGroup dataSource={menus.filter(m => m.x === 1)} sx={sx} sy={sy} select={this.select} />
          </Col>
          <Col span="4" offset="1">
            <MenuGroup dataSource={menus.filter(m => m.x === 2)} sx={sx} sy={sy} select={this.select} />
          </Col>
          <Col span="4" offset="1">
            <MenuGroup dataSource={menus.filter(m => m.x === 3)} sx={sx} sy={sy} select={this.select} />
          </Col>
          {sx && sy &&
          <Col span="9" offset="1">
            <MenuForm dataSource={form} save={this.update} />
          </Col>}
        </Row>
        <Row>
          <Col span="9" offset="15">
            <Row>
              <Col span="14" offset="6">
                <Button htmlType="button" type="primary" onClick={this.upload} style={{ marginTop: -30 }}>上传</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
