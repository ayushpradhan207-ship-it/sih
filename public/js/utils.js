/**
 * VeriSkill Utility Functions & Global Helpers
 */

const Utils = {
  /**
   * Generic API fetcher with error handling
   */
  async fetchAPI(endpoint, options = {}) {
    try {
      const defaultHeaders = { "Content-Type": "application/json" };
      const res = await fetch(endpoint, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers }
      });
      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || errorBody.error || `HTTP ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.error(`API Error on ${endpoint}:`, err);
      Utils.showToast(err.message || "Network request failed", "error");
      throw err;
    }
  },

  /**
   * Truncate SHA-256 or hexadecimal proof hash for clean display
   */
  truncateHash(hash, prefixLen = 10, suffixLen = 8) {
    if (!hash) return "sha256:0000...0000";
    if (hash.length <= prefixLen + suffixLen) return hash;
    return `${hash.slice(0, prefixLen)}...${hash.slice(-suffixLen)}`;
  },

  /**
   * Render verification badge HTML
   */
  renderVerificationBadge(status) {
    const s = (status || "VERIFIED").toUpperCase();
    if (s === "VERIFIED") {
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold badge-verified">
        <i class="fa-solid fa-circle-check text-emerald-600 text-[11px]"></i> VERIFIED
      </span>`;
    } else if (s === "PENDING") {
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold badge-pending">
        <i class="fa-solid fa-clock text-amber-600 text-[11px]"></i> PENDING
      </span>`;
    } else if (s === "SELF-DECLARED") {
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold badge-self">
        <i class="fa-solid fa-user-pen text-slate-500 text-[11px]"></i> SELF-DECLARED
      </span>`;
    } else {
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold badge-gap">
        <i class="fa-solid fa-triangle-exclamation text-red-600 text-[11px]"></i> ${s}
      </span>`;
    }
  },

  /**
   * Render skill level badge HTML
   */
  renderLevelBadge(level) {
    const l = (level || "Intermediate").toLowerCase();
    if (l === "advanced" || l === "expert") {
      return `<span class="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">Advanced</span>`;
    } else if (l === "intermediate") {
      return `<span class="px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">Intermediate</span>`;
    } else {
      return `<span class="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">Beginner</span>`;
    }
  },

  /**
   * Show a toast message
   */
  showToast(message, type = "info") {
    const container = document.getElementById("toast-container") || document.body;
    const toast = document.createElement("div");
    
    let icon = "fa-info-circle text-blue-500";
    let border = "border-blue-200 bg-white";
    if (type === "success") {
      icon = "fa-check-circle text-emerald-500";
      border = "border-emerald-200 bg-emerald-50/95";
    } else if (type === "error") {
      icon = "fa-circle-xmark text-rose-500";
      border = "border-rose-200 bg-rose-50/95";
    }

    toast.className = `fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border ${border} text-slate-800 text-sm font-medium transition-all duration-300 transform translate-y-4 opacity-0`;
    toast.innerHTML = `<i class="fa-solid ${icon} text-base shrink-0"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("translate-y-4", "opacity-0");
    }, 10);

    setTimeout(() => {
      toast.classList.add("translate-y-4", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  /**
   * Modal management
   */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  }
};
