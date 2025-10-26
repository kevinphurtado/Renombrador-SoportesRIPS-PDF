export const state = {
    currentTool: 'rips', // 'rips' or 'remover'
    selectionMode: 'folder', // 'folder' or 'file'
    directoryHandle: null,
    fileHandles: [],
    entriesList: [],
    lastRenameMap: [], // [{ original: 'a.pdf', nuevo: 'b.pdf' }, ...]
};

export function resetSelection() {
    state.directoryHandle = null;
    state.fileHandles = [];
    state.entriesList = [];
}

export function loadLastRenameMap() {
    const saved = localStorage.getItem('lastRenameOperation');
    if (saved) {
        state.lastRenameMap = JSON.parse(saved);
    } else {
        state.lastRenameMap = [];
    }
}

export function saveLastRenameMap(map) {
    localStorage.setItem('lastRenameOperation', JSON.stringify(map));
    state.lastRenameMap = map;
}