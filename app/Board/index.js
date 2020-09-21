// TODO: index.js 在CommonJS环境下怎么写
// 1.ES6下的import， index.js 以及 export default是通过@babel/plugin-proposal-export-default-from达成的
// 2.在CommonJS的环境下可以替换module.exports 为 exports.default 达到相同目的。由于没有babel的导出导入插件帮忙，
// 所以默认读取文件不会从index中找，所以即使使用后者也没不能打到省略重复路径/文件名的目的.

// src | app
// 这个中英文我都没找到合适的文档，那就听从龙哥经验改叫App。
// 我自己的理解Src指的是一个项目的source目录下面的所有东西比如Components Pages 以及Firebase等.
// App更像是一个可以直接操作的项目，比如RobotApp/start.js 是可以直接运行的文件。相比如App/, Src/需要build或者compile

// TODO ESLINTrc.js
// ** ReadME **
// JEST

// blocker relatinshop -- Game 1 ? Block.number *
// blocker -> Blocker constructor x,y
// Game -> Blocker-x,y

// place second robot

// score points add
