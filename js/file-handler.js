import { state, resetSelection, saveLastRenameMap } from './state.js';
import * as DOM from './dom.js';
import * as UI from './ui.js';

// --- File/Folder Selection ---
export async function selectFolder() {
    try {
        const handle = await window.showDirectoryPicker();
        await handleDirectory(handle);
    } catch (err) {
        if (err.name !== 'AbortError') UI.logMessage('Error al seleccionar carpeta: ' + err.message, 'error');
    }
}

export async function handleDirectory(handle) {
    try {
        const permission = await handle.requestPermission({ mode: 'readwrite' });
        if (permission !== 'granted') throw new Error('Permiso denegado por el usuario.');
        resetSelection();
        state.directoryHandle = handle;
        UI.updateDropZoneUI(`Carpeta: "${handle.name}"`);
        UI.logMessage(`Carpeta "${handle.name}" seleccionada y con permisos.`, 'success');
        await collectEntries();
    } catch (err) {
        UI.logMessage('Error al acceder a la carpeta: ' + err.message, 'error');
        resetSelection();
    } finally {
        UI.updateButtonsState();
    }
}

export async function handleFiles(files) {
    resetSelection();
    state.fileHandles = Array.from(files).filter(f => f.name.toLowerCase().endsWith('.pdf'));
    const pdfCount = state.fileHandles.length;
    if (pdfCount === 0) {
        UI.logMessage('No se seleccionaron archivos PDF.', 'error');
        return;
    }
    UI.updateDropZoneUI(`${pdfCount} archivo(s) PDF seleccionado(s)`, 'fa-file-pdf');
    UI.logMessage(`${pdfCount} archivo(s) seleccionado(s).`, 'success');
    await collectEntries();
    UI.updateButtonsState();
}

export async function collectEntries() {
    state.entriesList = [];
    if (state.directoryHandle) {
        for await (const entry of state.directoryHandle.values()) {
            if (entry.kind === 'file' && entry.name.toLowerCase().endsWith('.pdf')) {
                state.entriesList.push({ name: entry.name, handle: entry });
            }
        }
    } else if (state.fileHandles.length > 0) {
        state.entriesList = state.fileHandles.map(file => ({ name: file.name, file }));
    }
    UI.setSelectedCount(state.entriesList.length);
}


function buildNewNameForRips(origName) {
    const ripPrefix = `${DOM.prefixSelect.value}_${DOM.nitInput.value}_${DOM.codigoInput.value}_`;
    return origName.startsWith(ripPrefix) ? null : `${ripPrefix}${origName}`;
}

function buildNewNameForRemover(origName) {
    let baseName = origName.substring(0, origName.lastIndexOf('.'));
    let hasChanged = false;

    if (DOM.enableExtQuitarCheckbox.checked && origName.endsWith(DOM.extQuitarSelect.value)) {
        baseName = baseName.replace(DOM.extQuitarSelect.value.replace('.pdf',''), '');
        hasChanged = true;
    }
    
    const mesSuffix = DOM.enableFechaCheckbox.checked && DOM.fechaInput.value ? `_${DOM.fechaInput.value.split('-')[1]}` : '';
    if (mesSuffix && !baseName.endsWith(mesSuffix)) {
        baseName += mesSuffix;
        hasChanged = true;
    }

    const profesionalSuffix = DOM.enableProfesionalCheckbox.checked && DOM.tipoProfesionalInput.value ? `_${DOM.tipoProfesionalInput.value}` : '';
    if (profesionalSuffix && !baseName.endsWith(profesionalSuffix)) {
        baseName += profesionalSuffix;
        hasChanged = true;
    }

    const docTypePrefix = DOM.enableDoctypeCheckbox.checked && DOM.tipoDocumentoInput.value ? `${DOM.tipoDocumentoInput.value}` : '';
    if (docTypePrefix && !baseName.startsWith(docTypePrefix)) {
        baseName = docTypePrefix + baseName;
        hasChanged = true;
    }

    return hasChanged ? `${baseName}.pdf` : null;
}

export function generatePreviewData() {
    const buildFn = state.currentTool === 'rips' ? buildNewNameForRips : buildNewNameForRemover;
    const rows = [];
    for (const entry of state.entriesList) {
        const newName = buildFn(entry.name);
        if (newName && newName !== entry.name) {
            rows.push({ original: entry.name, nuevo: newName, entry });
        }
    }
    return rows;
}

// --- Core Processing Task ---
async function renameFile(entry, newName) {
    if (!state.directoryHandle) {
        UI.logMessage('Error: El renombrado real solo es posible en modo carpeta.', 'error');
        return false;
    }
    try {
        const file = await entry.handle.getFile();
        const newHandle = await state.directoryHandle.getFileHandle(newName, { create: true });
        const writable = await newHandle.createWritable();
        await writable.write(file);
        await writable.close();
        await state.directoryHandle.removeEntry(entry.name);
        UI.logMessage(`'${entry.name}' → '${newName}'`, 'success');
        return true;
    } catch (err) {
        UI.logMessage(`Error al procesar '${entry.name}': ${err.message}`, 'error');
        return false;
    }
}

export async function processTasks(tasks, successTitle, successMsgTemplate, saveMap = false) {
    let successCount = 0;
    UI.setProgress(0);
    UI.setStatus('procesando');

    for (const [index, task] of tasks.entries()) {
        if (await renameFile(task.entry, task.newName)) {
            successCount++;
        }
        UI.setProgress(Math.round(((index + 1) / tasks.length) * 100));
    }
    
    UI.setStatus('finalizado');
    const finalMsg = successMsgTemplate.replace('{s}', successCount).replace('{t}', tasks.length);
    UI.logMessage(`Proceso finalizado. ${finalMsg}`, 'info');
    DOM.successTitle.textContent = successTitle;
    DOM.successMsg.textContent = finalMsg;
    UI.openModal('success-modal');

    if (saveMap && tasks.length > 0) {
        const renameMap = tasks.map(t => ({ original: t.original, nuevo: t.newName }));
        saveLastRenameMap(renameMap);
    } else if (saveMap === false) { 
        saveLastRenameMap([]); 
    }

    await collectEntries();
    UI.updateButtonsState();
}