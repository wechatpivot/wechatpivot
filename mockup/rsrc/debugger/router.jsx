import React from 'react';
import { Switch, Route, routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import dynamic from 'dva/dynamic';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
const MenuItem = Menu.Item;
const BreadcrumbItem = Breadcrumb.Item;

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
      path: '/menu',
      models: () => [
        import('./models/menu'),
      ],
      component: () => import('./pages/menu'),
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
            <BreadcrumbItem>菜单管理</BreadcrumbItem>
            <BreadcrumbItem>Menu</BreadcrumbItem>
          </Breadcrumb>
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
