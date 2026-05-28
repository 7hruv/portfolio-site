# Dhruv Chora Portfolio Site

## Project Overview
This project is a personal portfolio website for Dhruv Chora, designed to showcase past projects, client work, and technical skills. The site is optimized for performance, accessibility, and high conversion, primarily targeting small business clients.

The goal of the website is to act as a professional digital resume and lead-generation tool, featuring a clean, component-driven architecture that highlights the developer's capabilities.

## Key Features
- **Project & Client Showcases:** Reusable card components for displaying past work and client testimonials.
- **Contact Integration:** A functional contact form integrated with Web3Forms for direct inquiries.
- **Smooth Navigation:** Built-in smooth scrolling utilities for an enhanced user experience.
- **Performance Optimized:** Uses Next.js App Router and server-side rendering optimizations.
- **Centralized Data Management:** All portfolio data (projects, skills, client work) is managed from a single data source file, making updates straightforward.

## How It Works
The website is a React application utilizing the Next.js 16 App Router. The UI is constructed from a modular set of components divided into logical directories (`layout`, `sections`, `cards`, `ui`). 

When a user interacts with the site, they are presented with different sections (Hero, About, Contact) aggregated on the main pages. The data populating the portfolio and skills sections is statically imported from `lib/data.ts`. The contact form communicates with the Web3Forms API using an environment variable (`NEXT_PUBLIC_WEB3FORMS_KEY`) to handle form submissions without a dedicated backend server.

## Technology Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript, React 19
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Form Handling:** Web3Forms API
- **Hosting/Deployment:** Vercel

## Project Structure
- `/app`: Next.js App Router directory containing pages and layouts.
- `/components/layout`: Layout components such as the Navbar and Footer.
- `/components/sections`: Major page sections like Hero, About, and Contact.
- `/components/cards`: Reusable card components for displaying clients and projects.
- `/components/ui`: General UI components (e.g., FadeInUp animations, Buttons, Forms).
- `/components/utils`: Utility components (Analytics, SmoothScroller).
- `/lib/data.ts`: Centralized data source containing the arrays for projects, client work, and skills.

## Setup & Installation
1. Clone the repository and navigate into the `portfolio-site` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your Web3Forms access key:
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. View the application at `http://localhost:3000`.

## Main Entry Points
- **Next.js Pages:** Files within the `/app` directory (e.g., `app/page.tsx`).
- **Data Source:** `lib/data.ts` is the primary entry point for modifying the portfolio's content.

## Dependencies & Configuration
- **Dependencies:** React 19, Next.js 16, Tailwind CSS v4, Lucide React.
- **Configuration:** 
  - `next.config.mjs` for Next.js behavior.
  - `.env.local` for managing the Web3Forms API key.
  - `tailwind.config` / `postcss.config.mjs` for styling rules.
