# QwQNT Plugin Template

本仓库为民间自制的 QwQNT 插件模板。

## 如果你想...

* 在编写插件时使用 `pnpm` / `yarn` 等包管理器；
* 被 `Webpack` 的打包速度困扰已久
* 希望使用 `TypeScript` 编写插件脚本
* 想使用 `ESLint` 纠正代码错误和统一格式
* 执行一行命令即可完成代码检查、代码打包和输出 `zip` 文件

那么这个模板正好适合你！

## 使用

1. 点击本仓库页面右上角的 `Use this template`，然后选择 `Create a new repository`
2. 在接下来的页面中填写你的仓库信息后，点击 `Create repository`
3. 将创建的仓库克隆至本地，然后编辑 [`package.json`](package.json)
4. （可选）编辑 [TypeScript 配置文件](tsconfig.json)、[Vite 配置文件](electron.vite.config.ts) 和 [ESLint 配置文件](eslint.config.ts)，让项目配置风格更符合你的口味
5. 运行 `pnpm install` 安装依赖包，你也可以随意安装其他需要的依赖包
6. 开始编写代码
7. 执行 `pnpm lint` 检查代码
8. 执行 `pnpm build` 打包代码并输出 `zip` 文件
9. 安装体验或是将成果分享给你的朋友吧！

## 常见问题

1. 本模板使用`pnpm`而非`npm`，如想使用`npm`，请删除`package.json`中的`packageManager`配置项

### 部分模块打包后功能不正常或不起作用

请遵循 [Rollup 文档](https://rollupjs.org/configuration-options/#external) 将运行不正常的模块添加至 Vite 的 `rollupOptions` 中，然后利用 `vite-plugin-cp` 插件将对应模块复制到 `dist/node_modules` 目录中。

## 鸣谢
* [Vite](https://vitejs.dev/)
* [electron-vite](https://electron-vite.org/)
* [LLOneBot](https://github.com/LLOneBot/LLOneBot)
* QwQNT

## License
```
    MIT License

    QwQNT-PluginTemplate-Vite-pnpm
    Copyright (C) 2025  Adpro

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
```