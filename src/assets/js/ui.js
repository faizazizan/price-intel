/**
 * UI Helper Functions
 * Handles form interactions, validation, and result display
 */

/**
 * Format currency with RM prefix
 */
export function formatCurrency(amount) {
    return `RM ${parseFloat(amount).toFixed(2)}`;
}

/**
 * Format percentage
 */
export function formatPercent(value) {
    return `${parseFloat(value).toFixed(2)}%`;
}

/**
 * Get form values from input fields
 */
export function getFormValues(formId) {
    const form = document.getElementById(formId);
    if (!form) return null;

    const formData = new FormData(form);
    const values = {};

    for (const [key, value] of formData.entries()) {
        values[key] = value;
    }

    return values;
}

/**
 * Display error message
 */
export function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
    }
}

/**
 * Hide error message
 */
export function hideError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
    }
}

/**
 * Validate number input
 */
export function validateNumber(value, min = 0, max = Infinity) {
    const num = parseFloat(value);
    if (isNaN(num)) return { valid: false, error: 'Please enter a valid number' };
    if (num < min) return { valid: false, error: `Value must be at least ${min}` };
    if (num > max) return { valid: false, error: `Value must be at most ${max}` };
    return { valid: true, value: num };
}

/**
 * Add inline validation to input field
 */
export function addInputValidation(inputId, min = 0, max = Infinity) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener('blur', function () {
        const validation = validateNumber(this.value, min, max);
        const errorId = `${inputId}-error`;

        if (!validation.valid) {
            showError(errorId, validation.error);
            this.classList.add('border-red-500');
        } else {
            hideError(errorId);
            this.classList.remove('border-red-500');
        }
    });

    input.addEventListener('input', function () {
        const errorId = `${inputId}-error`;
        hideError(errorId);
        this.classList.remove('border-red-500');
    });
}

/**
 * Show loading state
 */
export function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div></div>';
    }
}

/**
 * Create result card HTML
 */
export function createResultCard(title, value, description, badgeClass = '') {
    return `
    <div class="card-result">
      <h3 class="text-sm font-semibold text-gray-600 mb-2">${title}</h3>
      <p class="text-3xl font-bold text-gray-900 mb-2">${value}</p>
      ${description ? `<p class="text-sm text-gray-600">${description}</p>` : ''}
      ${badgeClass ? `<span class="badge ${badgeClass} mt-3">${badgeClass.includes('success') ? 'Profitable' : badgeClass.includes('danger') ? 'Loss' : 'Warning'}</span>` : ''}
    </div>
  `;
}

/**
 * Save to localStorage
 */
export function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
    }
}

/**
 * Load from localStorage
 */
export function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return null;
    }
}

/**
 * Clear form
 */
export function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

/**
 * Debounce function for performance
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
