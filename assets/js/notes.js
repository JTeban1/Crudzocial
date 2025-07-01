/**
 * @fileoverview Sistema de gestion de notas CRUD
 */
(function() {
    'use strict';
    
    let notas = [];
    let notaActual = null;
    
    document.addEventListener('DOMContentLoaded', function() {
        inicializarAplicacion();
    });
    
    function inicializarAplicacion() {
        cargarNotasDesdeStorage();
        renderizarNotas();
        configurarEventListeners();
    }
    
    function configurarEventListeners() {
        document.getElementById('newNoteBtn').addEventListener('click', function() {
            crearNuevaNota();
        });
    }
    
    function cargarNotasDesdeStorage() {
        const notasGuardadas = localStorage.getItem('crudzocial_notas');
        if (notasGuardadas) {
            notas = JSON.parse(notasGuardadas);
        }
    }
    
    function guardarNotasEnStorage() {
        localStorage.setItem('crudzocial_notas', JSON.stringify(notas));
    }
    
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
     * Selecciona una nota por ID
     * @param {number} id - ID de la nota
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
            <div style="white-space: pre-wrap;">${notaActual.contenido || '<em class="text-muted">Nota vacia</em>'}</div>
        `;
        
        configurarEventListenersVisualizacion();
    }
    
    function configurarEventListenersVisualizacion() {
        document.getElementById('editBtn').addEventListener('click', function() {
            editarNota();
        });
        
        document.getElementById('deleteBtn').addEventListener('click', function() {
            eliminarNota();
        });
    }
    
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
    
    function crearNuevaNota() {
        notaActual = {
            id: Date.now(),
            titulo: '',
            contenido: '',
            fechaCreacion: new Date().toISOString()
        };
        
        mostrarFormulario(true);
    }
    
    function editarNota() {
        mostrarFormulario(false);
    }
    
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
                       placeholder="Titulo de la nota" value="${notaActual.titulo}">
            </div>
            <div>
                <textarea class="form-control" id="contenidoInput" rows="8" 
                          placeholder="Contenido de la nota">${notaActual.contenido}</textarea>
            </div>
        `;
        
        document.getElementById('tituloInput').focus();
        
        configurarEventListenersFormulario(esNueva);
    }
    
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
     * Guarda una nota (Create/Update)
     * @param {boolean} esNueva - Indica si es una nota nueva
     */
    function guardarNota(esNueva) {
        const titulo = document.getElementById('tituloInput').value.trim();
        const contenido = document.getElementById('contenidoInput').value.trim();
        
        if (!titulo && !contenido) {
            alert('Escribe al menos un titulo o contenido');
            return;
        }
        
        notaActual.titulo = titulo || 'Sin titulo';
        notaActual.contenido = contenido;
        notaActual.fechaModificacion = new Date().toISOString();
        
        if (esNueva) {
            notas.unshift(notaActual);
        }
        
        guardarNotasEnStorage();
        renderizarNotas();
        mostrarNota();
    }
    
    /**
     * Elimina la nota actual
     */
    function eliminarNota() {
        if (confirm(`Eliminar "${notaActual.titulo}"?`)) {
            notas = notas.filter(function(nota) {
                return nota.id !== notaActual.id;
            });
            
            guardarNotasEnStorage();
            renderizarNotas();
            mostrarEstadoVacio();
        }
    }
    
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