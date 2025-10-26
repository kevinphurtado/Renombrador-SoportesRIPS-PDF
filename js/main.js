// Contenido corregido y simplificado para js/main.js

import * as DOM from './dom.js';
import * as UI from './ui.js';
import * as FileHandler from './file-handler.js';
import { state, resetSelection, loadLastRenameMap } from './state.js';
import * as CONST from './constants.js';

// --- Event Listeners ---
function setupEventListeners() {
    // Header
    DOM.themeToggleBtn.addEventListener('click', UI.toggleTheme);
    DOM.helpToggleBtn.addEventListener('click', () => UI.openModal('help-modal'));
    DOM.querySelector('#version-link').addEventListener('click', (e) => {
        e.preventDefault();
        UI.openModal('version-modal');
    });
    DOM.toggleRipsBtn.addEventListener('click', () => switchTool('rips'));
    DOM.toggleRemoverBtn.addEventListener('click', () => switchTool('remover'));

    // File Selection
    DOM.selectBtn.addEventListener('click', FileHandler.selectFolder);
    DOM.folderInput.addEventListener('change', (e) => FileHandler.handleFiles(e.target.files));
    
    // Drop Zone
    ['dragover', 'dragenter'].forEach(event => DOM.dropZone.addEventListener(event, (e) => {
        e.preventDefault();
        DOM.dropZone.classList.add('drag-over');
    }));
    DOM.dropZone.addEventListener('dragleave', () => DOM.dropZone.classList.remove('drag-over'));
    DOM.dropZone.addEventListener('drop', handleDrop);
    DOM.dropZone.addEventListener('click', () => DOM.selectBtn.click());

    // Action Buttons
    DOM.previewBtn.addEventListener('click', showPreview);
    DOM.confirmRenameBtn.addEventListener('click', showConfirm);
    DOM.applyConfirmBtn.addEventListener('click', runRenameProcess);
    DOM.applyFromPreviewBtn.addEventListener('click', runRenameProcess);
    DOM.revertBtn.addEventListener('click', revertLastOperation);
    DOM.clearBtn.addEventListener('click', clearSelection);
    
    // Inputs
    [DOM.nitInput, DOM.codigoInput].forEach(el => el.addEventListener('input', UI.updateButtonsState));
    DOM.prefixSelect.addEventListener('change', () => {
        const opt = DOM.prefixSelect.options[DOM.prefixSelect.selectedIndex];
        DOM.prefixDesc.textContent = opt.title || 'Selecciona un tipo de soporte.';
    });

    // Remover Tool Checkboxes
    const removerInputs = [
        DOM.enableDoctypeCheckbox, DOM.tipoDocumentoInput, DOM.enableExtQuitarCheckbox,
        DOM.extQuitarSelect, DOM.enableFechaCheckbox, DOM.fechaInput,
        DOM.enableProfesionalCheckbox, DOM.tipoProfesionalInput
    ];
    removerInputs.forEach(el => el.addEventListener('change', () => {
        DOM.tipoDocumentoInput.disabled = !DOM.enableDoctypeCheckbox.checked;
        DOM.extQuitarSelect.disabled = !DOM.enableExtQuitarCheckbox.checked;
        DOM.fechaInput.disabled = !DOM.enableFechaCheckbox.checked;
        DOM.tipoProfesionalInput.disabled = !DOM.enableProfesionalCheckbox.checked;
        UI.saveRemoverSettings();
        UI.updateButtonsState();
    }));

    // Modals
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
        btn.addEventListener('click', () => UI.closeModal(btn.dataset.modalClose || btn.closest('.modal-overlay').id));
    });
    
    // Help Tabs
    DOM.tutorialTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            DOM.tutorialTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            DOM.helpTutorialContent.classList.toggle('active', tabId === 'tutorial');
            DOM.helpSupportContent.classList.toggle('active', tabId === 'support');
        });
    });
}

// --- Core Functions ---
function switchTool(tool) {
    state.currentTool = tool;
    UI.setToolUI(tool);
    UI.updateButtonsState();
}

