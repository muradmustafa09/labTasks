# CV Web Page Project

This is a simple and clean personal CV (Curriculum Vitae) web page built using **HTML**, **CSS**, and **Flexbox** for layout.

## 📁 Project Structure

```
Lab1/
├── images/
│   ├── certificate.png
│   ├── contact.png
│   ├── education.png
│   ├── email.png
│   ├── github.png
│   ├── instagram.png
│   ├── language.png
│   ├── location.png
│   ├── phone.png
│   ├── profile.jpg
│   ├── profile.png
│   ├── project.png
│   ├── reference.png
│   ├── skill.png
│   ├── social-media.png
│   ├── tik-tok.png
│   └── work-experience.png
├── scripts/
│    └──main.js  
├── index.html
├── style.css
└── README.md
```

---
---

## 🎨 Features

- 📱 **Responsive layout** using Flexbox  
- 🖼️ **Sidebar** with a profile picture and accordion-style sections  
- 📝 **Main content area** displaying CV details with collapsible panels  
- 🎨 Custom icons stored in the `images/` folder  
- ✨ Clean, modern design using the **Poppins** font from Google Fonts  
- ⚙️ **JavaScript functionality** added for interactive editing — you can edit CV sections dynamically without reloading the page (edit, add, and save content inline)  
- ✅ **Validation system** prevents saving if fields are empty — fields with missing content are highlighted  
- ✍️ **Inline content editing** using `contentEditable` for elements like `<p>`, `<li>`, `<strong>`, `<h1>`, and `<h3>`  
- ➕ **“+ Add” button** allows users to insert new entries for sections such as:
  - Education  
  - Work Experience  
  - Certifications  
  - Skills  
  - Projects  
  - Languages  
- 💾 **Auto-saving to localStorage** — your edits persist even after refreshing the page  
- 🚦 **Visual feedback**:
  - Red underline for empty fields  
  - Blue highlight when pressing Enter moves to the next editable section  
- 📂 **Dynamic rendering** of all CV content from structured JavaScript object (`userData`)


## 📸 Images

All icons and images are placed inside the `images/` folder and are used across the page for various sections like:

- 📜 Certificates  
- 📞 Contact  
- 🎓 Education  
- 📧 Email  
- 💻 GitHub  
- 📸 Instagram  
- 🌐 Languages  
- 📍 Location  
- 📱 Phone  
- 👤 Profile Picture  
- 📁 Projects  
- 📑 References  
- 💪 Skills  
- 🌍 Social Media  
- 🎶 TikTok  
- 💼 Work Experience  

---

## 🎨 Styling

The styling is handled with **CSS** and organized class names for both the sidebar and main content area.

- Responsive and clean layout  
- Custom icons and hover effects  
- Accordion sections with smooth open/close animations  
- Uses the **Poppins** font from Google Fonts  

---

## 🚀 How to Run

1. Download or clone this project.  
2. Open `index.html` file with your preferred browser.  
3. Customize the content and images if needed.  
4. Use the interactive editing features to modify your CV content live on the page.  

---

## 📌 Notes

- All icons are local images stored in the `images/` folder.  
- The project uses external fonts via Google Fonts.  
- JavaScript is used to enhance UX with inline editing and content management.  
- Everything is cleanly organized for easy editing and extension.  

---

✅ That’s it — a clean, minimal CV web page with dynamic editing capabilities you can quickly customize and use! 🎉
