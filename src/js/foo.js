// 导出默认成员(注意:一个模块中有且只有一个默认成员;缺点是只能导出一个)  ==>等价于 module.export = function...

export default function(){
  console.log("foo.js 的默认成员");
}


// 当导出多个成员时

export const foo = "张三";

export const number = 123;

export function add(x,y){
    return x+y;
}
