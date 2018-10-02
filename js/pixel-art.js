$(document).ready(init);

function init() {
  detectarMouse();
  armarPaleta(nombreColores);
  armarGrilla();
  cargarEventosIniciales();
  cargarSuperheroeEnPantalla();
}


var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

var indicadorColor = document.getElementById('indicador-de-color');
var estadoMouse;
var estadoMouseE;

// Variables Jquery
var $paleta = $('#paleta');
var $grillaPixeles = $('#grilla-pixeles');
var $selectorColor = $('.color-paleta');


/* ============================================================
====================== Funciones Globales =====================
============================================================ */

// Funcion detectar estado mouse
function detectarMouse() {
  window.addEventListener("mousedown", () => estadoMouse = true);
  window.addEventListener("mouseup", () => estadoMouse = false);
  // Corregir el bug, cuando hacer un drag deja la seleccion en true.
  window.addEventListener("drag", () => estadoMouse = false);
}


// Funcion que arma la paleta de colores
function armarPaleta(lista) {
  for (pos in lista) {
    let $div = $("<div></div>");
    $div.addClass("color-paleta");
    $div.css("backgroundColor", lista[pos]);
    $div.appendTo("#paleta");
  }
}


// Function que arma la grilla de pixeles
function armarGrilla() {
  for (let i = 0; i < 1749; i++) {
    let $div = $("<div></div>");
    $div.addClass("pixel-grilla");
    $div.appendTo("#grilla-pixeles");
  }
}


// Funcion que carga los eventos iniciales
function cargarEventosIniciales() {
  addEvent("#color-personalizado", "change", seleccionarColorPersonalizado);
  addEvent(".color-paleta", "click", modificarColorPaleta);
  addEvent("#borrar", "click", borrarTodo);
  addEvent(".pixel-grilla", "mousedown", pintarPixel);
  addEvent(".pixel-grilla", "mouseover", pintarPixeles);
  addEvent("#guardar", "click", guardarPixelArt);
  addEvent("#eye-drop", "click", eyedropTool);
  addEvent("#bucket", "click", bucket);
}


// Funcion que carga cada superheroe en la pantalla
function cargarSuperheroeEnPantalla() {
  addEvent("#batman", "click", () => cargarSuperheroe(batman));
  addEvent("#wonder", "click", () => cargarSuperheroe(wonder));
  addEvent("#flash", "click", () => cargarSuperheroe(flash));
  addEvent("#invisible", "click", () => cargarSuperheroe(invisible));
}


/* ============================================================
======================= Helper functions ======================
============================================================ */

// Funciones para agregar o quitar eventos
function addEvent(target, trigger, action) {
  $(target).on(trigger, action);
}

function removeEvent(target, trigger, action) {
  $(target).off(trigger, action);
}


// Funcion para seleccionar un color de la paleta

function modificarColorPaleta(){
  let selectedColor = this.style.backgroundColor;
  indicadorColor.style.color = selectedColor;
}

// Function para pintar pixeles muchos pixeles
function pintarPixeles() {
  if(estadoMouse){
    let selectedColor = indicadorColor.style.color;
    this.style.backgroundColor = selectedColor;
    }
}

// Function para pintar un solo pixel
function pintarPixel() {
  let selectedColor = indicadorColor.style.color;
  this.style.backgroundColor = selectedColor;
}

/* ============================================================
================= Funciones de las herramientas ===============
============================================================ */

// Borrar todo al hacer click en el boton borrar
function borrarTodo() {
  $(".pixel-grilla").animate({
    "background-color": "none"
  },1000);
}

// function colorPersonalizado
function seleccionarColorPersonalizado() {
  colorActual = this.value;
  indicadorColor.style.color = colorActual;
}

// Selecciona un color del canvas y lo pone en el indicador de color.
// Se remueven los eventos actuales y se agregan dos nuevos
function eyedropTool() {
  let initialState = indicadorColor.style.color;
  removeEvent('.pixel-grilla', 'mousedown', pintarPixel);
  removeEvent('.pixel-grilla', 'mouseover', pintarPixeles);
  addEvent('.pixel-grilla', 'click', modificarColorPaleta);
  addEvent('.pixel-grilla', 'click', checkState);

  // funcion interna para chequear el estado del indicador de color, al hacer click, si cambia el color volver al estado nomar
  function checkState() {
    if (indicadorColor.style.color != initialState) {
      addEvent('.pixel-grilla', 'mousedown', pintarPixel);
      addEvent('.pixel-grilla', 'mouseover', pintarPixeles);
      removeEvent('.pixel-grilla', 'click', modificarColorPaleta);
      removeEvent('.pixel-grilla', 'click', checkState);
    }
  }
}

function bucket() {
  $('.pixel-grilla').css('backgroundColor', indicadorColor.style.color);
}
