# Dhruv Chora - Portfolio Site

This is the portfolio website for Dhruv Chora, built with Next.js and Tailwind CSS. The design is heavily focused on performance, accessibility, and high conversion for small business clients.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript / React 19
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Hosting/Deployment:** Vercel

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd portfolio-site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file and add the required Web3Forms access key (for the contact form):
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure
The codebase follows a component-based architecture for maintainability:
- `app/` - Next.js App Router (pages and layouts)
- `components/layout/` - Layout components like Navbar and Footer
- `components/sections/` - Major page sections (Hero, About, Contact, etc.)
- `components/cards/` - Reusable card components (Client, Project)
- `components/ui/` - General UI components (FadeInUp, Buttons, Form, etc.)
- `components/utils/` - Utility components (Analytics, SmoothScroller)
- `lib/data.ts` - Centralized data source for projects, client work, and skills

## Build for Production
To build the application for production, run:
```bash
npm run build
```
This will compile the TypeScript, optimize assets, and create the `.next` directory ready for deployment.
