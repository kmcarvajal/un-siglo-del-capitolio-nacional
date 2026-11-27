# Un siglo del Capitolio Nacional

Especial multimedia sobre la historia del Capitolio Nacional de Colombia, su construcción, sus espacios arquitectónicos y su papel como sede del Congreso de la República.

## Tecnologías

- HTML5, CSS3 responsive y JavaScript vanilla.
- Tipografía Skilt Gothic cargada de forma local.
- Recursos gráficos en formato SVG y PNG.
- Sin frameworks de frontend.

## Estructura

```txt
.
├── index.html
├── assets/
│   ├── sliders-pc/
│   ├── sliders-mo/
│   └── Archivos SVG y PNG compartidos (pc-mo)
├── css/
│   ├── OpenType CFF Std/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```

## Implementación e interacciones

La página presenta una experiencia editorial de desplazamiento vertical. El archivo `js/main.js` controla las principales interacciones:

- Apertura y cierre de los seis puntos interactivos del Capitolio.
- Desplazamiento de la línea de tiempo mediante flechas y barra sincronizada.
- Cambio entre los gráficos del Senado y la Cámara de Representantes.

## Versión móvil (MO)

Para pantallas de hasta `640px`, se utilizan recursos gráficos y estilos específicos para móvil. La imagen interactiva del Capitolio y la línea de tiempo permiten desplazamiento horizontal.

## Diseño y fuentes

Los estilos, tipografías y ajustes responsive se encuentran en `css/styles.css`. Las fuentes de información y los créditos editoriales se ubican al final de la página.

## Ejecución

Abrir `index.html` en el navegador. No requiere instalación de dependencias ni compilación.
