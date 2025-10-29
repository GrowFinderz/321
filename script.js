// Basic interactivity: theme toggle, mobile nav, filters, project modal, contact form
(function(){
  const rootHtml = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const yearEl = document.getElementById('year');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  // set year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function setTheme(mode){
    if(mode === 'light') rootHtml.classList.add('light');
    else rootHtml.classList.remove('light');
    localStorage.setItem('theme', mode);
    toggle.textContent = (mode === 'light') ? '☀️' : '🌙';
  }

  // init theme
  const saved = localStorage.getItem('theme');
  if(saved){ setTheme(saved); }
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }

  toggle.addEventListener('click', () => {
    const isLight = document.documentElement.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
  });

  // mobile nav
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: 'smooth' });
        if(nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // PROJECT FILTERS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectsGrid = document.getElementById('projects-grid');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      document.querySelectorAll('.project-card').forEach(card => {
        const cat = card.getAttribute('data-category');
        if(filter === 'all' || filter === cat){
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // PROJECT MODAL
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  // Simple project data (you can expand)
  const projectsData = {
    'proj-wp-1': {
      title: 'WP E-commerce Store',
      category: 'WordPress',
      img: 'https://via.placeholder.com/900x500?text=WP+Shop',
      description: 'Custom WooCommerce store with optimized checkout and speed improvements. Features: product filters, custom checkout fields, analytics.'
    },
    'proj-custom-1': {
      title: 'Product Landing Page',
      category: 'Custom',
      img: 'https://via.placeholder.com/900x500?text=Landing',
      description: 'Responsive landing page built with modern CSS & JS. Includes animations, A/B ready layout and contact integration.'
    },
    'proj-design-1': {
      title: 'Brand Identity — Cafe',
      category: 'Design',
      img: 'https://via.placeholder.com/900x500?text=Brand+Kit',
      description: 'Logo, colour palette, social templates and packaging mockups for a local cafe.'
    },
    'proj-wp-2': {
      title: 'Blog / Magazine Theme',
      category: 'WordPress',
      img: 'https://via.placeholder.com/900x500?text=Blog+Theme',
      description: 'Custom WordPress theme focused on readability, ad placements and accessibility.'
    }
  };

  // open modal when view clicked
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const p = projectsData[id];
      if(!p) return;
      modalBody.innerHTML = `
        <h2>${p.title}</h2>
        <p class="muted">${p.category}</p>
        <img src="${p.img}" alt="${p.title}" style="width:100%; border-radius:8px; margin:1rem 0;" />
        <p>${p.description}</p>
        <div style="margin-top:1rem;">
          <a href="#" class="btn-sm">Live Demo</a>
          <a href="#" class="btn-sm btn-outline">Repo / Case Study</a>
        </div>
      `;
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  modalClose.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
  });

  modal.addEventListener('click', (e) => {
    if(e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
      modalBody.innerHTML = '';
    }
  });

  // CONTACT FORM (mailto fallback)
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  const mailtoBtn = document.getElementById('mailto-fallback');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if(!name || !email || !message){
      formMsg.textContent = 'Please fill all fields.';
      formMsg.style.color = 'tomato';
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRe.test(email)){
      formMsg.textContent = 'Enter a valid email.';
      formMsg.style.color = 'tomato';
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    const mailto = `mailto:youremail@example.com?subject=${subject}&body=${body}`;

    formMsg.textContent = 'Opening your email client...';
    formMsg.style.color = 'green';

    setTimeout(() => {
      window.location.href = mailto;
      form.reset();
    }, 600);
  });

  mailtoBtn.addEventListener('click', () => {
    const mailto = `mailto:youremail@example.com`;
    window.location.href = mailto;
  });

})();
