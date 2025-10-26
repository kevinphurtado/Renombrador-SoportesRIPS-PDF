export const getElement = (id) => document.getElementById(id);
export const querySelector = (selector) => document.querySelector(selector);

// Main App
export const appContainer = getElement('app');

// --- Header & Controls ---
export const mainSubtitle = getElement('main-subtitle');
export const configTitle = getElement('config-title');
export const toggleRipsBtn = getElement('toggle-rips');
export const toggleRemoverBtn = getElement('toggle-remover');
export const themeToggleBtn = getElement('theme-toggle');
export const helpToggleBtn = getElement('help-toggle');

// --- Tool Panes ---
export const toolRips = getElement('tool-rips');
export const toolRemover = getElement('tool-remover');

// --- RIPS Tool Inputs ---
export const nitInput = getElement('nit-input');
export const codigoInput = getElement('codigo-input');
export const prefixSelect = getElement('prefix-select');
export const prefixDesc = getElement('prefix-desc');

// --- Remover Tool Inputs ---
export const enableDoctypeCheckbox = getElement('enable-doctype-checkbox');
export const tipoDocumentoInput = getElement('tipo-documento-input');
export const enableExtQuitarCheckbox = getElement('enable-ext-quitar-checkbox');
export const extQuitarSelect = getElement('extQuitar');
export const enableFechaCheckbox = getElement('enable-fecha-checkbox');
export const fechaInput = getElement('fecha-input');
export const enableProfesionalCheckbox = getElement('enable-profesional-checkbox');
export const tipoProfesionalInput = getElement('tipo-profesional-input');

// --- File Selection ---
export const dropZone = getElement('drop-zone');
export const folderInput = getElement('folder-input');
export const fileInput = getElement('file-input');
export const selectBtn = getElement('select-btn');
export const switchSelectionModeBtn = getElement('switch-selection-mode');
export const selectionModeIndicator = getElement('selection-mode-indicator');

// --- Action Buttons ---
export const previewBtn = getElement('preview-btn');
export const confirmRenameBtn = getElement('confirm-rename-btn');
export const revertBtn = getElement('revert-btn');
export const clearBtn = getElement('clear-btn');

// --- Stats & Progress ---
export const statCount = getElement('stat-count');
export const statStatus = getElement('stat-status');
export const progressBar = querySelector('.progress-bar');
export const logContainer = getElement('log-container');

// --- Modals ---
export const previewModal = getElement('preview-modal');
export const previewCount = getElement('preview-count');
export const previewList = getElement('preview-list');
export const applyFromPreviewBtn = getElement('apply-from-preview-btn');

export const confirmModal = getElement('confirm-modal');
export const confirmCount = getElement('confirm-count');
export const confirmList = getElement('confirm-list');
export const applyConfirmBtn = getElement('apply-confirm');

export const successModal = getElement('success-modal');
export const successTitle = getElement('success-title');
export const successMsg = getElement('success-msg');

export const helpModal = getElement('help-modal');
export const helpTutorialContent = getElement('tutorial-content');
export const helpSupportContent = getElement('support-content');
export const tutorialTabs = document.querySelectorAll('.tutorial-tab');