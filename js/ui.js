// Contenido corregido y simplificado para js/ui.js

import * as DOM from './dom.js';
import * as CONST from './constants.js';
import { state } from './state.js';

// --- Logging & Status ---
export function logMessage(message, type = 'info') {
    const iconMap = { info: 'fa-info-circle', success: 'fa-check-circle', error: 'fa-exclamation-circle' };
    const div = document.createElement('div');
    div.className = `log-entry log-${type}`;
    div.innerHTML = `<i class="fas ${iconMap[type]}"></i> <span style="opacity:.8">[${new Date().toLocaleTimeString()}]</span>&nbsp; ${message}`;
    DOM.logContainer.appendChild(div);
    DOM.logContainer.scrollTop = DOM.logContainer.scrollHeight;
}

export function setStatus(text) { DOM.statStatus.textContent = 'Estado: ' + text; }
export function setProgress(percent) { DOM.progressBar.style.width = percent + '%'; }
export function setSelectedCount(n) { DOM.statCount.textContent = `${n} archivo(s)`; }

// --- Theme ---
export function applyTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark-theme', isDark);
    DOM.themeToggleBtn.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

export function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme();
}

// --- Tool Switching ---
export function setToolUI(tool) {
    const isRips = tool === 'rips';
    DOM.toolRips.classList.toggle('hidden', !isRips);
    DOM.toolRemover.classList.toggle('hidden', isRips);
    DOM.toggleRipsBtn.classList.toggle('active', isRips);
    DOM.toggleRemoverBtn.classList.toggle('active', !isRips);
    DOM.querySelector('h1').textContent = isRips ? 'Renombrador de Soportes RIPS' : 'Modificador de Extensiones';
    DOM.mainSubtitle.textContent = isRips ? 'Configura los datos para organizar tus archivos PDF.' : 'Quita terminaciones y/o agrega sufijos a los nombres.';
    DOM.configTitle.textContent = isRips ? 'Paso 1: Configurar Datos RIPS' : 'Paso 1: Configurar Modificaciones';
    updateButtonsState();
}

// --- Drop Zone UI ---
export function resetDropZoneUI() {
    DOM.dropZone.querySelector('i').className = 'fas fa-cloud-upload-alt';
    DOM.dropZone.querySelector('.drop-title').textContent = 'Arrastra y suelta una carpeta aquí';
    DOM.dropZone.querySelector('.drop-subtitle').textContent = 'o haz clic para seleccionar una carpeta';
}

export function updateDropZoneUI(message, icon = 'fa-folder-open') {
    DOM.dropZone.querySelector('i').className = `fas ${icon}`;
    DOM.dropZone.querySelector('.drop-title').textContent = message;
    DOM.dropZone.querySelector('.drop-subtitle').textContent = 'Haz clic para cambiar la selección';
}

// --- Button State ---
export function updateButtonsState() {
    const hasSelection = state.directoryHandle || state.fileHandles.length > 0;
    const nitOk = /^\d{5,15}$/.test(DOM.nitInput.value);
    const codigoOk = DOM.codigoInput.value.trim().length > 0;
    
    const ripsReady = state.currentTool === 'rips' && hasSelection && nitOk && codigoOk;
    const removerReady = state.currentTool === 'remover' && hasSelection && (
        DOM.enableExtQuitarCheckbox.checked || DOM.enableFechaCheckbox.checked || 
        DOM.enableProfesionalCheckbox.checked || DOM.enableDoctypeCheckbox.checked
    );

    DOM.previewBtn.disabled = !(ripsReady || removerReady);
    DOM.confirmRenameBtn.disabled = !(ripsReady || removerReady);
    DOM.revertBtn.disabled = state.lastRenameMap.length === 0;
    DOM.clearBtn.disabled = !hasSelection;
}

// --- Modals ---
export function openModal(modalId) { getModal(modalId).classList.add('active'); }
export function closeModal(modalId) { getModal(modalId).classList.remove('active'); }
const getModal = (id) => DOM.querySelector(`#${id}`);

export function renderFileChangesList(element, countEl, data) {
    countEl.textContent = data.length;
    element.innerHTML = data.slice(0, 200).map(r => `
        <div class="file-item">
            <span class="file-original">${escapeHtml(r.original)}</span>
            <span>→</span>
            <span class="file-new">${escapeHtml(r.nuevo)}</span>
        </div>
    `).join('') + (data.length > 200 ? '<div class="file-item">...y más</div>' : '');
}

// --- Populate Selects ---
export function populateSelect(selectEl, options, displayKeyAsText = false) {
    selectEl.innerHTML = '';
    for (const key in options) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = displayKeyAsText ? key : options[key];
        option.title = options[key];
        selectEl.appendChild(option);
    }
}

export function populateAllSelects() {
    populateSelect(DOM.prefixSelect, CONST.RIPS_PREFIX_OPTIONS, true);
    populateSelect(DOM.tipoDocumentoInput, CONST.DOC_TYPE_OPTIONS.reduce((acc, curr) => ({...acc, [curr]: curr }), {}));
    populateSelect(DOM.tipoProfesionalInput, CONST.PROFESSIONAL_TYPE_OPTIONS);
    populateSelect(DOM.extQuitarSelect, CONST.EXT_TO_REMOVE_OPTIONS.reduce((acc, curr) => ({...acc, [curr]: curr }), {}));
}

// --- Helpers ---
function escapeHtml(s) {
    return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

// --- Local Storage for Remover Tool ---
export function saveRemoverSettings() {
    const settings = {
        doctypeEnabled: DOM.enableDoctypeCheckbox.checked,
        doctypeValue: DOM.tipoDocumentoInput.value,
        extQuitarEnabled: DOM.enableExtQuitarCheckbox.checked,
        extQuitarValue: DOM.extQuitarSelect.value,
        fechaEnabled: DOM.enableFechaCheckbox.checked,
        fechaValue: DOM.fechaInput.value,
        profesionalEnabled: DOM.enableProfesionalCheckbox.checked,
        profesionalValue: DOM.tipoProfesionalInput.value,
    };
    localStorage.setItem('removerSettings', JSON.stringify(settings));
}

export function loadRemoverSettings() {
    const saved = localStorage.getItem('removerSettings');
    if (!saved) return;
    const settings = JSON.parse(saved);

    DOM.enableDoctypeCheckbox.checked = settings.doctypeEnabled;
    DOM.tipoDocumentoInput.value = settings.doctypeValue;
    DOM.tipoDocumentoInput.disabled = !settings.doctypeEnabled;

    DOM.enableExtQuitarCheckbox.checked = settings.extQuitarEnabled;
    DOM.extQuitarSelect.value = settings.extQuitarValue;
    DOM.extQuitarSelect.disabled = !settings.extQuitarEnabled;
    
    DOM.enableFechaCheckbox.checked = settings.fechaEnabled;
    DOM.fechaInput.value = settings.fechaValue;
    DOM.fechaInput.disabled = !settings.fechaEnabled;

    DOM.enableProfesionalCheckbox.checked = settings.profesionalEnabled;
    DOM.tipoProfesionalInput.value = settings.profesionalValue;
    DOM.tipoProfesionalInput.disabled = !settings.profesionalEnabled;
}