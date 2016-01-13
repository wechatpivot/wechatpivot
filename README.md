WeiXin API Debug
==

Chrome 扩展：微信公众平台接口调试工具 http://mp.weixin.qq.com/debug/ 增强版（可调试本地，对码农友好、等）

Howto
==

1. 首次开发请使用 `gulp build`，会将依赖的库都复制到相应文件夹；本项目直接使用 `bootstrap 3`，并且不准备在样式上做额外调整。

2. 后续开发只会修改 `js`，因此只需要使用 `webpack -d -w` 或 `webpack -p` 进行打包即可。

3. *目前没有发布到 Chrome 插件，所以请自行 clone 到本地，然后从 Chrome 开发者模式加载文件夹*

4. *目前只实现了我工作中最常用的一些场景，会渐渐补全，如有急需请提 issue 或 pr*
