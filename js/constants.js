export const RIPS_PREFIX_OPTIONS = {
    "HEV": "Resumen de atención u hoja de evolución", "EPI": "Epicrisis", "PDX": "Resultado de procedimientos de apoyo diagnóstico",
    "DQX": "Descripción quirúrgica", "RAN": "Registro de anestesia", "CRC": "Comprobante de recibido del usuario",
    "TAP": "Traslado asistencial Pacientes", "TNA": "Transporte no asistencial ambulatorio de la persona",
    "FAT": "Factura de venta por el cobro a la aseguradora SOAT o la ADRES", "FMO": "Factura de venta del material de osteosíntesis",
    "OPF": "Orden o prescripción facultativa", "LDP": "Lista de precios", "HAU": "Hoja atención de urgencia",
    "HAO": "Hoja atención odontológica", "HAM": "Hoja de administración de medicamentos", "OTR": "Autorización, documento y factura",
    "PDE": "Evidencia del envío del trámite respectivo"
};

export const DOC_TYPE_OPTIONS = ["CC", "RC", "TI", "CN", "TI"];
export const PROFESSIONAL_TYPE_OPTIONS = {"MED": "MED (Médico)", "ENF": "ENF (Enfermera)", "PED": "PED (Pediatría)"};
export const EXT_TO_REMOVE_OPTIONS = [
    "_ADULTEZ.pdf", "_VEJEZ.pdf", "_JV.pdf", "_F.pdf", "_ESC.pdf", "_TB.pdf", "_PRE.pdf", "_CT.pdf", 
    "_MM.pdf", "_PSA.pdf", "_EXM.pdf", "_PARTO.pdf", "_CESAREA.pdf", "_PARTO FALTA EPICRISIS.pdf"
];

export const HELP_TUTORIAL_CONTENT = `
    <h4>Herramienta: Renombrador RIPS</h4>
    <div class="step"><div class="step-number">1</div><div class="step-content"><div class="step-title">Configura los datos RIPS</div><p>Ingresa el NIT (sin dígito de verificación), el número de factura y selecciona el tipo de soporte.</p><div class="step-example">Ej: NIT: 891600091, Factura: IPS12345, Tipo: HEV</div></div></div>
    <div class="step"><div class="step-number">2</div><div class="step-content"><div class="step-title">Selecciona los archivos</div><p>Arrastra o selecciona la carpeta (o los archivos PDF individuales) que deseas renombrar.</p></div></div>
    <div class="step"><div class="step-number">3</div><div class="step-content"><div class="step-title">Previsualiza y Renombra</div><p>Usa "Vista previa" para revisar los cambios en un modal. Si todo es correcto, haz clic en "Renombrar".</p><div class="step-example">"informe.pdf" → "HEV_891600091_IPS12345_informe.pdf"</div></div></div>
    <hr>
    <h4>Herramienta: Modificador de Extensiones</h4>
    <div class="step"><div class="step-number">1</div><div class="step-content"><div class="step-title">Configura las modificaciones</div><p>Habilita y configura las opciones que deseas aplicar: quitar extensiones, agregar fecha, tipo de documento, etc.</p><div class="step-example">Ej: Quitar "_ADULTEZ.pdf", agregar prefijo "CC"</div></div></div>
    <div class="step"><div class="step-number">2</div><div class="step-content"><div class="step-title">Selecciona los archivos</div><p>Elige los archivos PDF a modificar, ya sea por carpeta o individualmente.</p></div></div>
    <div class="step"><div class="step-number">3</div><div class="step-content"><div class="step-title">Previsualiza y Renombra</div><p>Verifica los nuevos nombres en la vista previa y aplica los cambios con el botón "Renombrar".</p><div class="step-example">"12345_ADULTEZ.pdf" → "CC12345.pdf"</div></div></div>
`;