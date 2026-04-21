document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation handling (SPA Routing)
    const navLinks = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.view-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            // Update Active Link State
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Hide all sections, show target
            sections.forEach(sec => {
                sec.classList.remove('active-section');
                sec.classList.add('hidden');
            });
            const targetSection = document.getElementById(targetId);
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active-section');
            
            // Mobile Menu close
            const mobileMenuBox = document.querySelector('.nav-links');
            if(mobileMenuBox.classList.contains('show')) {
                mobileMenuBox.classList.remove('show');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('show');
        });
    }

    // Footer Year
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Back to tips logic for individual details
    const backBtn = document.getElementById('back-to-tips');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            document.querySelectorAll('.view-section').forEach(sec => {
                sec.classList.remove('active-section');
                sec.classList.add('hidden');
            });
            const tipsSec = document.getElementById('tips');
            tipsSec.classList.remove('hidden');
            tipsSec.classList.add('active-section');
            
            // update nav active state
            document.querySelectorAll('.nav-btn').forEach(l => l.classList.remove('active'));
            document.querySelector('.nav-btn[data-target="tips"]').classList.add('active');
        });
    }

    // Back to blog logic for individual details
    const backBtnBlog = document.getElementById('back-to-blog');
    if (backBtnBlog) {
        backBtnBlog.addEventListener('click', () => {
            document.querySelectorAll('.view-section').forEach(sec => {
                sec.classList.remove('active-section');
                sec.classList.add('hidden');
            });
            const blogSec = document.getElementById('blog');
            blogSec.classList.remove('hidden');
            blogSec.classList.add('active-section');
            
            // update nav active state
            document.querySelectorAll('.nav-btn').forEach(l => l.classList.remove('active'));
            document.querySelector('.nav-btn[data-target="blog"]').classList.add('active');
        });
    }

    // Back to writeups logic for individual details
    const backBtnWriteups = document.getElementById('back-to-writeups');
    if (backBtnWriteups) {
        backBtnWriteups.addEventListener('click', () => {
            document.querySelectorAll('.view-section').forEach(sec => {
                sec.classList.remove('active-section');
                sec.classList.add('hidden');
            });
            const writeupSec = document.getElementById('writeups');
            writeupSec.classList.remove('hidden');
            writeupSec.classList.add('active-section');
            
            // update nav active state
            document.querySelectorAll('.nav-btn').forEach(l => l.classList.remove('active'));
            document.querySelector('.nav-btn[data-target="writeups"]').classList.add('active');
        });
    }

    // 2. Render Data
    renderWhoami();
    renderCompetitions();
    renderBlog();
    renderWriteups();
    renderWriteupsCategories();
    renderTips();
    renderCategories();
});

// Render Home/Whoami
function renderWhoami() {
    const container = document.getElementById('whoami-content');
    
    let skillsHtml = portfolioData.user.skills.map(s => `<span style="color: var(--accent-secondary);">"${s}"</span>`).join(', ');
    
    container.innerHTML = `
        <span class="prompt">guest@cybersec:~$</span> cat about.txt <br><br>
        <div style="color: var(--text-main);">
            <strong style="color: var(--accent-green)">Name:</strong> ${portfolioData.user.name} <br>
            <strong style="color: var(--accent-green)">Class:</strong> ${portfolioData.user.classLevel} <br><br>
            ${portfolioData.user.description}
            <br><br>
            <strong style="color: var(--accent-primary)">Skills:</strong> [ ${skillsHtml} ]
        </div>
        <br>
        <span class="prompt">guest@cybersec:~$</span> <span class="blink">_</span>
    `;
}

