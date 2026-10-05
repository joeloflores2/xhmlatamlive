/*
 * Formularios: validación accesible, anti-spam (honeypot + tiempo mínimo),
 * saneamiento y envío por fetch al endpoint configurado.
 * IMPORTANTE: el servidor receptor debe repetir validación y saneamiento.
 */
(() => {
  const MIN_FILL_MS = 3000;
  const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const clean = (value) =>
    String(value)
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
      .trim();

  const ageFrom = (iso) => {
    const birth = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(birth.getTime())) return null;
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age -= 1;
    return age;
  };

  const MESSAGES = {
    required: 'Este campo es obligatorio.',
    email: 'Escribe un correo válido, por ejemplo nombre@dominio.com.',
    tel: 'Escribe un teléfono válido: solo números, espacios, +, guiones o paréntesis.',
    url: 'Escribe un enlace completo que empiece con https://',
    date: 'Escribe una fecha válida que no sea futura.',
    number: 'Escribe la altura en centímetros, entre 120 y 230.',
    select: 'Selecciona una opción.',
    checkbox: 'Debes marcar esta casilla para continuar.',
    tooLong: 'El texto es demasiado largo.',
  };

  function validateField(field) {
    const value = field.type === 'checkbox' ? field.checked : clean(field.value);
    if (field.required && (field.type === 'checkbox' ? !value : value === '')) {
      return field.type === 'checkbox' ? MESSAGES.checkbox : field.tagName === 'SELECT' ? MESSAGES.select : MESSAGES.required;
    }
    if (field.type === 'checkbox' || value === '') return '';
    if (field.maxLength > 0 && value.length > field.maxLength) return MESSAGES.tooLong;
    if (field.type === 'email' && !EMAIL_RE.test(value)) return MESSAGES.email;
    if (field.type === 'tel' && !PHONE_RE.test(value)) return MESSAGES.tel;
    if (field.type === 'url') {
      try {
        const u = new URL(value);
        if (!['https:', 'http:'].includes(u.protocol)) return MESSAGES.url;
      } catch {
        return MESSAGES.url;
      }
    }
    if (field.type === 'date') {
      const age = ageFrom(value);
      if (age === null || age < 0 || (field.min && value < field.min)) return MESSAGES.date;
    }
    if (field.type === 'number') {
      const n = Number(value);
      if (!Number.isFinite(n) || n < Number(field.min) || n > Number(field.max)) return MESSAGES.number;
    }
    return '';
  }

  function setError(field, message) {
    const error = document.getElementById(`${field.id}-error`);
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      if (error) {
        error.textContent = message;
        error.hidden = false;
      }
    } else {
      field.removeAttribute('aria-invalid');
      if (error) {
        error.textContent = '';
        error.hidden = true;
      }
    }
  }

  function setStatus(form, type, html) {
    const status = form.querySelector('[data-form-status]');
    if (!status) return;
    status.className = `form__status is-${type}`;
    status.innerHTML = html;
    status.hidden = false;
    status.focus();
  }

  /* Formulario de jugadores: datos del tutor obligatorios si es menor de edad */
  function syncMinorRules(form) {
    const dob = form.querySelector('[name="fecha_nacimiento"]');
    if (!dob) return;
    const age = dob.value ? ageFrom(dob.value) : null;
    const isMinor = age !== null && age < 18;
    form.querySelectorAll('[data-conditional="minor"]').forEach((wrap) => {
      const input = wrap.querySelector('input');
      if (!input) return;
      input.required = isMinor;
      wrap.classList.toggle('is-required', isMinor);
      const label = wrap.querySelector('label');
      let mark = label?.querySelector('.req');
      if (isMinor && label && !mark) {
        mark = document.createElement('span');
        mark.className = 'req';
        mark.setAttribute('aria-hidden', 'true');
        mark.textContent = ' *';
        label.appendChild(mark);
      } else if (!isMinor && mark) {
        mark.remove();
        setError(input, '');
      }
    });
  }

  function payload(form) {
    const data = {};
    new FormData(form).forEach((value, key) => {
      if (key === '_gotcha') return;
      data[key] = clean(value);
    });
    data.pagina = location.pathname;
    return data;
  }

  const whatsappLink = () => {
    const { whatsapp, whatsappMessage } = window.HXM.config;
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage || '')}`;
  };

  function initForm(form) {
    const startedAt = Date.now();
    let started = false;
    const fields = [...form.querySelectorAll('input, select, textarea')].filter(
      (f) => f.type !== 'hidden' && f.name !== '_gotcha',
    );
    const track = (name, params) => window.HXM.analytics?.track(name, { form: form.dataset.form, ...params });

    form.addEventListener('focusin', () => {
      if (started) return;
      started = true;
      track('form_start');
    });

    fields.forEach((field) => {
      const evt = field.type === 'checkbox' || field.tagName === 'SELECT' || field.type === 'date' ? 'change' : 'blur';
      field.addEventListener(evt, () => {
        if (field.name === 'fecha_nacimiento') syncMinorRules(form);
        if (field.hasAttribute('aria-invalid') || evt === 'change') setError(field, validateField(field));
      });
      field.addEventListener('input', () => {
        if (field.hasAttribute('aria-invalid')) setError(field, validateField(field));
      });
    });

    syncMinorRules(form);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      syncMinorRules(form);

      let firstInvalid = null;
      fields.forEach((field) => {
        const message = validateField(field);
        setError(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        setStatus(form, 'error', '<p>Revisa los campos marcados para continuar.</p>');
        firstInvalid.focus();
        return;
      }

      const honeypot = form.querySelector('[name="_gotcha"]');
      if ((honeypot && honeypot.value) || Date.now() - startedAt < MIN_FILL_MS) {
        // Probable envío automatizado: se descarta sin revelar el motivo.
        setStatus(form, 'success', '<p>Gracias. Recibimos tu información.</p>');
        return;
      }

      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        setStatus(
          form,
          'info',
          `<p>El envío en línea se habilitará próximamente. Mientras tanto, escríbenos por <a href="${whatsappLink()}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">WhatsApp</a> y con gusto te atendemos.</p>`,
        );
        return;
      }

      form.classList.add('is-sending');
      form.setAttribute('aria-busy', 'true');
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload(form)),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        track('form_submit');
        track(form.dataset.event);
        form.reset();
        syncMinorRules(form);
        setStatus(form, 'success', '<p><strong>Solicitud enviada.</strong> Recibimos tu información; el equipo del proyecto se pondrá en contacto contigo.</p>');
      } catch {
        setStatus(
          form,
          'error',
          `<p>No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo, o escríbenos por <a href="${whatsappLink()}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">WhatsApp</a>.</p>`,
        );
      } finally {
        form.classList.remove('is-sending');
        form.removeAttribute('aria-busy');
      }
    });
  }

  document.querySelectorAll('form[data-form]').forEach(initForm);
})();
