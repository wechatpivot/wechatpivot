wechat-pivot
==

pivot
--

common wechat integration

1. 通过内部接口获得微信的授权页面

```
POST /private-api/oauth/snsapi-base:url HTTP/1.1
Host: pivot.private
Content-Type: application/json

{ "r": "https://app.example.com/wechat-login/page" }
```

```json
{
    "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wechatappid&redirect_uri=http%3A%2F%2F127.0.0.1%3A7002%2Foauth%3Fr%3Dhttps%253A%252F%252Fapp.example.com%252Fwechat-login%252Fpage&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
}
```

2. 授权后回跳 pivot `http://127.0.0.1:7002/oauth?code=access-token&r=https%3A%2F%2Fapp.example.com%2Fwechat-login%2Fpage`，pivot 通过 code=access-token 获取用户信息，并保存在 session 里，仍然用 code 做 key

3. pivot 回跳应用的 /wechat-login/{page} 页面，通过内部接口通过 code 获取用户信息，pivot 将 session 中的用户信息返回，并清空该 key

mockup
--

and the corresponding mockup

debugger
--

*即原 `wechat-api-debug` 项目*

WeChat API Debug
==

Electron App：微信公众平台接口调试工具 http://mp.weixin.qq.com/debug/ 增强版（可调试本地，对码农友好、等）

*由于 [Google will kill chrome apps](http://venturebeat.com/2016/08/19/google-will-kill-chrome-apps-for-windows-mac-and-linux-in-early-2018/)，原 [Chrome App](https://chrome.google.com/webstore/detail/wechat-api-debug/) 不再维护。*

Contributor Guidelines
==

1. 本项目基于 `Element-UI`，尽量不在样式上做额外调整。

2. 代码框架和结构来自于 `Electron Vue Template`，关于开发方式暂时详见其文档。

3. 目前处于从 `Chrome App + Vue@1` 往 `Electron + Vue@2` 的迁移过程中，如需使用需要通过开发的方式，即 `npm run dev`，迁移过程完成后会提供 macOS 下的安装包.

4. 未来有可能提供或不提供 macOS App Store 下载，看情况。

5. *目前只实现了我工作中最常用的一些场景，会渐渐补全，如有急需请提 issue 或 pr*
