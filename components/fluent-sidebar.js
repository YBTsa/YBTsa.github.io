// 定义Fluent Sidebar Web Component
class FluentSidebar extends HTMLElement {
    constructor() {
        super();
        import('https://unpkg.com/@fluentui/web-components@2.6.1/dist/web-components.min.js');
        // 创建一个shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // 组件模板
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    --sidebar-width: 240px;
                    --fluent-primary: #0078d4;
                    --fluent-primary-light: #e6f4ff;
                    --fluent-text: #1a1a1a;
                    --fluent-text-secondary: #666666;
                    --fluent-background: #ffffff;
                    --fluent-border: #eaeaea;
                    --fluent-hover: #f3f3f3;
                    --fluent-selected: #e6f4ff;
                    --fluent-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    display: block;
                }
                div,p,a,li{
                    font-family: "Segoe UI",system-ui;
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
                <div class="footer" >
                    <p>© 2020-2025 YoungBat. All rights reserved.</p>
                </div>
            </nav>
        `;

        // 将模板内容克隆到shadow root
        shadow.appendChild(template.content.cloneNode(true));
    }
}

// 注册自定义元素
customElements.define('fluent-sidebar', FluentSidebar);