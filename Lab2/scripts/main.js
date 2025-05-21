  const accordionButtons = document.querySelectorAll('.cvAccordionButton');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const panel = button.nextElementSibling;
      if (panel.classList.contains('active')) {
        panel.style.maxHeight = null;
        panel.classList.remove('active');
      } else {
        panel.classList.add('active');
        panel.style.maxHeight = "300px";
      }
    });
  });
