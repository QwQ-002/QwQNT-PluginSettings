import './static/style.css';
import { IQwQNTPlugins } from '../types/QwQNTPlugin';

export class SettingInterface {
  #qwqnt_nav_bar = document.createElement('div');
  #qwqnt_setting_view = document.createElement('div');
  #setting_view = document.querySelector('.setting-main .q-scroll-view') as HTMLDivElement;
  #setting_title = document.querySelector('.setting-main .setting-title') as HTMLDivElement;

  constructor(){
    this.#qwqnt_nav_bar.classList.add('nav-bar', 'qwqnt');
    this.#qwqnt_setting_view.classList.add('q-scroll-view', 'scroll-view--show-scrollbar', 'qwqnt');
    this.#qwqnt_setting_view.style.display = 'none';
    document.querySelector('.setting-tab')!.append(this.#qwqnt_nav_bar);
    document.querySelector('.setting-main .setting-main__content')!.append(this.#qwqnt_setting_view);
    document.querySelector('.setting-tab')!.addEventListener('click', event => {
      const nav_item = (event.target as HTMLElement).closest('.nav-item');
      if (nav_item){
        // 内容显示
        if (nav_item.parentElement!.classList.contains('qwqnt')) {
          this.#setting_view!.style.display = 'none';
          this.#qwqnt_setting_view.style.display = 'block';
        }
        else {
          this.#setting_view.style.display = 'block';
          this.#qwqnt_setting_view.style.display = 'none';
        }
        // 重新设定激活状态
        this.#setting_title.childNodes[1].textContent = nav_item.querySelector('.name')!.textContent;
        document.querySelectorAll('.setting-tab .nav-item').forEach(element => {
          element.classList.remove('nav-item-active');
        });
        nav_item.classList.add('nav-item-active');
      }
    });
  };

  add(plugin: IQwQNTPlugins){
    const nav_item = document.querySelector('.setting-tab .nav-item')!.cloneNode(true);
    const view = document.createElement('div');
    (nav_item as HTMLElement).classList.remove('nav-item-active');
    (nav_item as HTMLElement).setAttribute('data-name', plugin.packageJson.name);
    (nav_item as HTMLElement).querySelector('.name')!.textContent = plugin.packageJson.qwqnt.name;
    nav_item.addEventListener('click', event => {
      if(!(event.currentTarget as HTMLElement).classList.contains('nav-item-active')){
        this.#qwqnt_setting_view.textContent = null;
        this.#qwqnt_setting_view.append(view);
      }
    });
    this.#qwqnt_nav_bar.append(nav_item);
    view.classList.add('tab-view', plugin.packageJson.name);

    return view;
  };
}