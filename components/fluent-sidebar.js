// 定义Fluent Sidebar Web Component
class FluentSidebar extends HTMLElement {
    constructor() {
        super();

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
                
                .fluent-sidebar-nav {
                    width: var(--sidebar-width);
                    background-color: var(--fluent-background);
                    box-shadow: var(--fluent-shadow);
                    height: 100vh;
                    position: fixed;
                    display: flex;
                    flex-direction: column;
                    transition: background-color 0.3s ease;
                }

                .nav-header {
                    padding: 20px;
                    border-bottom: 1px solid var(--fluent-border);
                }

                .nav-logo {
                    font-weight: 600;
                    font-size: 1.2rem;
                    color: var(--fluent-primary);
                    text-decoration: none;
                }

                .nav-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    flex-grow: 1;
                    overflow-y: auto;
                }

                .nav-link {
                    display: block;
                    padding: 12px 20px;
                    color: var(--fluent-text);
                    text-decoration: none;
                    font-size: 0.95rem;
                    transition: background-color 0.2s ease-in-out;
                    position: relative;
                }

                .nav-link:hover {
                    background-color: var(--fluent-hover);
                }

                .nav-link.active {
                    color: var(--fluent-primary);
                    font-weight: 500;
                }

                .nav-link.active::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 3px;
                    background-color: var(--fluent-primary);
                }

                .fluent-button {
                    background-color: var(--fluent-primary);
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 8px 16px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin-right: 8px;
                    margin-bottom: 8px;
                }

                .fluent-button:hover {
                    background-color: #005a9e;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                }

                .fluent-button:active {
                    background-color: #004578;
                    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
                }
            </style>
            <nav class="fluent-sidebar-nav">
                <div class="nav-header">
                    <a href="#" class="nav-logo"><img alt="logo" src="/images/logo.ico" style="width: 40%"/></a>
                </div>
                <ul class="nav-links">
                    <li><a href="#" class="nav-link active">Home</a></li>
                    <li><a href="#" class="nav-link">About</a></li>
                    <li><a href="#" class="nav-link">Services</a></li>
                    <li><a href="#" class="nav-link">Contact</a></li>
                </ul>
            </nav>
        `;

        // 将模板内容克隆到shadow root
        const clone = template.content.cloneNode(true);
        shadow.appendChild(clone);
    }

    // 当元素被添加到DOM时调用
    connectedCallback() {
        this.setupEventListeners();
    }


    // 设置事件监听器
    setupEventListeners() {

        // 链接点击事件
        const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (_) => {
                // 移除所有活动状态
                navLinks.forEach(l => l.classList.remove('active'));
                // 添加当前链接的活动状态
                link.classList.add('active');

                // 触发自定义事件通知外部链接点击
                this.dispatchEvent(new CustomEvent('navLinkClicked', {
                    detail: {href: link.getAttribute('href')},
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }
}

// 注册自定义元素
customElements.define('fluent-sidebar', FluentSidebar);
