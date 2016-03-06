let navs = [];


navs.push({
  id: 'toolkit/menu',
  text: '工具箱',
  subnavs: [
    { id: 'toolkit/menu', text: '菜单管理' },
  ],
});


navs.push({
  id: 'message/text',
  text: '接收普通消息',
  subnavs: [
    { id: 'message/text', text: '文本消息' },
    { id: null, text: '图片消息' },
    { id: null, text: '语音消息' },
    { id: null, text: '视频消息' },
    { id: null, text: '小视频消息' },
    { id: null, text: '地理位置消息' },
    { id: null, text: '链接消息' },
    { id: 'http://mp.weixin.qq.com/wiki/10/79502792eef98d6e0c6e1739da387346.html', text: null },
  ],
});


navs.push({
  id: 'event/subscribe',
  text: '接收事件推送',
  subnavs: [
    { id: 'event/subscribe', text: '关注' },
    { id: 'event/unsubscribe', text: '取消关注' },
    { id: 'event/scan-and-subscribe', text: '未关注时扫描带参数二维码同时完成关注' },
    { id: 'event/scan', text: '已关注时扫描带参数二维码' },
    // 3 上报地理位置事件
    // 4 自定义菜单事件
    // 5 点击菜单拉取消息时的事件推送
    // 6 点击菜单跳转链接时的事件推送
    { id: 'http://mp.weixin.qq.com/wiki/2/5baf56ce4947d35003b86a9805634b1e.html', text: null },
  ],
});


navs.push({
  id: 'user/group',
  text: '用户管理',
  subnavs: [
    { id: 'user/group', text: '分组管理' },
    { id: 'http://mp.weixin.qq.com/wiki/8/d6d33cf60bce2a2e4fb10a21be9591b8.html', text: null },
  ],
});


let currentNavId = navs[0].id;
let currentSubnavId = currentNavId;


export default {
  navs,
  currentNavId,
  currentSubnavId,
};
