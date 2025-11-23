class FluentNavbar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
      <style>
        .fluent-navbar{display:flex;align-items:center;padding:0 2rem;height:4rem;background:#0f172a;box-shadow:0 2px 10px rgba(0,0,0,.3);font-family:'Segoe UI Variable',system-ui,-apple-system,sans-serif;width:100%;box-sizing:border-box;overflow:hidden;position:relative;z-index:1000}
        .page-logo{margin-right:2rem;display:flex;align-items:center;height:100%}
        .logo{height:2rem;width:auto;object-fit:contain;filter:drop-shadow(0 0 3px rgba(255,255,255,.3))}
        .page-logo p{color:#f8fafc;margin:0 0 0 .8rem;font-size:.9rem;text-shadow:0 0 5px rgba(255,255,255,.1)}
        .hamburger-btn{display:none;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;border:none;background:rgba(255,255,255,.1);border-radius:4px;cursor:pointer;transition:background-color .2s;margin-left:auto}
        .hamburger-btn:hover{background:rgba(255,255,255,.2)}
        .hamburger-icon{display:flex;flex-direction:column;gap:4px;width:1.2rem;height:1.2rem;justify-content:center;align-items:center}
        .hamburger-bar{width:100%;height:2px;background:#f8fafc;border-radius:1px;transition:transform .2s,opacity .2s}
        .hamburger-btn.active .hamburger-bar:nth-child(1){transform:translateY(6px) rotate(45deg)}
        .hamburger-btn.active .hamburger-bar:nth-child(2){opacity:0}
        .hamburger-btn.active .hamburger-bar:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
        .nav-links{display:flex;height:100%;align-items:stretch;gap:0;position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap}
        .nav-link{display:flex;align-items:center;border-left:1px solid rgba(255,255,255,.15);padding:0 1.5rem;box-sizing:border-box}
        a{color:#f8fafc;text-decoration:none;font-size:.9rem;font-weight:500;transition:all .2s;white-space:nowrap}
        a:hover{color:#93c5fd;text-shadow:0 0 8px rgba(147,197,253,.5)}
        @media (max-width:768px){
          .fluent-navbar{padding:0 1rem;overflow:visible}
          .nav-links{visibility:hidden;opacity:0;height:0;overflow:hidden;flex-direction:column;align-items:stretch;position:absolute;top:4rem;left:0;width:100%;background:#fff;box-shadow:0 4px 10px rgba(0,0,0,.1);transform:none;padding:0;z-index:999;transition:visibility .2s,opacity .2s,height .2s,padding .2s}
          .nav-links.active{visibility:visible;opacity:1;height:auto;padding:1rem 0}
          .nav-link{border-left:none;border-top:1px solid rgba(0,0,0,.1);padding:1rem 2rem;align-items:center}
          .nav-link:first-child{border-top:none}
          .hamburger-btn{display:flex}
          .nav-links a{color:#0f172a;font-weight:500}
          .nav-links a:hover{color:#3b82f6;text-shadow:none}
        }
      </style>
      <div class="fluent-navbar">
        <div class="page-logo">
          <img src="/images/logo.webp" alt="YBlog" class="logo"/>
          <p>YBTsa's Blog</p>
        </div>
        <button class="hamburger-btn" aria-label="Toggle menu" aria-expanded="false" type="button">
          <div class="hamburger-icon">
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
          </div>
        </button>
        <div class="nav-links">
          <div class="nav-link"><a href="/">Dashboard</a></div>
          <div class="nav-link"><a href="/">Article</a></div>
          <div class="nav-link"><a href="/">Settings</a></div>
        </div>
      </div>
    `;
        const hamburgerBtn = shadow.querySelector('.hamburger-btn');
        const navLinks = shadow.querySelector('.nav-links');
        const navbar = shadow.querySelector('.fluent-navbar');
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = !hamburgerBtn.classList.contains('active');
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', String(isActive));
        });
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

customElements.define('fluent-navbar', FluentNavbar);