function clearSelection() {
    resetSelection();
    UI.setSelectedCount(0);
    UI.resetDropZoneUI();
    UI.setStatus('esperando');
    UI.setProgress(0);
    UI.updateButtonsState();
}

async function handleDrop(e) {
    e.preventDefault();
    DOM.dropZone.classList.remove('drag-over');
    const handle = await e.dataTransfer.items[0]?.getAsFileSystemHandle();
    if (handle?.kind === 'directory') {
        await FileHandler.handleDirectory(handle);
    } else {
        UI.logMessage('Por favor, arrastra una carpeta.', 'error');
    }
}

function showPreview() {
    const data = FileHandler.generatePreviewData();
    if (data.length === 0) {
        alert('No hay cambios para previsualizar. Ningún archivo coincide con las reglas de modificación.');
        return;
    }
    UI.renderFileChangesList(DOM.previewList, DOM.previewCount, data);
    UI.openModal('preview-modal');
}

function showConfirm() {
    const data = FileHandler.generatePreviewData();
    if (data.length === 0) {
        alert('No hay cambios para aplicar.');
        return;
    }
    UI.renderFileChangesList(DOM.confirmList, DOM.confirmCount, data);
    UI.openModal('confirm-modal');
}

async function runRenameProcess() {
    UI.closeModal('preview-modal');
    UI.closeModal('confirm-modal');
    const data = FileHandler.generatePreviewData();
    const tasks = data.map(r => ({ ...r, newName: r.nuevo }));
    
    await FileHandler.processTasks(
        tasks, 
        'Proceso Completado', 
        'Se modificaron {s} de {t} archivo(s).',
        true 
    );
}

async function revertLastOperation() {
    if (state.lastRenameMap.length === 0) {
        alert('No hay ninguna operación reciente para revertir.');
        return;
    }
    
    if (!confirm(`Se revertirán los nombres de ${state.lastRenameMap.length} archivos de la última operación. ¿Deseas continuar?`)) {
        return;
    }
    
    UI.logMessage(`Iniciando reversión de ${state.lastRenameMap.length} archivos...`, 'info');
    
    if (!state.directoryHandle) {
        alert('Por favor, selecciona de nuevo la carpeta donde se realizó la operación para poder revertir los cambios.');
        await FileHandler.selectFolder();
        if (!state.directoryHandle) return; // User cancelled
    }
    
    await FileHandler.collectEntries();

    const tasks = [];
    for(const change of state.lastRenameMap) {
        const currentEntry = state.entriesList.find(e => e.name === change.nuevo);
        if (currentEntry) {
            tasks.push({ entry: currentEntry, newName: change.original, original: change.nuevo });
        } else {
            UI.logMessage(`No se encontró el archivo '${change.nuevo}' para revertir.`, 'error');
        }
    }

    if (tasks.length > 0) {
        await FileHandler.processTasks(
            tasks,
            'Reversión Completada',
            'Se revirtieron {s} de {t} archivo(s).',
            false // Don't save map, clear it
        );
    } else {
        UI.logMessage('No se encontraron archivos coincidentes para revertir.', 'info');
    }
}

// --- Initialization ---
function initializeApp() {
    UI.applyTheme();
    UI.populateAllSelects();
    DOM.helpTutorialContent.innerHTML = CONST.HELP_TUTORIAL_CONTENT;
    
    const savedNit = localStorage.getItem('savedRipsNIT');
    if (savedNit) DOM.nitInput.value = savedNit;
    DOM.nitInput.addEventListener('input', (e) => {
        localStorage.setItem('savedRipsNIT', e.target.value);
    });

    loadLastRenameMap();
    UI.loadRemoverSettings();
    setupEventListeners();
    UI.updateButtonsState();
    UI.logMessage('Interfaz lista. Bienvenido a la versión 3.3 (Simplificada).', 'info');
}

document.addEventListener('DOMContentLoaded', initializeApp);