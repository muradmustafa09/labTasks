document.addEventListener("DOMContentLoaded", function () {
  const editBtn = document.getElementById("editToggleBtn");
  let isEditable = false;
  const editableTagsSelector = "p, li, h1, h3, strong";
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

  editBtn.addEventListener("click", () => {
    const editableTags = document.querySelectorAll(editableTagsSelector);

    if (isEditable) {
      let hasEmpty = false;

      editableTags.forEach(el => {
        if (el.textContent.trim() === "") {
          el.style.borderBottom = "2px solid red";
          hasEmpty = true;
        } else {
          el.style.borderBottom = "none";
        }
      });

      if (hasEmpty) {
        Swal.fire({
          icon: 'error',
          title: 'Boş sahələr var!',
          text: 'Zəhmət olmasa bütün sahələri doldurun.',
          confirmButtonColor: '#d33'
        });
        return;
      } else {
        editableTags.forEach(el => {
          el.contentEditable = false;
          el.style.outline = "none";
          el.style.cursor = "default";
          el.style.borderBottom = "none";
          el.style.color = "";
        });

        closeAllAccordions();
        removeAllAddButtons();
        editBtn.textContent = "Edit";
        isEditable = false;
      }

    } else {
      editableTags.forEach(el => {
        el.contentEditable = true;
        el.style.outline = "1px dashed #999";
        el.style.cursor = "text";

        el.addEventListener("input", () => {
          el.style.borderBottom = el.textContent.trim() === "" ? "2px solid red" : "none";
        });

        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            setTimeout(() => {
              const sel = window.getSelection();
              if (sel.rangeCount > 0) {
                const range = sel.getRangeAt(0);
                let container = range.startContainer;
                if (container.nodeType === 3) {
                  container = container.parentElement;
                }
                let nextEl = container.nextElementSibling;
                (nextEl && nextEl.matches(editableTagsSelector) ? nextEl : container).style.color = "darkblue";
              }
            }, 10);
          }
        });
      });

      openAllAccordions();
      addAllAddButtons();
      editBtn.textContent = "Stop Editing";
      isEditable = true;
    }
  });

  function openAllAccordions() {
    accordionButtons.forEach(button => {
      const panel = button.nextElementSibling;
      panel.classList.add('active');
      panel.style.maxHeight = "300px";
    });
  }

  function closeAllAccordions() {
    accordionButtons.forEach(button => {
      const panel = button.nextElementSibling;
      panel.classList.remove('active');
      panel.style.maxHeight = null;
    });
  }

  function removeAllAddButtons() {
    document.querySelectorAll(".addBtn, .inputGroup").forEach(el => el.remove());
  }

 function addAllAddButtons() {
  const panels = document.querySelectorAll(".cvAccordionPanel");

  panels.forEach(panel => {
    const sectionTitle = (panel.parentElement.querySelector('.cvAccordionButton')?.textContent || "").toLowerCase();

    if (sectionTitle.includes("social media") || sectionTitle.includes("contact")) {
      return;
    }

    if (!panel.querySelector(".addBtn")) {
      const addBtn = document.createElement("button");
      addBtn.textContent = "+ Add";
      addBtn.className = "addBtn";
      addBtn.style.marginTop = "10px";
      panel.appendChild(addBtn);

      addBtn.addEventListener("click", () => {
        if (panel.querySelector(".inputGroup")) return;

        const inputGroup = document.createElement("div");
        inputGroup.className = "inputGroup";

        const isTitleRequired = ["work experience", "references", "certifications", "education"].some(word =>
          sectionTitle.includes(word)
        );

        let titleInput;
        if (isTitleRequired) {
          titleInput = document.createElement("input");
          titleInput.type = "text";
          titleInput.placeholder = "Title";
          titleInput.style.marginTop = "10px";
          titleInput.style.display = "block";
          inputGroup.appendChild(titleInput);
        }

        const descInput = document.createElement("input");
        descInput.type = "text";
        descInput.placeholder = "Description";
        descInput.style.marginTop = "5px";
        descInput.style.display = "block";

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Add New";
        saveBtn.style.marginTop = "5px";

        saveBtn.addEventListener("click", () => {
          const title = titleInput ? titleInput.value.trim() : "";
          const desc = descInput.value.trim();

          if ((isTitleRequired && !title) || !desc) {
            Swal.fire({
              icon: 'warning',
              title: 'Boşluq buraxmısan!',
              text: 'Lazımi sahələri doldurmalısan.',
              confirmButtonColor: '#3085d6'
            });
            return;
          }

          const p = document.createElement("p");
          p.innerHTML = isTitleRequired ? `<strong>${title}</strong><br>${desc}` : desc;

          panel.insertBefore(p, addBtn);
          inputGroup.remove();
        });

        inputGroup.appendChild(descInput);
        inputGroup.appendChild(saveBtn);
        panel.insertBefore(inputGroup, addBtn);
      });
    }
  });
}


  document.addEventListener("focusout", function (e) {
    if (e.target.tagName === "STRONG") {
      const parent = e.target.parentElement;
      if (parent && parent.tagName !== "STRONG") {
        const newStrong = document.createElement("strong");
        newStrong.innerHTML = e.target.innerHTML;
        e.target.replaceWith(newStrong);
      }
    }
  });
});
