# QwQNT-PluginSettings

本插件是 QwQNT 框架下，用于为插件提供设置页和配置读写的插件。

本插件依赖 `RendererEvents` 插件，请确保其安装。

## 使用

在 `package.json` 中， `qwqnt` 对象下，加入 `settings` 字段，其作为你插件设置页加载的检索 id 。若不设置，则默认使用 `name` 字段内容。

在 Renderer 中，使用 `PluginSettings.renderer.registerPluginSettings` 注册设置窗口。

`PluginSettings.renderer.registerPluginSettings` 接受两个参数，`id` 和 `html` 。

- `id`: `string` 类型，插件设置页加载的检索 id 。
- `html`: 接受两种类型， `string` 或 `HTMLDivElement` 类型，设置页的 HTML 代码。

下面是一个实例：

```typescript
// renderer
PluginSettings.renderer.registerPluginSettings('<your_id>', div);
```

你可以分别在 renderer 和 main 中读写配置。

对于 renderer ，你可以使用 `PluginSettings.renderer` 下的方法。

对于 main ，你可以使用 `PluginSettings.main` 下的方法。

读配置，使用 `readConfig` 方法，传入 `id` 参数。

写配置，使用 `writeConfig` 方法，传入 `id` 和 `newConfig` 参数。

对于 Typescript ，`readConfig` 的返回值和 `writeConfig` 的 `newConfig` 参数均为泛型。

对于使用 Typescript 编写插件的开发者，你可能需要将 `PluginSettings` 和 `RendererEvents` 写入 `global.d.ts` 中。

```typescript
// global
declare namespace RendererEvents {
  const onSettingsWindowCreated: (callback: () => void) => void;
}

declare namespace PluginSettings {
  interface ICommon {
    readConfig: <T>(id: string) => Promise<T>;
    writeConfig: <T>(id: string, newConfig: T) => void;
  }
  interface IRenderer extends ICommon {
    registerPluginSettings: (id: string, html: string | HTMLDivElement) => void;
  }

  const main: ICommon;
  const renderer: IRenderer;
}
```

## License
```
    MIT License

    QwQNT-PluginSettings
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