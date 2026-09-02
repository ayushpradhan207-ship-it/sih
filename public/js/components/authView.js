/**
 * VeriSkill — Authentication View Component (Login & Sign-Up)
 * Empowering Students via Proof, Not Claims.
 */

const AuthView = {
  _activeTab: 'login',
  _selectedRole: 'student',

  render(mode = 'login') {
    this._activeTab = mode;
    const isLogin = mode === 'login';

    return `
      <div class="min-h-[calc(100vh-4rem)] pt-20 pb-16 px-4 flex items-center justify-center bg-surface">
        <div class="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-surface-variant/40 overflow-hidden">
          
          <!-- Header Branding -->
          <div class="bg-primary-container text-on-primary p-8 text-center relative overflow-hidden">
            <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-secondary/20 rounded-full blur-2xl pointer-events-none"></div>
            <div class="relative z-10 flex flex-col items-center">
              <div class="w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-md mb-3">
                <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">verified_user</span>
              </div>
              <h1 class="font-headline-lg text-2xl font-bold tracking-tight">VeriSkill</h1>
              <p class="font-body-md text-xs text-secondary-fixed mt-1">Empowering Students via Proof, Not Claims.</p>
            </div>
          </div>

          <!-- Switchable Tabs -->
          <div class="p-6 pb-2">
            <div class="flex bg-surface-container rounded-2xl p-1 gap-1 border border-outline-variant/30">
              <button
                type="button"
                id="auth-tab-login"
                onclick="AuthView.switchTab('login')"
                class="flex-1 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-all duration-200 cursor-pointer ${isLogin ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}"
              >
                Log In
              </button>
              <button
                type="button"
                id="auth-tab-signup"
                onclick="AuthView.switchTab('signup')"
                class="flex-1 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-all duration-200 cursor-pointer ${!isLogin ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}"
              >
                Create Account
              </button>
            </div>
          </div>

          <!-- Form Body -->
          <div class="p-6 pt-2">
            <h2 id="auth-title" class="font-headline-md text-lg font-bold text-primary mb-4 text-center">
              ${isLogin ? 'Welcome back' : 'Create your account'}
            </h2>

            <!-- ===================== LOGIN FORM ===================== -->
            <form id="auth-login-form" novalidate class="${isLogin ? '' : 'hidden'} space-y-4" onsubmit="event.preventDefault(); AuthView.submitLogin();">
              <div id="login-form-error" class="hidden p-3 rounded-2xl bg-error-container text-on-error-container text-xs font-body-md border border-error/20 flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-error shrink-0">error</span>
                <span id="login-error-text">Invalid email or password.</span>
              </div>

              <div>
                <label class="block font-label-sm text-xs font-medium text-on-surface-variant mb-1.5" for="login-email">Email or Full Name</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">person</span>
                  <input
                    type="text"
                    id="login-email"
                    placeholder="student@veriskill.demo or your name"
                    class="w-full pl-10 pr-4 py-3 rounded-2xl border border-outline-variant text-xs md:text-sm font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all bg-surface-container-lowest"
                    autocomplete="username"
                  />
                </div>
                <p id="login-email-error" class="hidden text-error text-[11px] font-label-sm mt-1"></p>
              </div>

              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="font-label-sm text-xs font-medium text-on-surface-variant" for="login-password">Password</label>
                  <button type="button" onclick="Utils.showToast('Demo Mode: Any password accepted. Real reset flow coming soon.', 'info')" class="text-[11px] font-label-md text-secondary hover:underline cursor-pointer">
                    Forgot Password?
                  </button>
                </div>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">lock</span>
                  <input
                    type="password"
                    id="login-password"
                    placeholder="••••••••"
                    class="w-full pl-10 pr-4 py-3 rounded-2xl border border-outline-variant text-xs md:text-sm font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all bg-surface-container-lowest"
                    autocomplete="current-password"
                  />
                </div>
                <p id="login-password-error" class="hidden text-error text-[11px] font-label-sm mt-1"></p>
              </div>

              <!-- Remember Me & Demo Quick Fill -->
              <div class="flex items-center justify-between pt-1">
                <label class="flex items-center gap-2 cursor-pointer text-xs font-body-md text-on-surface-variant select-none">
                  <input type="checkbox" id="login-remember" checked class="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer"/>
                  <span>Remember Me</span>
                </label>

                <!-- Persona Quick-Logins -->
                <div class="text-[11px] font-label-md text-on-surface-variant flex items-center gap-1">
                  <span>Quick demo:</span>
                  <button type="button" onclick="AuthView.quickFill('student@veriskill.demo')" class="text-secondary hover:underline cursor-pointer font-bold">Student</button>
                  <span>•</span>
                  <button type="button" onclick="AuthView.quickFill('recruiter@veriskill.demo')" class="text-secondary hover:underline cursor-pointer font-bold">Recruiter</button>
                </div>
              </div>

              <button
                type="submit"
                id="login-submit-btn"
                class="w-full py-3.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <span>Log In to VeriSkill</span>
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <div class="text-center pt-2">
                <p class="font-body-md text-xs text-on-surface-variant">
                  New to VeriSkill? 
                  <button type="button" onclick="AuthView.switchTab('signup')" class="text-secondary font-semibold hover:underline cursor-pointer">Create an account</button>
                </p>
              </div>
            </form>

            <!-- ===================== SIGNUP FORM ===================== -->
            <form id="auth-signup-form" novalidate class="${!isLogin ? '' : 'hidden'} space-y-4" onsubmit="event.preventDefault(); AuthView.submitSignup();">
              <div id="signup-form-error" class="hidden p-3 rounded-2xl bg-error-container text-on-error-container text-xs font-body-md border border-error/20 flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-error shrink-0">error</span>
                <span id="signup-error-text">Please fill out all required fields.</span>
              </div>

              <!-- User Role Selector Pills -->
              <div>
                <label class="block font-label-sm text-xs font-medium text-on-surface-variant mb-1.5">Select Account Type</label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    id="role-btn-student"
                    onclick="AuthView.selectRole('student')"
                    class="py-2.5 px-2 rounded-2xl border text-center transition-all cursor-pointer font-label-md text-xs flex flex-col items-center gap-1 ${this._selectedRole === 'student' ? 'bg-primary-container text-on-primary border-primary-container shadow-sm' : 'bg-surface-container text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high'}"
                  >
                    <span class="material-symbols-outlined text-[18px]">school</span>
                    <span>Student</span>
                  </button>
                  <button
                    type="button"
                    id="role-btn-recruiter"
                    onclick="AuthView.selectRole('recruiter')"
                    class="py-2.5 px-2 rounded-2xl border text-center transition-all cursor-pointer font-label-md text-xs flex flex-col items-center gap-1 ${this._selectedRole === 'recruiter' ? 'bg-primary-container text-on-primary border-primary-container shadow-sm' : 'bg-surface-container text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high'}"
                  >
                    <span class="material-symbols-outlined text-[18px]">business_center</span>
                    <span>Recruiter</span>
                  </button>
                  <button
                    type="button"
                    id="role-btn-institution"
                    onclick="AuthView.selectRole('institution')"
                    class="py-2.5 px-2 rounded-2xl border text-center transition-all cursor-pointer font-label-md text-xs flex flex-col items-center gap-1 ${this._selectedRole === 'institution' ? 'bg-primary-container text-on-primary border-primary-container shadow-sm' : 'bg-surface-container text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high'}"
                  >
                    <span class="material-symbols-outlined text-[18px]">account_balance</span>
                    <span>Institution</span>
                  </button>
                </div>
              </div>

              <div>
                <label class="block font-label-sm text-xs font-medium text-on-surface-variant mb-1.5" for="signup-fullname">Full Name</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">person</span>
                  <input
                    type="text"
                    id="signup-fullname"
                    placeholder="Aarav Sharma"
                    class="w-full pl-10 pr-4 py-3 rounded-2xl border border-outline-variant text-xs md:text-sm font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all bg-surface-container-lowest"
                    autocomplete="name"
                  />
                </div>
                <p id="signup-fullname-error" class="hidden text-error text-[11px] font-label-sm mt-1"></p>
              </div>

              <div>
                <label class="block font-label-sm text-xs font-medium text-on-surface-variant mb-1.5" for="signup-email">Email Address</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">mail</span>
                  <input
                    type="email"
                    id="signup-email"
                    placeholder="aarav@soa.ac.in"
                    class="w-full pl-10 pr-4 py-3 rounded-2xl border border-outline-variant text-xs md:text-sm font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all bg-surface-container-lowest"
                    autocomplete="email"
                  />
                </div>
                <p id="signup-email-error" class="hidden text-error text-[11px] font-label-sm mt-1"></p>
              </div>

              <div>
                <label class="block font-label-sm text-xs font-medium text-on-surface-variant mb-1.5" for="signup-password">Password (min. 8 characters)</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">lock</span>
                  <input
                    type="password"
                    id="signup-password"
                    placeholder="••••••••"
                    oninput="AuthView.checkPasswordStrength(this.value)"
                    class="w-full pl-10 pr-4 py-3 rounded-2xl border border-outline-variant text-xs md:text-sm font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all bg-surface-container-lowest"
                    autocomplete="new-password"
                  />
                </div>
                <p id="signup-password-error" class="hidden text-error text-[11px] font-label-sm mt-1"></p>
                
                <!-- Password Strength Meter -->
                <div class="mt-2">
                  <div class="flex justify-between items-center text-[10px] font-label-md mb-1">
                    <span class="text-on-surface-variant">Password strength:</span>
                    <span id="pwd-strength-label" class="text-on-surface-variant">None</span>
                  </div>
                  <div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div id="pwd-strength-bar" class="h-full w-0 transition-all duration-300 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div>
                <label class="block font-label-sm text-xs font-medium text-on-surface-variant mb-1.5" for="signup-confirm-password">Confirm Password</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">check_circle</span>
                  <input
                    type="password"
                    id="signup-confirm-password"
                    placeholder="••••••••"
                    class="w-full pl-10 pr-4 py-3 rounded-2xl border border-outline-variant text-xs md:text-sm font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all bg-surface-container-lowest"
                    autocomplete="new-password"
                  />
                </div>
                <p id="signup-confirm-password-error" class="hidden text-error text-[11px] font-label-sm mt-1"></p>
              </div>

              <button
                type="submit"
                id="signup-submit-btn"
                class="w-full py-3.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <span>Create Account</span>
                <span class="material-symbols-outlined text-[18px]">verified</span>
              </button>

              <div class="text-center pt-2">
                <p class="font-body-md text-xs text-on-surface-variant">
                  Already have an account? 
                  <button type="button" onclick="AuthView.switchTab('login')" class="text-secondary font-semibold hover:underline cursor-pointer">Log In</button>
                </p>
              </div>
            </form>

          </div>

          <!-- Bottom Trust & Privacy Signals -->
          <div class="bg-surface-container-low border-t border-surface-variant/40 p-4 px-6 flex items-center justify-between text-[11px] font-label-md text-on-surface-variant">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">shield</span>
              <span>SHA-256 Verified Credentials</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[14px] text-secondary">lock</span>
              <span>One-Way Integrity, Privacy Preserved</span>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  switchTab(tab) {
    this._activeTab = tab;
    const loginForm = document.getElementById('auth-login-form');
    const signupForm = document.getElementById('auth-signup-form');
    const loginTab = document.getElementById('auth-tab-login');
    const signupTab = document.getElementById('auth-tab-signup');
    const authTitle = document.getElementById('auth-title');

    if (!loginForm || !signupForm) return;

    if (tab === 'login') {
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      if (loginTab) loginTab.className = 'flex-1 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-all duration-200 cursor-pointer bg-surface-container-lowest text-primary shadow-sm';
      if (signupTab) signupTab.className = 'flex-1 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-all duration-200 cursor-pointer text-on-surface-variant hover:text-primary';
      if (authTitle) authTitle.textContent = 'Welcome back';
    } else {
      loginForm.classList.add('hidden');
      signupForm.classList.remove('hidden');
      if (signupTab) signupTab.className = 'flex-1 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-all duration-200 cursor-pointer bg-surface-container-lowest text-primary shadow-sm';
      if (loginTab) loginTab.className = 'flex-1 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-all duration-200 cursor-pointer text-on-surface-variant hover:text-primary';
      if (authTitle) authTitle.textContent = 'Create your account';
    }
  },

  selectRole(role) {
    this._selectedRole = role;
    ['student', 'recruiter', 'institution'].forEach(r => {
      const btn = document.getElementById('role-btn-' + r);
      if (!btn) return;
      if (r === role) {
        btn.className = 'py-2.5 px-2 rounded-2xl border text-center transition-all cursor-pointer font-label-md text-xs flex flex-col items-center gap-1 bg-primary-container text-on-primary border-primary-container shadow-sm';
      } else {
        btn.className = 'py-2.5 px-2 rounded-2xl border text-center transition-all cursor-pointer font-label-md text-xs flex flex-col items-center gap-1 bg-surface-container text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high';
      }
    });
  },

  quickFill(email) {
    const input = document.getElementById('login-email');
    const pwd = document.getElementById('login-password');
    if (input) input.value = email;
    if (pwd) pwd.value = 'DemoPass123!';
    Utils.showToast(`Auto-filled ${email}`, 'info');
  },

  checkPasswordStrength(password) {
    const bar = document.getElementById('pwd-strength-bar');
    const label = document.getElementById('pwd-strength-label');
    if (!bar || !label) return;

    if (!password) {
      bar.style.width = '0%';
      bar.className = 'h-full w-0 transition-all duration-300 rounded-full';
      label.textContent = 'None';
      label.className = 'text-on-surface-variant';
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      bar.style.width = '25%';
      bar.className = 'h-full rounded-full transition-all bg-error';
      label.textContent = 'Weak';
      label.className = 'text-error font-semibold';
    } else if (score <= 3) {
      bar.style.width = '60%';
      bar.className = 'h-full rounded-full transition-all bg-amber-500';
      label.textContent = 'Fair';
      label.className = 'text-amber-600 font-semibold';
    } else {
      bar.style.width = '100%';
      bar.className = 'h-full rounded-full transition-all bg-tertiary-fixed-dim';
      label.textContent = 'Strong';
      label.className = 'text-on-tertiary-fixed-variant font-semibold';
    }
  },

  showFieldError(fieldId, message) {
    const errEl = document.getElementById(fieldId + '-error');
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.remove('hidden');
    }
    const input = document.getElementById(fieldId);
    if (input) input.classList.add('border-error');
  },

  clearFieldError(fieldId) {
    const errEl = document.getElementById(fieldId + '-error');
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.add('hidden');
    }
    const input = document.getElementById(fieldId);
    if (input) input.classList.remove('border-error');
  },

  async submitLogin() {
    const email = document.getElementById('login-email')?.value?.trim();
    const password = document.getElementById('login-password')?.value;
    const rememberMe = document.getElementById('login-remember')?.checked ?? true;
    let hasError = false;

    this.clearFieldError('login-email');
    this.clearFieldError('login-password');
    const formErr = document.getElementById('login-form-error');
    if (formErr) formErr.classList.add('hidden');

    if (!email) {
      this.showFieldError('login-email', 'Email address or name is required.');
      hasError = true;
    }

    if (!password) {
      this.showFieldError('login-password', 'Password is required.');
      hasError = true;
    }

    if (hasError) return;

    const btn = document.getElementById('login-submit-btn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span> Authenticating...';
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Authentication failed. Please check credentials.');
      }

      Auth.setSession(data.user, data.token, rememberMe);
      if (window.App) {
        App.state.role = data.user.role;
        App.state.currentUser = data.user;
        if (data.user.studentId) App.state.studentId = data.user.studentId;
      }

      Utils.showToast(`Welcome back, ${data.user.name}!`, 'success');
      Auth.redirectAfterLogin(data.user);
    } catch (err) {
      const errBox = document.getElementById('login-form-error');
      const errText = document.getElementById('login-error-text');
      if (errBox && errText) {
        errText.textContent = err.message || 'Login failed. Please try again.';
        errBox.classList.remove('hidden');
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>Log In to VeriSkill</span><span class="material-symbols-outlined text-[18px]">arrow_forward</span>';
      }
    }
  },

  async submitSignup() {
    const fullName = document.getElementById('signup-fullname')?.value?.trim();
    const email = document.getElementById('signup-email')?.value?.trim();
    const password = document.getElementById('signup-password')?.value;
    const confirmPassword = document.getElementById('signup-confirm-password')?.value;
    const role = this._selectedRole || 'student';
    let hasError = false;

    ['signup-fullname', 'signup-email', 'signup-password', 'signup-confirm-password'].forEach(f => this.clearFieldError(f));
    const formErr = document.getElementById('signup-form-error');
    if (formErr) formErr.classList.add('hidden');

    if (!fullName) {
      this.showFieldError('signup-fullname', 'Full Name is required.');
      hasError = true;
    }
    if (!email) {
      this.showFieldError('signup-email', 'Email address is required.');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.showFieldError('signup-email', 'Please enter a valid email address.');
      hasError = true;
    }

    if (!password) {
      this.showFieldError('signup-password', 'Password is required.');
      hasError = true;
    } else if (password.length < 8) {
      this.showFieldError('signup-password', 'Password must be at least 8 characters.');
      hasError = true;
    }

    if (password !== confirmPassword) {
      this.showFieldError('signup-confirm-password', 'Passwords do not match.');
      hasError = true;
    }

    if (hasError) return;

    const btn = document.getElementById('signup-submit-btn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span> Registering...';
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, role })
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Registration failed.');
      }

      Auth.setSession(data.user, data.token, true);
      if (window.App) {
        App.state.role = data.user.role;
        App.state.currentUser = data.user;
        if (data.user.studentId) App.state.studentId = data.user.studentId;
      }

      Utils.showToast(`Account created! Welcome, ${data.user.name}!`, 'success');
      Auth.redirectAfterLogin(data.user);
    } catch (err) {
      const errBox = document.getElementById('signup-form-error');
      const errText = document.getElementById('signup-error-text');
      if (errBox && errText) {
        errText.textContent = err.message || 'Signup failed. Please try again.';
        errBox.classList.remove('hidden');
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>Create Account</span><span class="material-symbols-outlined text-[18px]">verified</span>';
      }
    }
  }
};
