/* Visor de imágenes con <dialog>. Sin JS, los enlaces abren la imagen directamente. */
(() => {
  const dialog = document.getElementById('visor');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const body = dialog.querySelector('[data-modal-body]');
  let opener = null;

  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-lightbox]');
    if (!link) return;
    event.preventDefault();
    opener = link;
    const source = link.querySelector('img');
    body.replaceChildren();

    const img = document.createElement('img');
    img.src = link.getAttribute('href');
    img.alt = source?.alt || '';
    body.appendChild(img);

    const caption = document.createElement('p');
    caption.className = 'modal__caption';
    const title = document.createElement('span');
    title.textContent = link.dataset.caption || '';
    caption.appendChild(title);
    if (link.dataset.conceptual) {
      const tag = document.createElement('span');
      tag.className = 'concept-tag';
      tag.textContent = 'Imagen conceptual / proyecto en desarrollo';
      caption.appendChild(tag);
    }
    body.appendChild(caption);
    dialog.showModal();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('[data-modal-close]')) dialog.close();
  });

  dialog.addEventListener('close', () => opener?.focus());
})();
