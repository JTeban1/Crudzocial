(function () {
  'use strict';

  let index = localStorage.getItem('index');
  let userData = JSON.parse(localStorage.getItem('users'));

  if (!index || !userData || !userData[index]) {
    alert('No hay sesión activa');
    window.location.href = '../../index.html';
    return;
  }

  if (!userData[index].imgs) {
    userData[index].imgs = [];
    localStorage.setItem('users', JSON.stringify(userData));
  }

  let imagenes = userData[index].imgs;

  const input = document.getElementById('imageInput');
  const uploadBtn = document.getElementById('uploadBtn');
  const gallery = document.getElementById('imageGallery');
  const modalImage = document.getElementById('modalImage');
  const previewModal = new bootstrap.Modal(document.getElementById('previewModal'));

  uploadBtn.addEventListener('click', () => {
    const file = input.files[0];
    if (!file) {
      alert('Selecciona una imagen');
      return;
    }

    redimensionarImagen(file, 600, function (dataUrl) {
      const nuevaImagen = {
        id: Date.now(),
        src: dataUrl,
        fecha: new Date().toISOString()
      };

      imagenes.unshift(nuevaImagen);
      guardarEnStorage();
      renderGaleria();
      input.value = '';
    });
  });

  function redimensionarImagen(file, maxWidth, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // Comprimir
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function guardarEnStorage() {
    userData[index].imgs = imagenes;
    localStorage.setItem('users', JSON.stringify(userData));
  }

  function renderGaleria() {
    if (imagenes.length === 0) {
      gallery.innerHTML = '<p class="text-center text-muted">No hay imágenes guardadas.</p>';
      return;
    }

    gallery.innerHTML = '';

    imagenes.forEach(img => {
      const col = document.createElement('div');
      col.className = 'col-md-4 col-sm-6';

      col.innerHTML = `
        <div class="card shadow-sm h-100">
          <img src="${img.src}" class="gallery-img card-img-top" alt="Imagen" data-src="${img.src}">
          <div class="card-body text-center">
            <button class="btn btn-outline-danger btn-sm" onclick="eliminarImagen(${img.id})">
              <i class="fas fa-trash"></i> Eliminar
            </button>
          </div>
        </div>
      `;

      gallery.appendChild(col);
    });

    // Añadir eventos para ver imágenes
    document.querySelectorAll('[data-src]').forEach(imgEl => {
      imgEl.addEventListener('click', () => {
        verImagen(imgEl.dataset.src);
      });
    });
  }

  // 👁️ Ver imagen en modal
  window.verImagen = function (src) {
    modalImage.src = src;
    previewModal.show();
  };

  // 🗑️ Eliminar imagen
  window.eliminarImagen = function (id) {
    if (confirm("¿Deseas eliminar esta imagen?")) {
      imagenes = imagenes.filter(img => img.id !== id);
      guardarEnStorage();
      renderGaleria();
    }
  };

  renderGaleria();
})();
