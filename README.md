# Renombrador de Soportes RIPS (Resolución 2284 de 2023)

Herramienta web local para renombrar masivamente archivos PDF de soportes clínicos y administrativos, siguiendo una estructura estandarizada inspirada en la **Resolución 2284 de 2023** del Ministerio de Salud de Colombia.

Esta aplicación se ejecuta completamente en el navegador del usuario, garantizando que los archivos nunca salgan de su equipo, lo que asegura total privacidad y seguridad.

## Motivación

La gestión y envío de los Registros Individuales de Prestación de Servicios de Salud (RIPS) en Colombia requiere que los soportes documentales (facturas, epicrisis, resultados de laboratorio, etc.) estén correctamente identificados. Una nomenclatura de archivos consistente y estandarizada es crucial para:

* Facilitar la auditoría y la trazabilidad.
* Cumplir con las normativas vigentes.
* Evitar errores y glosas durante el proceso de facturación a las entidades responsables de pago.

Esta herramienta fue creada para automatizar el tedioso proceso de renombrar cientos de archivos manualmente, reduciendo el riesgo de error humano y ahorrando una cantidad significativa de tiempo.

## Características Principales

* **Interfaz Moderna y Amigable**: Un diseño limpio e intuitivo que guía al usuario a través del proceso.
* **Configuración Dinámica**: Permite al usuario ingresar el NIT y el Código de Habilitación de la entidad prestadora.
* **Nomenclatura Flexible**: Incluye campos opcionales para la **fecha** del soporte y un **consecutivo** numérico, adaptándose a diversas necesidades.
* **Tipos de Soporte Predefinidos**: Un menú desplegable con los prefijos estandarizados para los soportes más comunes (HEV, EPI, FAT, etc.).
* **Descripciones Claras**: Al seleccionar un tipo de soporte, se muestra su nombre completo para evitar confusiones.
* **Seguridad y Privacidad**: Funciona 100% en el lado del cliente. **Ningún archivo se sube a internet**.
* **Procesamiento por Lotes**: Renombra cientos de archivos PDF en una carpeta con un solo clic.
* **Registro de Actividad**: Un panel de registro muestra en tiempo real qué archivos se están procesando, cuáles se completaron y si ocurrió algún error.

## Estructura del Nombre de Archivo

La herramienta construye el nuevo nombre de los archivos siguiendo esta estructura personalizable:

`[Prefijo]_[NIT]_[Cód. Habilitación]_[Fecha]_[Consecutivo]_[Nombre Original].pdf`

* **`[Prefijo]`**: El tipo de soporte seleccionado (ej. `FAT`).
* **`[NIT]`**: El NIT de la institución (ej. `891600091`).
* **`[Cód. Habilitación]`**: El código del servicio o sede (ej. `IPS8888`).
* **`[Fecha]`** (Opcional): La fecha seleccionada en formato `AAAAMMDD`.
* **`[Consecutivo]`** (Opcional): Un número que se formatea con ceros a la izquierda (ej. `001`).
* **`[Nombre Original].pdf`**: El nombre que el archivo tenía originalmente.

**Ejemplo de resultado:**
`FAT_891600091_IPS8888_20250814_001_factura-original-123.pdf`

## Cómo Usar

Para que la herramienta funcione correctamente, debe ejecutarse en un "entorno seguro", como lo exigen los navegadores modernos. La forma más sencilla de lograrlo es a través de un servidor local.

#### Paso 1: Iniciar un Servidor Local (Método recomendado con Python)

1.  Asegúrate de tener Python instalado en tu sistema.
2.  Abre una terminal o símbolo del sistema (`cmd` en Windows, `Terminal` en macOS/Linux).
3.  Navega hasta la carpeta donde guardaste el archivo `.html` usando el comando `cd`.
    ```bash
    cd ruta/a/tu/carpeta
    ```
4.  Ejecuta el siguiente comando para iniciar el servidor:
    ```bash
    python -m http.server
    ```
5.  Abre tu navegador web (Chrome, Edge, Firefox) y ve a la dirección `http://localhost:8000`.
6.  Haz clic en el nombre del archivo `.html` para abrir la herramienta.

#### Paso 2: Utilizar la Herramienta

1.  **Completa los campos**: Ingresa el NIT, Código de Habilitación y, si lo deseas, la fecha y un consecutivo.
2.  **Selecciona el Tipo de Soporte**: Elige el prefijo adecuado de la lista desplegable.
3.  **Selecciona la Carpeta**: Haz clic en el botón "Seleccionar Carpeta" y elige el directorio que contiene los archivos PDF que deseas renombrar.
4.  **Inicia el Proceso**: Presiona el botón "Renombrar Archivos PDF".
5.  **Verifica los Resultados**: El panel de registro te informará del progreso. Al finalizar, te mostrará un mensaje de éxito, indicando que ya puedes revisar tu carpeta en el explorador de archivos.

## Nota Técnica Importante

Esta aplicación utiliza la **File System Access API**, una tecnología web moderna que permite a las páginas web solicitar acceso para leer y escribir en archivos y carpetas locales. Por razones de seguridad, los navegadores solo permiten el uso de esta API en contextos seguros (`https` o `localhost`), razón por la cual es necesario el paso del servidor local.

## Tecnologías Utilizadas

* **HTML5**: Para la estructura de la página.
* **CSS3**: Para el diseño moderno y responsivo.
* **JavaScript (ES6+)**: Para toda la lógica funcional, incluyendo la manipulación de archivos a través de la File System Access API.

## Autor

**Creado por Kevin Hurtado (Versión de prueba)**
