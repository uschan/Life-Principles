# Zenith Protocol // Life Principles

A curated list of **26 profound life principles** and their architectural analysis, designed as an "anti-fragile operating system" for life. Built with React, TypeScript, and Tailwind CSS.

## Features

- **The Database**: A structured archive of 35 life principles covering Core, Strategy, Mindset, Relations, and Systems.
- **Zenith Kernel**: An AI-powered decision support console (powered by **Gemini 2.5 Flash**) that audits your personal dilemmas against the principles.
- **Visual Generator**: Generates abstract, philosophical art representing each principle using **Gemini 2.5 Flash Image**, with automatic high-quality fallback visuals.
- **Share Protocol**: Export high-fidelity, aesthetic 3:4 principle cards for social sharing.

## Project Structure

- **Core**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI SDK (Gemini 2.5 series)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
npm install
```

### Development

To start the local development server:

```bash
npm run dev
```

## VPS Deployment Guide

Since this is a static site, environment variables must be available at **build time**.

1.  **Clone the repository**:
    ```bash
    git clone [your-repo-url]
    cd zenith-protocol
    ```

2.  **Configure API Key**:
    Create a `.env` file in the project root:
    ```bash
    nano .env
    ```
    Add your Google Gemini API Key (Must use the prefix `VITE_`):
    ```
    VITE_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```
    *(Save and exit: Ctrl+O, Enter, Ctrl+X)*

3.  **Install Dependencies**:
    ```bash
    npm install
    ```

4.  **Build the Project**:
    This step reads your `.env` file and bundles the key into the HTML/JS.
    ```bash
    npm run build
    ```

5.  **Serve**:
    Point your web server (Nginx/Apache) to the `dist` directory.

## Analytics

Umami analytics is integrated.
Website ID: `8b7793a1-6800-4c47-a5a7-b46233f5c989`

## Socials

Developed by [Wildsalt](https://wildsalt.me/).