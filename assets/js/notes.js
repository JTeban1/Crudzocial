import { protectPage }  from './auth.js';
import {addLog, current}  from '../js/logic_logs.js';

protectPage();

/**
 * @fileoverview CRUD notes management system with storage within userData[index].notes
 */
(function() {
    'use strict';

    let index = localStorage.getItem('index');
    let userData = JSON.parse(localStorage.getItem('users'));

    if (!userData[index].notes) {
        userData[index].notes = [];
        localStorage.setItem('users', JSON.stringify(userData));
    }

    let notas = userData[index].notes;
    let notaActual = null;

    document.addEventListener('DOMContentLoaded', function() {
        inicializarAplicacion();
    });

    /**
     * Loads notes from localStorage and refreshes the current user's notes array.
     * Updates the global index, userData, and notas variables.
     */
    function cargarNotasDesdeStorage() {
        index = localStorage.getItem('index');
        userData = JSON.parse(localStorage.getItem('users'));
        notas = userData[index].notes || [];
    }

    /**
     * Initializes the notes application by loading data, rendering notes, and setting up event listeners.
     */
    function inicializarAplicacion() {
        cargarNotasDesdeStorage();
        renderizarNotas();
        configurarEventListeners();
    }

    /**
     * Sets up event listeners for the main application buttons.
     */
    function configurarEventListeners() {
        document.getElementById('newNoteBtn').addEventListener('click', function() {
            crearNuevaNota();
        });
    }


    /**
     * Saves the current notes array to localStorage within the current user's data.
     */
    function guardarNotasEnStorage() {
        userData = JSON.parse(localStorage.getItem('users'));
        userData[index].notes = notas;
        localStorage.setItem('users', JSON.stringify(userData));
        
    }

    /**
     * Renders the notes list in the DOM, updating the notes count and generating HTML.
     * Shows empty state if no notes exist, otherwise generates note cards and sets up their event listeners.
     */
    function renderizarNotas() {
        const notesList = document.getElementById('notesList');
        const notesCount = document.getElementById('notesCount');

        notesCount.innerHTML = notas.length;

        if (notas.length === 0) {
            notesList.innerHTML = '<p class="text-muted text-center">No hay notas</p>';
            return;
        }

        generarHTMLNotas(notesList);
        configurarEventListenersNotas();
    }

    /**
     * Generates HTML for the notes list and inserts it into the provided element.
     * Creates Bootstrap card elements for each note with title and content preview.
     * @param {HTMLElement} notesList - The DOM element where the notes HTML will be inserted.
     */
    function generarHTMLNotas(notesList) {
        let html = '';

        notas.forEach(function(nota) {
            const isActive = notaActual && notaActual.id === nota.id;
            const preview = nota.contenido ? nota.contenido.substring(0, 50) + '...' : 'Sin contenido';
            const cardClass = isActive ? 'border-primary' : '';

            html += `
                <div class="card mb-2 ${cardClass}" style="cursor: pointer;" data-nota-id="${nota.id}">
                    <div class="card-body p-2">
                        <h6 class="mb-1">${nota.titulo}</h6>
                        <small class="text-muted">${preview}</small>
                    </div>
                </div>
            `;
        });

        notesList.innerHTML = html;
    }

    /**
     * Sets up click event listeners for all note cards in the notes list.
     * Each card will trigger note selection when clicked.
     */
    function configurarEventListenersNotas() {
        const notaCards = document.querySelectorAll('[data-nota-id]');
        for (let i = 0; i < notaCards.length; i++) {
            notaCards[i].addEventListener('click', function() {
                const notaId = parseInt(this.getAttribute('data-nota-id'));
                seleccionarNota(notaId);
            });
        }
    }

    /**
     * Selects a note by its ID and displays it in the main content area.
     * @param {number} id - The unique identifier of the note to select.
     */
    function seleccionarNota(id) {
        notaActual = notas.find(function(nota) {
            return nota.id === id;
        });

        if (notaActual) {
            renderizarNotas();
            mostrarNota();
        }
    }

    /**
     * Displays the currently selected note in the main content area.
     * Shows the note's title, content, and action buttons (Edit/Delete).
     */
    function mostrarNota() {
        const noteActions = document.getElementById('noteActions');
        const mainContent = document.getElementById('mainContent');

        noteActions.innerHTML = `
            <button class="btn btn-outline-warning btn-sm" id="editBtn">Editar</button>
            <button class="btn btn-outline-danger btn-sm" id="deleteBtn">Eliminar</button>
        `;

        mainContent.innerHTML = `
            <h4>${notaActual.titulo}</h4>
            <hr>
            <div style="white-space: pre-wrap;">${notaActual.contenido || '<em class="text-muted">Nota vacía</em>'}</div>
        `;

        configurarEventListenersVisualizacion();
    }

    /**
     * Sets up event listeners for the note viewing actions (Edit and Delete buttons).
     */
    function configurarEventListenersVisualizacion() {
        document.getElementById('editBtn').addEventListener('click', function() {
            editarNota();
        });

        document.getElementById('deleteBtn').addEventListener('click', function() {
            eliminarNota();
        });
    }

    /**
     * Displays the empty state when no note is selected.
     * Clears the current note selection and shows a placeholder message.
     */
    function mostrarEstadoVacio() {
        notaActual = null;
        const noteActions = document.getElementById('noteActions');
        const mainContent = document.getElementById('mainContent');

        noteActions.innerHTML = '';
        mainContent.innerHTML = `
            <div class="text-center text-muted py-5">
                <i class="fas fa-sticky-note fa-3x mb-3"></i>
                <p>Selecciona una nota o crea una nueva</p>
            </div>
        `;
    }

    /**
     * Creates a new note object and displays the form for editing.
     * Generates a unique ID using timestamp and logs the action.
     */
    function crearNuevaNota() {
        notaActual = {
            id: Date.now(),
            titulo: '',
            contenido: ''
        };
        addLog("Creaste una nota", current());
        mostrarFormulario(true);
    }

    /**
     * Initiates editing of the currently selected note.
     * Logs the action and displays the editing form.
     */
    function editarNota() {
        addLog("Cambiaste una nota", current());
        mostrarFormulario(false);
    }

    /**
     * Displays the note editing form with title and content inputs.
     * @param {boolean} esNueva - Indicates whether this is a new note or editing an existing one.
     */
    function mostrarFormulario(esNueva) {
        const noteActions = document.getElementById('noteActions');
        const mainContent = document.getElementById('mainContent');

        noteActions.innerHTML = `
            <button class="btn btn-success btn-sm" id="saveBtn">Guardar</button>
            <button class="btn btn-secondary btn-sm" id="cancelBtn">Cancelar</button>
        `;

        mainContent.innerHTML = `
            <div class="mb-3">
                <input type="text" class="form-control" id="tituloInput" 
                       placeholder="Título de la nota" value="${notaActual.titulo}">
            </div>
            <div>
                <textarea class="form-control" id="contenidoInput" rows="8" 
                          placeholder="Contenido de la nota">${notaActual.contenido}</textarea>
            </div>
        `;

        document.getElementById('tituloInput').focus();

        configurarEventListenersFormulario(esNueva);
    }

    /**
     * Sets up event listeners for the note editing form (Save, Cancel buttons and Enter key navigation).
     * @param {boolean} esNueva - Indicates whether this is a new note or editing an existing one.
     */
    function configurarEventListenersFormulario(esNueva) {
        document.getElementById('saveBtn').addEventListener('click', function() {
            guardarNota(esNueva);
        });

        document.getElementById('cancelBtn').addEventListener('click', function() {
            cancelar();
        });

        document.getElementById('tituloInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('contenidoInput').focus();
            }
        });
    }

    /**
     * Saves the current note with the form data.
     * Validates that at least title or content is provided, then saves and refreshes the display.
     * @param {boolean} esNueva - Indicates whether this is a new note (adds to array) or editing existing.
     */
    function guardarNota(esNueva) {
        const titulo = document.getElementById('tituloInput').value.trim();
        const contenido = document.getElementById('contenidoInput').value.trim();

        if (!titulo && !contenido) {
            alert('Escribe al menos un título o contenido');
            return;
        }

        notaActual.titulo = titulo || 'Sin título';
        notaActual.contenido = contenido;

        if (esNueva) {
            notas.unshift(notaActual);
        }

        guardarNotasEnStorage();
        renderizarNotas();
        mostrarNota();
    }

    /**
     * Deletes the currently selected note after user confirmation.
     * Removes the note from the array, logs the action, saves changes, and shows empty state.
     */
    function eliminarNota() {
        if (confirm(`¿Eliminar "${notaActual.titulo}"?`)) {
            notas = notas.filter(function(nota) {
                return nota.id !== notaActual.id;
            });
            
            addLog("Eliminaste una nota", current());

            guardarNotasEnStorage();
            renderizarNotas();
            mostrarEstadoVacio();
        }
    }

    /**
     * Cancels the current editing operation.
     * Returns to note view if the note exists, otherwise shows empty state.
     */
    function cancelar() {
        if (notas.find(function(nota) { 
            return nota.id === notaActual.id; 
        })) {
            mostrarNota();
        } else {
            mostrarEstadoVacio();
        }
        renderizarNotas();
    }

})();
