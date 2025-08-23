# Grid Maker

A grid-maker website designed especially for artists. Upload your image and overlay a customizable grid to aid in accurate drawing reproduction.

---

## ✨ Features

- Upload any image and it will be displayed on a canvas with a proportional grid overlay.
- Customize:
  - Grid size (e.g., 5×5, 10×10),
  - Color of grid lines,
  - Grid line width,
  - Toggle grayscale mode for enhanced visibility.
- View real-world measurements (in centimeters) for each cell and the overall image dimensions—great for manual grid drawing.
- Export the final image as a PNG for printing or reference.

---

## 🛠 Tech Stack

- **Framework**: React + TypeScript (TSX)
- **Build Tool**: Vite
- **Design/UI**: Tailwind CSS, shadcn-ui components
- **Hosting**: Firebase

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- npm (bundled with Node)

### Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/Abishek-Web-Co/grid_maker.git
cd grid_maker

# Install dependencies
npm install

# Start development server
npm run dev
```

Now, visit `http://localhost:3000` (or the URL shown in your terminal) to view and test the app.

---

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

This will generate a production-ready output (usually in `dist/`).

### Firebase Hosting (if configured)

```bash
# Initialize Firebase (if not already done)
firebase init hosting

# Deploy
firebase deploy
```

Your site should now be live via Firebase Hosting—consult `firebase.json` for config details.

---

## 📂 Repository Structure

```
firebase.json, .firebaserc       → Firebase Hosting configuration
src/                             → Main React & TSX application
public/                          → Static assets like index.html
README.md                        → Project documentation (you’re here)
package.json, tsconfig.json, etc. → Project metadata & config
```

---

## 🤝 Contributing

Contributions are always welcome! Whether it’s improving accuracy, adding features like PDF export, or enhancing UX—feel free to open an issue or submit a pull request.

---

## 📜 License

Include your preferred license here, such as MIT.

---