// Render Competitions
function renderCompetitions() {
    const container = document.getElementById('competitions-list');
    
    let html = '';
    portfolioData.competitions.forEach(comp => {
        let imagesHtml = '';
        if (comp.images && comp.images.length > 0) {
            imagesHtml = `<div class="comp-images" style="display: flex; gap: 10px; margin-top: 15px;">`;
            comp.images.forEach(img => {
                imagesHtml += `<img src="${img}" alt="${comp.title}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color);">`;
            });
            imagesHtml += `</div>`;
        }
        
        html += `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="comp-date">${comp.date} [Status: ${comp.status}]</span>
                    <h3 class="comp-title">${comp.title}</h3>
                    <p class="card-desc">${comp.description}</p>
                    ${imagesHtml}
                    ${comp.link !== '#' ? `<a href="${comp.link}" target="_blank" class="card-link" style="margin-top: 1rem;">View Details <i class="fa-solid fa-arrow-right"></i></a>` : ''}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Render Blog
function renderBlog() {
    const container = document.getElementById('blog-list');
    
    let html = '';
    portfolioData.blogPosts.forEach(post => {
        html += `
            <div class="card">
                <span class="card-tag" style="background: rgba(255,255,255,0.1); color: var(--text-main); border: 1px solid rgba(255,255,255,0.2);">${post.tag}</span>
                <h3 class="card-title">${post.title}</h3>
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim);">${post.date}</span>
                <p class="card-desc">${post.snippet}</p>
                <a href="#" class="card-link" onclick="showBlogDetail(event, ${post.id})">Citește Mai Mult <i class="fa-solid fa-book-open"></i></a>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function showBlogDetail(event, id) {
    if(event) event.preventDefault();
    const post = portfolioData.blogPosts.find(p => p.id === id);
    if(!post) return;
    
    // Hide all sections
    document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.remove('active-section');
        sec.classList.add('hidden');
    });
    
    // Show blog-detail
    const detailSec = document.getElementById('blog-detail');
    detailSec.classList.remove('hidden');
    detailSec.classList.add('active-section');
    
    // Render content
    const container = document.getElementById('blog-content-container');
    container.innerHTML = `
        <h1 style="font-size: 2.2rem; color: var(--text-main); margin-bottom: 0.5rem; margin-top: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">${post.title}</h1>
        <div style="font-family: var(--font-mono); color: var(--text-dim); font-size: 0.9rem; margin-bottom: 2rem; margin-top: 1rem;">
            <span><i class="fa-regular fa-calendar"></i> ${post.date}</span> &nbsp;|&nbsp; 
            <span style="color: var(--accent-secondary);">${post.tag}</span>
        </div>
        <div style="color: var(--text-main); font-size: 1.05rem; line-height: 1.8; max-width: 800px; white-space: pre-wrap; font-family: var(--font-sans);">
            ${post.content}
        </div>
    `;
}

