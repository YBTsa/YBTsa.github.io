// 定义Fluent Sidebar Web Component
class FluentSidebar extends HTMLElement {
    constructor() {
        super();
        import('https://unpkg.com/@fluentui/web-components@2.6.1/dist/web-components.min.js');
        const shadow = this.attachShadow({mode: 'open'});

        // 组件模板 (保持不变)
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    --sidebar-width: 240px;
                    display: block;
                }
                /* 移除本地变量定义，使用全局变量 */
                div,p,a,li,label,span{
                    color: var(--fluent-text);
                    font-family: "Segoe UI Variable", system-ui;
                }
                .sidebar {
                    width: var(--sidebar-width);
                    background-color: var(--fluent-background);
                    box-shadow: var(--fluent-shadow);
                    height: 100vh;
                    position: fixed;
                    display: flex;
                    flex-direction: column;
                }
                .header {
                    padding: 20px;
                    border-bottom: 1px solid var(--fluent-border);
                }
                
                .logo {
                    font-weight: 600;
                    font-size: 1.2rem;
                    color: var(--fluent-primary);
                    text-decoration: none;
                    display: inline-block;
                }
                
                .logo img {
                    width: 20%;
                }
                
                .nav-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    flex-grow: 1;
                    overflow-y: auto;
                }
                
                .nav-item a {
                    display: block;
                    padding: 12px 20px;
                    color: var(--fluent-text);
                    text-decoration: none;
                    font-size: 0.95rem;
                    transition: background-color 0.2s ease-in-out;
                    position: relative;
                }
                
                .nav-item a:hover {
                    background-color: var(--fluent-hover);
                }
                
                .nav-item a.active {
                    color: var(--fluent-primary);
                    font-weight: 500;
                }
                
                .nav-item a.active::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 3px;
                    background-color: var(--fluent-primary);
                }
                .footer {
                    padding: 20px;
                    border-top: 1px solid var(--fluent-border);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 10px;
                }
            </style>
            <nav class="sidebar">
                <div class="header">
                    <a href="/index.html" class="logo"><img alt="logo" src="/images/logo.ico"/>YoungBat</a>
                </div>
                <ul class="nav-list">
                    <li class="nav-item"><a href="/index.html"  class="nav-link">Home</a></li>
                    <li class="nav-item"><a href="/download.html" class="nav-link">Download</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Services</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
                </ul>
                <div class="footer">
                    <fluent-switch id="themeSwitch">
                        <span slot="checked-message">Dark</span>
                        <span slot="unchecked-message">Light</span>
                        <label for="cap-switch">Style:</label>
                    </fluent-switch>
                </div>
            </nav>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        // 初始化主题
        this.initTheme();

        // 添加主题切换事件
        this.shadowRoot.getElementById('themeSwitch').addEventListener('change', (e) => {
            this.toggleTheme(e.target.checked);
        });
    }

    // 初始化主题
    initTheme() {
        const isDark = localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.shadowRoot.getElementById('themeSwitch').checked = true;
        }
    }

    // 切换主题
    toggleTheme(isDark) {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }
}

// 注册自定义元素
customElements.define('fluent-sidebar', FluentSidebar);