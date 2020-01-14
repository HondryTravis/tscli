# Quick Start Configuration

## 基于[yeoman](https://yeoman.io)框架构建脚手架
  用脚手架搭建脚手架，当然也可以使用node，commander模块来构建，配和一些插件也可以做到，但是大名鼎鼎的vscode就是使用yo构建的项目`yo code`

## 生命周期函数钩子
- initializing -- 初始化方法（检查状态、获取配置等）
- prompting -- 获取用户交互数据（this.prompt()）
- configuring -- 编辑和配置项目的配置文件
- default -- 如果generator内部还有不符合任意一个任务队列任务名的方法，将会被放在default这个任务下进行运行
- writing -- 填充预置模板
- conflicts -- 处理冲突（仅限内部使用）
- install -- 进行依赖的安装（eg：npm，bower）
- end -- 最后调用，做一些clean工作


## frist one

``` zsh
  # install somthing necessary plugins
  npm i -g yo generator-generator
```

## next

``` zsh
  # generator you command-line interface
  yo generator
  # generator-name <name> ---tscli
```

## writing `index.js` file

look this.`./generators/app/index.js`


## if your code is not publish on npm. you can use `npm link` to link u development library then use this library command.

enjoy it, and then quick start writings your configuration files

## this library use some grammar --- `ejs` 
``` javascript,*.html,*.md
  example:
  <%= variable %>
```