// Render Write-ups
function renderWriteups(filterCat = "Toate") {
    const container = document.getElementById('writeups-list');
    
    let filtered = portfolioData.writeups;
    if(filterCat !== "Toate") {
        filtered = portfolioData.writeups.filter(w => w.category === filterCat);
    }
    
    let html = '';
    filtered.forEach(post => {
        html += `
            <div class="card" style="border-left: 2px solid var(--accent-primary)">
                <span class="card-tag" style="background: var(--accent-dim); color: var(--accent-primary); border: 1px solid var(--border-color);">${post.tag}</span>
                <h3 class="card-title">${post.title}</h3>
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim);">${post.date}</span>
                <p class="card-desc">${post.snippet}</p>
                <a href="#" class="card-link" onclick="showWriteupDetail(event, ${post.id})">Citește Rezolvarea <i class="fa-solid fa-flag"></i></a>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function showWriteupDetail(event, id) {
    if(event) event.preventDefault();
    const post = portfolioData.writeups.find(p => p.id === id);
    if(!post) return;
    
    // Hide all sections
    document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.remove('active-section');
        sec.classList.add('hidden');
    });
    
    // Show writeup-detail
    const detailSec = document.getElementById('writeup-detail');
    detailSec.classList.remove('hidden');
    detailSec.classList.add('active-section');
    
    // Render content
    const container = document.getElementById('writeup-content-container');
    container.innerHTML = `
        <h1 style="font-size: 2.5rem; color: var(--accent-primary); margin-bottom: 0.5rem; margin-top: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">${post.title}</h1>
        <div style="font-family: var(--font-mono); color: var(--text-dim); font-size: 0.95rem; margin-bottom: 3rem; margin-top: 1rem;">
            <span><i class="fa-regular fa-calendar"></i> ${post.date}</span> &nbsp;|&nbsp; 
            <span style="color: var(--text-main); border-bottom: 1px dashed var(--accent-primary);">${post.tag}</span>
        </div>
        <div style="color: var(--text-dim); font-size: 1.15rem; line-height: 1.8; max-width: 850px; font-family: var(--font-sans);">
            ${post.content}
        </div>
    `;
}

// Render Write-ups Categories
function renderWriteupsCategories() {
    const container = document.getElementById('writeups-categories');
    if(!container) return;
    
    let html = '';
    portfolioData.writeupsCategories.forEach((cat, index) => {
        html += `<button class="filter-btn ${index === 0 ? 'active' : ''}" data-filter="${cat}">${cat}</button>`;
    });
    
    container.innerHTML = html;

    // Add filter logic
    const filterBtns = container.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update Active Buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const category = e.target.getAttribute('data-filter');
            renderWriteups(category);
        });
    });
}

// Render Tips Categories
function renderCategories() {
    const container = document.getElementById('tips-categories');
    
    let html = '';
    portfolioData.categories.forEach((cat, index) => {
        html += `<button class="filter-btn ${index === 0 ? 'active' : ''}" data-filter="${cat}">${cat}</button>`;
    });
    
    container.innerHTML = html;

    // Add filter logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update Active Buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const category = e.target.getAttribute('data-filter');
            renderTips(category);
        });
    });
}

// Escape HTML for XSS payloads securely
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Render Tips
function renderTips(filterCat = "Toate") {
    const container = document.getElementById('tips-list');
    
    let filteredTips = portfolioData.tipsTricks;
    if(filterCat !== "Toate") {
        filteredTips = portfolioData.tipsTricks.filter(t => t.category === filterCat);
    }

    let html = '';
    filteredTips.forEach(tip => {
        html += `
            <div class="card" style="border-left: 2px solid ${getColorForCat(tip.category)}">
                <span class="card-tag" data-cat="${tip.category}">${tip.category}</span>
                <h3 class="card-title">${tip.title}</h3>
                <p class="card-desc">${tip.description}</p>
                <a href="#" class="card-link" onclick="showTipDetail(event, ${tip.id})">Aprofundează <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function showTipDetail(event, id) {
    if(event) event.preventDefault();
    const tip = portfolioData.tipsTricks.find(t => t.id === id);
    if(!tip) return;
    
    // Hide all sections
    document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.remove('active-section');
        sec.classList.add('hidden');
    });
    
    // Show tip-detail
    const detailSec = document.getElementById('tip-detail');
    detailSec.classList.remove('hidden');
    detailSec.classList.add('active-section');
    
    // Render content
    const container = document.getElementById('tip-content-container');
    container.innerHTML = `
        <h2 class="section-title" style="margin-top:1rem;">${tip.title} <span class="card-tag" style="font-size:0.45em; vertical-align:middle; background:rgba(255,255,255,0.1); border:1px solid ${getColorForCat(tip.category)}" data-cat="${tip.category}">${tip.category}</span></h2>
        <p class="section-desc">${tip.description}</p>
        <div class="terminal-card" style="margin-top:2rem; width:100%; max-width:100%;">
            <div class="terminal-header" style="border-bottom: 1px solid ${getColorForCat(tip.category)};">
                <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                <span class="title">cat /tips/${tip.category.toLowerCase()}_methods.txt</span>
            </div>
            <pre style="padding: 1.5rem; font-family: var(--font-mono); font-size: 0.95rem; color: var(--accent-green); white-space: pre-wrap; word-break: break-all; overflow-x: auto; line-height: 1.6;">${escapeHTML(tip.content)}</pre>
        </div>
    `;
}

function getColorForCat(cat) {
    const colors = {
        'Pwn': '#f43f5e', // Rose-500
        'Web': '#10b981', // Emerald-500
        'Crypto': '#8b5cf6', // Violet-500
        'PCAP': '#0ea5e9', // Sky-500
        'Stego': '#d946ef', // Fuchsia-500
        'Forensics': '#eab308', // Yellow-500
        'Reverse': '#f97316' // Orange-500
    };
    return colors[cat] || '#818cf8'; // Indigo-400
}
