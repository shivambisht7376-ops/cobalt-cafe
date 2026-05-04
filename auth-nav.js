import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth, ADMIN_EMAILS } from "./firebase-config.js";

// Update Header Navigation based on Auth State
onAuthStateChanged(auth, user => {
  const navContainer = document.querySelector('.header .container');
  if (!navContainer) return;
  
  // Remove existing auth buttons if any
  const existingBtn = navContainer.querySelector('.btn-signin, .user-menu');
  if (existingBtn) existingBtn.remove();

  if (user) {
    // User is signed in
    const displayName = user.displayName || user.email.split('@')[0];
    const initial = displayName.charAt(0).toUpperCase();
    const isAdmin = user.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
    
    const userMenu = document.createElement('div');
    userMenu.className = 'user-menu';
    userMenu.style.cssText = 'position:relative; display:flex; align-items:center; gap:10px; cursor:pointer;';
    
    let adminLink = isAdmin ? `<a href="admin.html" style="display:block; padding:8px 15px; color:var(--primary); font-size:0.9rem; font-weight:600; border-bottom:1px solid var(--surface-container-high);">Admin Portal</a>` : '';
    let dashboardLink = `<a href="dashboard.html" style="display:block; padding:8px 15px; color:var(--primary); font-size:0.9rem; font-weight:600; border-bottom:1px solid var(--surface-container-high);">My Bookings</a>`;

    userMenu.innerHTML = `
      <div style="width:36px; height:36px; border-radius:50%; background:var(--secondary); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700;">${initial}</div>
      <div class="user-dropdown" style="display:none; position:absolute; top:45px; right:0; background:#fff; border-radius:var(--radius-default); box-shadow:var(--shadow-lg); min-width:150px; overflow:hidden; z-index:1001; border:1px solid var(--surface-container-high);">
        ${adminLink}
        ${dashboardLink}
        <div id="nav-signout" style="padding:10px 15px; color:var(--error); font-size:0.9rem; font-weight:600;">Sign Out</div>
      </div>
    `;
    
    userMenu.addEventListener('click', (e) => {
      const dropdown = userMenu.querySelector('.user-dropdown');
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      e.stopPropagation();
    });
    
    document.addEventListener('click', () => {
      const dropdown = userMenu.querySelector('.user-dropdown');
      if(dropdown) dropdown.style.display = 'none';
    });

    userMenu.querySelector('#nav-signout').addEventListener('click', () => {
      signOut(auth).then(() => window.location.reload());
    });

    navContainer.appendChild(userMenu);
    
  } else {
    // User is signed out
    const signInBtn = document.createElement('a');
    signInBtn.href = "login.html";
    signInBtn.className = "btn-signin";
    signInBtn.textContent = "Sign In";
    navContainer.appendChild(signInBtn);
  }
});
