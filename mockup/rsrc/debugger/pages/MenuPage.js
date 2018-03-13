import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd';
import MenuGroup from '../components/MenuGroup';
import MenuForm from '../components/MenuForm';


@connect(state => ({
  menu: state.menu
}))
export default class MenuPage extends Component {
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
    const { menus, sx, sy } = this.props.menu;

    return (
      <Row>
        <Col span="4">
          <MenuGroup dataSource={menus.filter(m => m.x === 0)} sx={sx} sy={sy} select={this.select} />
        </Col>
        <Col span="4" offset="1">
          <MenuGroup dataSource={menus.filter(m => m.x === 1)} sx={sx} sy={sy} select={this.select} />
        </Col>
        <Col span="4" offset="1">
          <MenuGroup dataSource={menus.filter(m => m.x === 2)} sx={sx} sy={sy} select={this.select} />
        </Col>
        <Col span="9" offset="1">
          <MenuForm />
          <button type="button" onClick={this.upload}>upload</button>
        </Col>
      </Row>
    );
  }
}
