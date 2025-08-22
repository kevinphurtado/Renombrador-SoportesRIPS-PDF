# Renombrador de Soportes RIPS (Resolución 2284 de 2023)

Este es el repositorio del **Renombrador de Soportes RIPS**, una herramienta web moderna y fácil de usar diseñada para ayudar a las entidades de salud a organizar sus archivos de soportes RIPS (Registros Individuales de Prestación de Servicios de Salud) de acuerdo con la nomenclatura exigida por la **Resolución 2284 de 2023** en Colombia.

La aplicación permite renombrar archivos PDF en lote y también revertir el proceso, todo directamente en el navegador y sin necesidad de instalar software adicional, garantizando la privacidad de los datos.

## 🚀 Características Principales

* **Renombrado en Lote**: Procesa carpetas completas de archivos PDF para aplicar la nueva nomenclatura de forma automática.
* **Reversión de Nombres**: Si cometiste un error o necesitas los nombres originales, puedes revertir los cambios con un solo clic.
* **Estructura Personalizable**: Permite configurar fácilmente los componentes del nombre del archivo:
    * NIT del prestador.
    * Número de la factura.
    * Tipo de soporte (HEV, EPI, PDX, etc.).
    * Campos opcionales para mes y tipo de profesional.
* **Interfaz Moderna e Intuitiva**: Diseñada con un estilo limpio y amigable, con funciones de arrastrar y soltar (Drag & Drop) para una mejor experiencia de usuario.
* **Seguridad y Privacidad**: Todo el procesamiento de archivos se realiza localmente en tu navegador. Ningún archivo o dato es subido a un servidor.
* **Carga de Sesión**: La herramienta guarda el último NIT utilizado en el almacenamiento local del navegador para agilizar futuros usos.

## 🛠️ Cómo Utilizar

Usar la herramienta es muy sencillo. Solo sigue estos pasos:

1.  **Abre el archivo `index.html`** en un navegador web moderno como Google Chrome, Firefox o Microsoft Edge.
2.  **Configura los Datos (Paso 1)**:
    * Ingresa el **NIT** de tu institución (sin el dígito de verificación).
    * Escribe el **Número de Factura** asociado a los soportes.
    * Selecciona el **Tipo de Soporte** que vas a procesar (por ejemplo, `HEV` para Hojas de Evolución). La descripción de cada sigla aparecerá debajo del selector.
    * (Opcional) Habilita y selecciona la **Fecha (Mes)** o el **Tipo de Profesional** si necesitas añadir esos sufijos al nombre del archivo.
3.  **Selecciona la Carpeta (Paso 2)**:
    * Puedes arrastrar y soltar la carpeta que contiene los archivos PDF directamente sobre el área punteada.
    * O bien, haz clic en el botón **"Selecciona la Carpeta"** para abrir el explorador de archivos y elegirla manualmente.
4.  **Procesa los Archivos**:
    * Una vez seleccionada la carpeta y concedidos los permisos, los botones de acción se activarán.
    * Haz clic en **"Renombrar Archivos"** para aplicar la nueva nomenclatura.
    * Haz clic en **"Revertir Nombres"** para restaurar los nombres originales (la herramienta debe estar configurada con los mismos datos con los que se renombraron).
5.  **Verifica los Resultados**:
    * La consola en la parte inferior de la página te mostrará un registro detallado de cada archivo procesado.
    * Al finalizar, revisa la carpeta en tu computador para confirmar que los nombres se han actualizado correctamente.

## 💻 Detalles Técnicos

* **Frontend**: La aplicación está construida puramente con **HTML5, CSS3 y JavaScript (Vanilla JS)**. No utiliza frameworks externos, lo que la hace ligera y rápida.
* **API del Sistema de Archivos**: Se utiliza la API moderna `File System Access API` (`window.showDirectoryPicker`) para interactuar de forma segura con el sistema de archivos local del usuario, permitiendo la lectura y modificación de archivos dentro de una carpeta seleccionada.
* **Diseño Responsivo**: La interfaz se adapta a diferentes tamaños de pantalla, aunque está optimizada para su uso en escritorio.

## 📄 Licencia

Este proyecto es de código abierto. Eres libre de usarlo, modificarlo y distribuirlo según tus necesidades.

## ✍️ Autor

* **Kevin Hurtado**
