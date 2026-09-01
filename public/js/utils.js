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
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary-fixed/50 text-secondary border border-secondary-fixed">
        <span class="material-symbols-outlined text-[13px]" style="font-variation-settings: 'FILL' 1;">verified</span> VERIFIED
      </span>`;
    } else if (s === "PENDING") {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
        <span class="material-symbols-outlined text-[13px]">schedule</span> PENDING
      </span>`;
    } else if (s === "SELF-DECLARED") {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant border border-outline-variant/40">
        <span class="material-symbols-outlined text-[13px]">edit_note</span> SELF-DECLARED
      </span>`;
    } else {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-error-container text-on-error-container border border-error/20">
        <span class="material-symbols-outlined text-[13px]">warning</span> ${s}
      </span>`;
    }
  },

  /**
   * Render skill level badge HTML
   */
  renderLevelBadge(level) {
    const l = (level || "Intermediate").toLowerCase();
    if (l === "advanced" || l === "expert") {
      return `<span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-fixed/40 text-secondary border border-secondary-fixed">Advanced</span>`;
    } else if (l === "intermediate") {
      return `<span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container-high text-primary border border-outline-variant/30">Intermediate</span>`;
    } else {
      return `<span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container text-on-surface-variant border border-outline-variant/20">Beginner</span>`;
    }
  },

  /**
   * Show a toast message
   */
  showToast(message, type = "info") {
    const container = document.getElementById("toast-container") || document.body;
    const toast = document.createElement("div");
    
    let iconName = "info";
    let iconColor = "text-secondary";
    let border = "border-surface-variant/60 bg-surface-container-lowest text-primary shadow-[0_8px_30px_rgba(0,0,0,0.12)]";
    if (type === "success") {
      iconName = "check_circle";
      iconColor = "text-tertiary-fixed-dim";
      border = "border-secondary-fixed bg-surface-container-lowest text-primary shadow-[0_8px_30px_rgba(0,0,0,0.12)]";
    } else if (type === "error") {
      iconName = "error";
      iconColor = "text-error";
      border = "border-error/30 bg-surface-container-lowest text-primary shadow-[0_8px_30px_rgba(0,0,0,0.12)]";
    }

    toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-2xl border ${border} text-xs md:text-sm font-body-md font-medium transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto max-w-md`;
    toast.innerHTML = `<span class="material-symbols-outlined ${iconColor} text-[20px] shrink-0" style="font-variation-settings: 'FILL' 1;">${iconName}</span> <span>${message}</span>`;
    
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
