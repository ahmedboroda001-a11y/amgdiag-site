// AMGDiAG Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Header scroll
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('active'));
    });
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    const serviceSelect = form.querySelector('#service');
    const otherGroup = document.getElementById('otherServiceGroup');
    const otherInput = document.getElementById('otherService');

    if (serviceSelect && otherGroup) {
      serviceSelect.addEventListener('change', () => {
        if (serviceSelect.value === 'other') {
          otherGroup.style.display = 'block';
          otherInput.required = true;
        } else {
          otherGroup.style.display = 'none';
          otherInput.required = false;
          otherInput.value = '';
        }
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const car = form.car.value.trim();
      let service = form.service.value;
      const otherService = (form.otherService && form.otherService.value.trim()) || '';
      const message = form.message.value.trim();

      if (service === 'other' && otherService) {
        service = otherService;
      }

      const text = encodeURIComponent(
        `🚗 Новая заявка AMGDiAG\n\nИмя: ${name}\nТелефон: ${phone}\nАвто: ${car || '—'}\nУслуга: ${service || '—'}\nСообщение: ${message || '—'}`
      );

      // Prefer Telegram to @boroda63amg, fallback WhatsApp
      const telegramUrl = `https://t.me/boroda63amg?text=${text}`;
      const whatsappUrl = `https://wa.me/79163040101?text=${text}`;

      window.open(telegramUrl, '_blank');

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Отправлено ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
        if (otherGroup) otherGroup.style.display = 'none';
      }, 2500);
    });
  }


  // Model functions panel
  const modelFunctions = {
    "A-Class": ["Apple CarPlay / Android Auto", "Активация видео в движении", "Отключение предупреждений ремня", "Настройка освещения салона", "Eco / Sport режимы", "Персонализация стартового экрана", "Активация скрытых меню"],
    "B-Class": ["Apple CarPlay / Android Auto", "Активация видео в движении", "Настройка AirMatic (если есть)", "Отключение звуковых предупреждений", "Персонализация освещения", "Кодирование доводчиков дверей"],
    "C-Class": ["Apple CarPlay / Android Auto", "AMG-меню / Dynamic Select", "Agility Select", "Настройка отклика педали газа", "AirMatic / Agility Control", "Активация видео в движении", "Кодирование наружного освещения", "Персонализация MBUX / COMAND", "Отключение старт-стоп", "Активация скрытых ассистентов"],
    "CLA": ["Apple CarPlay / Android Auto", "Dynamic Select / Agility", "Настройка отклика газа", "Активация видео в движении", "Персонализация освещения", "Кодирование ассистентов"],
    "CLS": ["Apple CarPlay / Android Auto", "AMG-меню", "Agility / Dynamic Select", "AirMatic настройки", "Настройка отклика педали", "Персонализация COMAND / MBUX", "Активация видео в движении"],
    "E-Class": ["Apple CarPlay / Android Auto", "AMG-меню / Dynamic Select", "Agility Select", "AirMatic / E-Active Body Control", "Настройка отклика педали газа", "Активация видео в движении", "Кодирование освещения", "Персонализация ассистентов", "Отключение старт-стоп", "Скрытые пункты меню"],
    "S-Class": ["Apple CarPlay / Android Auto", "AMG-меню", "Agility / Dynamic Select", "AirMatic / Magic Body Control", "Настройка отклика педали", "Персонализация MBUX", "Активация видео в движении", "Кодирование комфорт-функций", "Индивидуальные профили", "Скрытые инженерные меню"],
    "CL": ["Apple CarPlay / Android Auto", "AMG-меню", "AirMatic настройки", "Настройка отклика педали", "Персонализация COMAND", "Активация видео в движении"],
    "SL": ["Apple CarPlay / Android Auto", "AMG-меню", "Dynamic Select", "Настройка отклика педали", "Персонализация освещения", "Активация видео в движении"],
    "SLK": ["Apple CarPlay / Android Auto", "Dynamic Select", "Настройка отклика педали", "Персонализация", "Активация видео в движении"],
    "AMG-GT": ["AMG-меню (расширенное)", "Настройка отклика педали газа", "Режимы Race / Sport+", "Персонализация AMG-панели", "Кодирование выхлопа (где доступно)", "Индивидуальные профили"],
    "AMG-GT4": ["AMG-меню", "Agility / Dynamic Select", "Настройка отклика педали", "AirMatic / AMG Ride Control", "Персонализация MBUX", "Race-режимы"],
    "G-Class": ["Apple CarPlay / Android Auto", "AMG-меню", "Настройка отклика педали", "Персонализация освещения", "Кодирование ассистентов", "Активация видео в движении", "Off-road параметры"],
    "GLA": ["Apple CarPlay / Android Auto", "Dynamic Select / Agility", "Настройка отклика педали", "Активация видео в движении", "Персонализация освещения"],
    "GLB": ["Apple CarPlay / Android Auto", "Dynamic Select", "Настройка отклика педали", "Активация видео в движении", "Персонализация"],
    "GLC": ["Apple CarPlay / Android Auto", "AMG-меню / Dynamic Select", "Agility Select", "AirMatic настройки", "Настройка отклика педали", "Активация видео в движении", "Персонализация ассистентов"],
    "GLE": ["Apple CarPlay / Android Auto", "AMG-меню", "Agility / Dynamic Select", "AirMatic / E-Active Body Control", "Настройка отклика педали", "Активация видео в движении", "Персонализация MBUX", "Кодирование комфорта"],
    "GLS": ["Apple CarPlay / Android Auto", "AMG-меню", "Agility Select", "AirMatic настройки", "Настройка отклика педали", "Активация видео в движении", "Персонализация", "Комфорт-функции"],
    "Maybach": ["Apple CarPlay / Android Auto", "Расширенные комфорт-функции", "AirMatic / Magic Body Control", "Персонализация MBUX", "Индивидуальные профили", "Активация видео в движении", "Скрытые меню комфорта"],
    "EQ": ["Apple CarPlay / Android Auto", "Персонализация MBUX", "Настройка режимов рекуперации", "Активация видео в движении", "Индивидуальные профили", "Кодирование ассистентов"]
  };

  const modelItems = document.querySelectorAll('.model-item[data-model]');
  const functionsPanel = document.getElementById('modelFunctions');
  const functionsTitle = document.getElementById('modelFunctionsTitle');
  const functionsGrid = document.getElementById('functionsGrid');

  if (modelItems.length && functionsPanel && functionsGrid) {
    modelItems.forEach(item => {
      item.addEventListener('click', () => {
        const key = item.getAttribute('data-model');
        const name = item.textContent.trim();
        const list = modelFunctions[key] || ["Диагностика и кодирование доступных блоков", "Персонализация функций комфорта", "Активация мультимедиа-возможностей"];

        // active state
        modelItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        functionsTitle.textContent = name + ' — доступные активации';
        functionsGrid.innerHTML = list.map(f => `<div class="function-item">${f}</div>`).join('');
        functionsPanel.style.display = 'block';
        functionsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }

  // Smooth parallax-like effect on hero (subtle)
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
      }
    }, { passive: true });
  }
});
