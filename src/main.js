// 1. 打包js
import fn from "./js/foo";
import $ from 'jquery';
$('#bot').html(123)
// 加载export成员
import {foo,number} from "./js/foo";
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
import './css/style.css'; 

// 3. 打包字体资源
// ① bootstrap 4.0 移除了内置字体图标==>bootstrap 3.x 中内置了字体图标
// import 'bootstrap/dist/css/bootstrap.css'
// ② npm install font-awesome --save 
// import 'font-awesome/css/font-awesome.min.css'

// 4. 打包less资源  ====>有问题
// import './less/style.less'

// 5. 打包图片资源
// import Icon from './icon.png';
//    var myIcon = new Image();
//    myIcon.src = Icon;

//    element.appendChild(myIcon);

// 6. 开启热更新
// 6.1 首先加载webpack
// 6.2webpack-dev-server 配置的
  // contentBase 用来设置我们开发服务器的 www 目录
  // devServer: {
  //   contentBase: './dist',
  //   hot: true // 开启热更新
  // }, 
// 6.3 plugins 中添加代码

// new webpack.NamedModulesPlugin(),
// new webpack.HotModuleReplacementPlugin()

// 7. 打包 vue 资源