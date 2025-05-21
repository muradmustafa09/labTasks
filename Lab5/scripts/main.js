

let userData = JSON.parse(localStorage.getItem('cvUserData'));

if (!userData) {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      userData = data;
      localStorage.setItem('cvUserData', JSON.stringify(data));
    })
    .catch(error => console.error('JSON yüklənərkən xəta:', error));
} else {
}

function createAccordionSection(container, title, items, renderItem) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cvAccordionItem';

    const button = document.createElement('button');
    button.className = 'cvAccordionButton';
    button.innerHTML = `<img src='images/${title.toLowerCase().replace(/ /g,'-')}.png' class='cvButtonIcon'> ${title.toUpperCase()}`;
    itemDiv.appendChild(button);

    const panel = document.createElement('div');
    panel.className = 'cvAccordionPanel';
    items.forEach(item => renderItem(panel, item));
    itemDiv.appendChild(panel);

    container.appendChild(itemDiv);
}

function renderCV() {
    document.querySelector('h1').innerHTML = userData.name;
    document.querySelector('h3').textContent = userData.title;

    const leftContainer = document.querySelector('.cvLeftAccordion');
    leftContainer.innerHTML = '';

    createAccordionSection(leftContainer, 'Contact', userData.contact, (panel, c) => {
        const p = document.createElement('p');
        p.innerHTML = `<img src='images/${c.icon}' class='cvIcon'> ${c.text}`;
        panel.appendChild(p);
    });

    createAccordionSection(leftContainer, 'Social Media', userData.socialMedia, (panel, s) => {
        const p = document.createElement('p');
        p.innerHTML = `<img src='images/${s.icon}' class='cvIcon'> ${s.text}`;
        panel.appendChild(p);
    });

    createAccordionSection(leftContainer, 'Education', userData.education, (panel, e) => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${e.period}</strong><br>${e.school}`;
        panel.appendChild(p);
    });

    createAccordionSection(leftContainer, 'Skills', userData.skills, (panel, skill) => {
        let ul = panel.querySelector('ul');
        if (!ul) { ul = document.createElement('ul'); panel.appendChild(ul); }
        const li = document.createElement('li'); li.textContent = skill;
        ul.appendChild(li);
    });

    createAccordionSection(leftContainer, 'Languages', userData.languages, (panel, lang) => {
        let ul = panel.querySelector('ul');
        if (!ul) { ul = document.createElement('ul'); panel.appendChild(ul); }
        const li = document.createElement('li'); li.textContent = lang;
        ul.appendChild(li);
    });

    const rightContainer = document.querySelector('.cvRightAccordion');
    rightContainer.innerHTML = '';

    createAccordionSection(rightContainer, 'Profile', [userData.profile], (panel, txt) => {
        const p = document.createElement('p'); p.textContent = txt;
        panel.appendChild(p);
    });

    createAccordionSection(rightContainer, 'Work Experience', userData.workExperience, (panel, job) => {
        const p = document.createElement('p'); p.innerHTML = `<strong>${job.title}</strong>`;
        panel.appendChild(p);
        const ul = document.createElement('ul');
        job.details.forEach(d => { const li = document.createElement('li'); li.textContent = d; ul.appendChild(li); });
        panel.appendChild(ul);
    });

    createAccordionSection(rightContainer, 'Reference', [userData.reference], (panel, ref) => {
        const p = document.createElement('p'); p.textContent = ref;
        panel.appendChild(p);
    });

    createAccordionSection(rightContainer, 'Certifications', userData.certifications, (panel, cert) => {
        const p1 = document.createElement('p'); p1.innerHTML = `<strong>${cert.name}</strong>`;
        const p2 = document.createElement('p'); p2.textContent = cert.description;
        panel.append(p1, p2);
    });

    createAccordionSection(rightContainer, 'Projects', userData.projects, (panel, pr) => {
        const p1 = document.createElement('p'); p1.innerHTML = `<strong>${pr.name}</strong>`;
        const p2 = document.createElement('p'); p2.textContent = pr.description;
        panel.append(p1, p2);
    });
}

function saveCVToLocalStorage() {
    userData.name = document.querySelector('h1').innerHTML;
    userData.title = document.querySelector('h3').textContent;

    const getItemsFromPanel = (panelSelector, itemProcessor) => {
        return Array.from(document.querySelectorAll(panelSelector)).map(itemProcessor);
    };

    const getIconTextItems = (selector) => {
        return getItemsFromPanel(selector, el => {
            const img = el.querySelector('img');
            return {
                icon: img ? img.getAttribute('src').split('/').pop() : '',
                text: el.textContent.trim()
            };
        });
    };

    const getListItems = (selector) => {
        return Array.from(document.querySelectorAll(`${selector} ul li`)).map(li => li.textContent.trim());
    };

    const getParagraphItems = (selector) => {
        return getItemsFromPanel(selector, el => el.textContent.trim());
    };

    const getStrongAndListItems = (selector) => {
        const result = [];
        document.querySelectorAll(selector).forEach(panel => {
            const strong = panel.querySelector('strong');
            const ul = panel.querySelector('ul');
            if (strong && ul) {
                const details = Array.from(ul.querySelectorAll('li')).map(li => li.textContent.trim());
                result.push({ title: strong.textContent.trim(), details });
            }
        });
        return result;
    };

    const getDoubleParagraphItems = (selector) => {
        const result = [];
        document.querySelectorAll(selector).forEach(panel => {
            const ps = panel.querySelectorAll('p');
            if (ps.length >= 2) {
                result.push({
                    name: ps[0].textContent.trim(),
                    description: ps[1].textContent.trim()
                });
            }
        });
        return result;
    };

    userData.contact = getIconTextItems('.cvLeftAccordion .cvAccordionItem:nth-child(1) .cvAccordionPanel p');
    userData.socialMedia = getIconTextItems('.cvLeftAccordion .cvAccordionItem:nth-child(2) .cvAccordionPanel p');
    userData.education = getItemsFromPanel('.cvLeftAccordion .cvAccordionItem:nth-child(3) .cvAccordionPanel p', el => {
        const period = el.querySelector('strong')?.textContent.trim() || '';
        const school = el.innerHTML.replace(/<strong>.*<\/strong><br?>?/i, '').trim();
        return { period, school };
    });
    userData.skills = getListItems('.cvLeftAccordion .cvAccordionItem:nth-child(4) .cvAccordionPanel');
    userData.languages = getListItems('.cvLeftAccordion .cvAccordionItem:nth-child(5) .cvAccordionPanel');

    userData.profile = getParagraphItems('.cvRightAccordion .cvAccordionItem:nth-child(1) .cvAccordionPanel p')[0] || '';
    userData.workExperience = getStrongAndListItems('.cvRightAccordion .cvAccordionItem:nth-child(2) .cvAccordionPanel');
    userData.reference = getParagraphItems('.cvRightAccordion .cvAccordionItem:nth-child(3) .cvAccordionPanel p')[0] || '';
    userData.certifications = getDoubleParagraphItems('.cvRightAccordion .cvAccordionItem:nth-child(4) .cvAccordionPanel');
    userData.projects = getDoubleParagraphItems('.cvRightAccordion .cvAccordionItem:nth-child(5) .cvAccordionPanel');

    localStorage.setItem('cvUserData', JSON.stringify(userData));
}


document.addEventListener('DOMContentLoaded', function () {
    renderCV();

    const accordionButtons = document.querySelectorAll('.cvAccordionButton');
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            if (panel.classList.contains('active')) {
                panel.style.maxHeight = null;
                panel.classList.remove('active');
            } else {
                panel.classList.add('active');
                panel.style.maxHeight = '300px';
            }
        });
    });

    const editBtn = document.getElementById('editToggleBtn');
    let isEditable = false;
    const editableTagsSelector = 'p, li, h1, h3, strong';

    editBtn.addEventListener('click', () => {
        const editableTags = document.querySelectorAll(editableTagsSelector);
        if (isEditable) {
            let hasEmpty = false;
            editableTags.forEach(el => {
                if (el.textContent.trim() === '') {
                    el.style.borderBottom = '2px solid red';
                    hasEmpty = true;
                } else {
                    el.style.borderBottom = 'none';
                }
            });
            if (hasEmpty) {
                Swal.fire({ icon: 'error', title: 'Boş sahələr var!', text: 'Zəhmət olmasa bütün sahələri doldurun.', confirmButtonColor: '#d33' });
                return;
            }
            editableTags.forEach(el => {
                el.contentEditable = false;
                el.style.outline = 'none';
                el.style.cursor = 'default';
                el.style.borderBottom = 'none';
                el.style.color = '';
            });
            closeAllAccordions();
            removeAllAddButtons();
            editBtn.textContent = 'Edit';
            isEditable = false;
            saveCVToLocalStorage();
        } else {
            editableTags.forEach(el => {
                el.contentEditable = true;
                el.style.outline = '1px dashed #999';
                el.style.cursor = 'text';
                el.addEventListener('input', () => el.style.borderBottom = el.textContent.trim() === '' ? '2px solid red' : 'none');
                el.addEventListener('keydown', e => {
                    if (e.key === 'Enter') {
                        setTimeout(() => {
                            const sel = window.getSelection();
                            if (!sel.rangeCount) return;
                            let container = sel.getRangeAt(0).startContainer;
                            container = container.nodeType === 3 ? container.parentElement : container;
                            const nextEl = container.nextElementSibling;
                            (nextEl && nextEl.matches(editableTagsSelector) ? nextEl : container).style.color = 'darkblue';
                        }, 10);
                    }
                });
            });
            openAllAccordions();
            addAllAddButtons();
            editBtn.textContent = 'Stop Editing';
            isEditable = true;
        }
    });

    function openAllAccordions() {
        accordionButtons.forEach(btn => {
            const panel = btn.nextElementSibling;
            panel.classList.add('active'); panel.style.maxHeight = '300px';
        });
    }

    function closeAllAccordions() {
        accordionButtons.forEach(btn => {
            const panel = btn.nextElementSibling;
            panel.classList.remove('active'); panel.style.maxHeight = null;
        });
    }

    function removeAllAddButtons() {
        document.querySelectorAll('.addBtn, .inputGroup').forEach(el => el.remove());
    }

    function addAllAddButtons() {
        const panels = document.querySelectorAll('.cvAccordionPanel');
        panels.forEach(panel => {
            const title = panel.parentElement.querySelector('.cvAccordionButton')?.textContent.toLowerCase() || '';
            if (title.includes('social media') || title.includes('contact')) return;
            if (panel.querySelector('.addBtn')) return;
            const addBtn = document.createElement('button'); addBtn.textContent = '+ Add'; addBtn.className = 'addBtn'; addBtn.style.marginTop = '10px'; panel.appendChild(addBtn);
            addBtn.addEventListener('click', () => {
                if (panel.querySelector('.inputGroup')) return;
                const group = document.createElement('div'); group.className = 'inputGroup';
                const needsTitle = ['work experience','references','certifications','education'].some(w=>title.includes(w));
                let titleInput;
                if (needsTitle) {
                    titleInput = document.createElement('input'); titleInput.type='text'; titleInput.placeholder='Title'; titleInput.style.display='block'; titleInput.style.marginTop='10px'; group.appendChild(titleInput);
                }
                const descInput = document.createElement('input'); descInput.type='text'; descInput.placeholder='Description'; descInput.style.display='block'; descInput.style.marginTop='5px';
                const saveBtn = document.createElement('button'); saveBtn.textContent='Add New'; saveBtn.style.marginTop='5px';
                saveBtn.addEventListener('click', () => {
                    const t = titleInput ? titleInput.value.trim() : '';
                    const d = descInput.value.trim();
                    if ((needsTitle && !t) || !d) {
                        Swal.fire({ icon:'warning', title:'Boşluq buraxmısan!', text:'Lazımi sahələri doldurmalısan.', confirmButtonColor:'#3085d6' });
                        return;
                    }
                    const p = document.createElement('p');
                    p.innerHTML = needsTitle ? `<strong>${t}</strong><br>${d}` : d;
                    panel.insertBefore(p, addBtn);
                    group.remove();
                });
                group.append(descInput, saveBtn);
                panel.insertBefore(group, addBtn);
            });
        });
    }

    document.addEventListener('focusout', e => {
        if (e.target.tagName === 'STRONG') {
            const parent = e.target.parentElement;
            if (parent && parent.tagName !== 'STRONG') {
                const newStrong = document.createElement('strong');
                newStrong.innerHTML = e.target.innerHTML;
                e.target.replaceWith(newStrong);
            }
        }
    });
});

