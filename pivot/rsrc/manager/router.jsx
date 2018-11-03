import React from 'react';
import { Switch, Route, routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import dynamic from 'dva/dynamic';
import { Layout, Menu, Breadcrumb, Alert, Icon } from 'antd';
const { Header, Content, Footer } = Layout;
const { Item: MenuItem } = Menu;
const { Item: BreadItem } = Breadcrumb;

// import App from './routes/app'

const { ConnectedRouter } = routerRedux;

// const registerModel = (app, model) => {
//   if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
//     app.model(model)
//   }
// }

export default function router({ history, app }) {
  // registerModel(app, require('./models/auth'))

  const routes = [
    {
      path: '/mps',
      models: () => [
        import('./models/mp'),
      ],
      component: () => import('./pages/MpIndexPage'),
    },
    {
      path: '/menu',
      models: () => [
        import('./models/menu'),
      ],
      component: () => import('./pages/MenuPage'),
    },
    // {
    //   path: '/app/user',
    //   models: () => [
    //     import('./models/user'),
    //   ],
    //   component: () => import('./routes/user'),
    // },
    // {
    //   path: '/app/user/:username',
    //   models: () => [
    //     import('./models/user'),
    //   ],
    //   component: () => import('./routes/user'),
    // },
  ];

  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['menu']} style={{ lineHeight: '64px' }}>
            <MenuItem key="index"><a href="#/">关于</a></MenuItem>
            <MenuItem key="menu"><a href="#/menu">菜单管理</a></MenuItem>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <BreadItem>菜单管理</BreadItem>
            <BreadItem>Menu</BreadItem>
          </Breadcrumb>
          <Alert message={<p>应该使用你自己的服务器做微信接口转发 <a><Icon type="question-circle-o" /></a></p>} type="warning" style={{ position: 'absolute', right: 50, top: 72, paddingRight: 8 }} />
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
              {routes.map(({ path, ...dynamics }) => <Route exact path={path} key={path} component={dynamic({ app, ...dynamics })} />)}
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Wechat Pivot &copy; 2015-2018
        </Footer>
      </Layout>
    </ConnectedRouter>
  );
}
