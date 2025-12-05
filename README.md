# 🚗 How Was My Driving?

An interactive, responsive, and slightly sassy web application designed for drivers to receive feedback from fellow road users. This app is intended to be linked via a QR code sticker placed on a vehicle, allowing anyone to quickly rate driving skills (or lack thereof).

**Live Demo:** [https://Hassen-MARGI.github.io/R/](https://Hassen-MARGI.github.io/R/)

## 🎯 Purpose

The goal is simple: collect honest feedback from the road. Whether it's a compliment for a smooth merge or a complaint about cutting someone off, this app handles it with style and a touch of humor.

## ✨ Features

-   **Star Rating System**: Smooth, interactive 5-star rating component.
-   **Dynamic Sassy Messages**: The feedback text changes based on the rating selected.
    -   ⭐ "You're jealous"
    -   ⭐⭐⭐⭐⭐ "You're blind. Seek help, or learn to drive"
-   **Garbage Truck Animation**: A custom CSS animation where a garbage truck drives in, collects your feedback (represented as a trash bag), and drives away.
-   **Responsive Design**: Optimized for mobile users (who are scanning the QR code) and desktop browsers.
-   **Dark/Light Mode**: Features a unique fluid clip-path transition effect when toggling themes.
-   **Google Forms Integration**: Submissions are automatically sent to a backend Google Sheet for analysis.

## 🛠️ Technology Stack

-   **Frontend**: React.js, Vite
-   **Styling**: Pure CSS (Variables, Keyframes, Glassmorphism)
-   **Icons**: SVG Icons (Custom Recycle & Socials)
-   **Deployment**: GitHub Pages

## 🚀 Running Locally

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Hassen-MARGI/R.git
    cd R
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📦 Deployment

This project is configured for **GitHub Pages**.

To deploy changes:
```bash
npm run deploy
```
This script builds the project and pushes the `dist` folder to the `gh-pages` branch.

## 📄 License

MIT License. Free to use for your own questionable driving records.
