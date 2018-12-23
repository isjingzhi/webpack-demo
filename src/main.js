// 1. 打包js
import fn from "./foo";

// 加载export成员
import {foo,number} from "./foo";
/*
  // 一次性加载所有成员 (包括 default)
  import * as fooModule from "./foo";
  console.log(fooModule.foo);
  console.log(fooModule.number);
  console.log(fooModule.add(5,6));
*/
fn()
console.log(foo);
console.log(number);

// 2.打包 css
/*
  ① webpack 打包执行代码的时候会把 css 文件模块转成一个js模块然后再浏览器运行期间生成一个 style 节点插入 head 中;
  ② webpack 本身只能打包 javascript 文件模块,如果需要打包 css、img、fonts ... 等 Web 资源,则我们需要安装不同的 loader 来处理
  ③ 例如 npm install --save-dev style-loader css-loader 并在 webpack.config.js 进行配置;
*/
import './css/main.css';
// import './css/reset.css'; // 清除默认样式 ==> 行不通

// 3. 打包字体资源
// ① bootstrap 4.0 移除了内置字体图标==>bootstrap 3.x 中内置了字体图标
// import 'bootstrap/dist/css/bootstrap.css'
// ② npm install font-awesome --save 
import 'font-awesome/css/font-awesome.min.css'

// 4. 打包less资源  ====>有问题
// import './less/style.less'