# 🎛️ DJ Tools Frontend

> 🚀 Modern e-commerce platform for DJ equipment, software, and educational content built with Next.js 14

[![CI/CD](https://img.shields.io/badge/CI%2FCD-Azure%20Pipelines-blue)](./azure-pipelines.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.30-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38bdf8)](https://tailwindcss.com/)

## 📖 Overview

DJ Tools Frontend is a comprehensive e-commerce platform designed for DJs of all skill levels. The platform combines product browsing, wishlist tracking, price drop alerts, and an extensive learning center with tutorials and guides.

## ✨ Features

### 🛒 E-commerce Functionality
- **Product Catalog** - Browse professional DJ equipment and software
- **Product Cards** - Beautiful, responsive product displays with images and pricing
- **Price Tracking** - Track original and current prices with discount indicators
- **Wishlist System** - Add products to your wishlist for later

### 🔔 Smart Price Alerts
- **Price Drop Detection** - Automatic monitoring of wishlist items
- **Real-time Notifications** - Toast alerts when prices drop
- **Price History** - Track saved prices vs. current prices
- **Simulation Mode** - Test price drop functionality
- **LocalStorage Persistence** - Wishlist and alerts persist across sessions

### 📚 Learning Center
- **Comprehensive Tutorials** - 8 detailed DJ tutorials covering:
  - 🎵 Basics of DJing
  - 🎯 Beatmatching Mastery
  - 🎛️ EQ and Filters
  - 🎼 Harmonic Mixing
  - 💿 Scratching Fundamentals
  - 🎤 Live Performance Tips
  - 💻 Digital DJ Software Guide
  - 🎚️ Audio Production for DJs
- **Skill Level Filtering** - Beginner, Intermediate, and Advanced content
- **Category Organization** - Tutorials organized by topic
- **Learning Paths** - Structured progression from beginner to advanced

### 🎨 Modern UI/UX
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Theme** - Stunning gradient backgrounds and modern styling
- **Smooth Animations** - Hover effects and transitions throughout
- **Emoji Enhancement** - Visual indicators and engaging design 😎
- **Navigation** - Responsive navigation with mobile menu support

### 🔧 Developer Features
- **TypeScript** - Full type safety across the codebase
- **Context API** - State management for wishlist and alerts
- **Custom Hooks** - Reusable hooks for wishlist and alert functionality
- **Component Architecture** - Modular, reusable components
- **Mock Data** - Sample products for development and testing

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: [Next.js 14.2.30](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript 5.x](https://www.typescriptlang.org/) - Type-safe JavaScript
- **UI Library**: [React 18](https://react.dev/) - Component-based UI
- **Styling**: [TailwindCSS 3.4.1](https://tailwindcss.com/) - Utility-first CSS

### Development Tools
- **Linting**: [ESLint 8](https://eslint.org/) with Next.js config
- **Fonts**: [Geist](https://vercel.com/font) - Modern font family optimized with `next/font`
- **Dev Container**: Azure CLI integration for cloud development

### CI/CD
- **Azure Pipelines** - Automated build, lint, and deployment pipeline
  - ✅ Dependency installation with `npm ci`
  - ✅ ESLint code quality checks
  - ✅ Build verification
  - ✅ Artifact publishing
  - 🎯 Triggers on main, develop, and feature branches
  - 🔀 PR validation for main and develop branches

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tannenbaum-gmbh/dj-tools-frontend.git
   cd dj-tools-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) 🎉

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🔥 Start development server with hot reload |
| `npm run build` | 🏗️ Build production application |
| `npm run start` | ▶️ Start production server |
| `npm run lint` | 🔍 Run ESLint code quality checks |

## 📁 Project Structure

```
dj-tools-frontend/
├── 📂 .devcontainer/          # Dev container configuration
├── 📂 .github/                # GitHub templates and agent configs
│   ├── 📂 ISSUE_TEMPLATE/     # Issue templates
│   ├── 📂 agents/             # AI agent configurations
│   └── 📂 prompts/            # Prompt templates
├── 📂 src/
│   ├── 📂 app/                # Next.js app directory
│   │   ├── 📂 tutorials/      # Tutorial pages
│   │   │   ├── 📂 [slug]/     # Dynamic tutorial routes
│   │   │   └── page.tsx       # Tutorials listing page
│   │   ├── 📂 wishlist/       # Wishlist page
│   │   ├── layout.tsx         # Root layout with navigation
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── 📂 components/         # Reusable React components
│   │   ├── AlertToast.tsx     # Toast notification component
│   │   ├── Navigation.tsx     # Main navigation component
│   │   ├── ProductCard.tsx    # Product display component
│   │   ├── Providers.tsx      # Context providers wrapper
│   │   └── WishlistToggle.tsx # Wishlist button component
│   ├── 📂 context/            # React Context providers
│   │   ├── AlertContext.tsx   # Alert/notification state
│   │   └── WishlistContext.tsx # Wishlist state management
│   └── 📂 lib/                # Utility functions and data
│       └── mockData.ts        # Sample product data
├── 📄 azure-pipelines.yml     # CI/CD pipeline configuration
├── 📄 next.config.mjs         # Next.js configuration
├── 📄 tailwind.config.ts      # Tailwind CSS configuration
├── 📄 tsconfig.json           # TypeScript configuration
└── 📄 package.json            # Project dependencies and scripts
```

## 🎯 Key Components

### Context Providers
- **WishlistContext**: Manages wishlist state, price tracking, and notifications
- **AlertContext**: Handles toast notifications with success, warning, and info types

### Pages
- **Home** (`/`): Hero section with featured products and call-to-action
- **Tutorials** (`/tutorials`): Learning center with filterable tutorial catalog
- **Tutorial Detail** (`/tutorials/[slug]`): Individual tutorial pages
- **Wishlist** (`/wishlist`): Personal wishlist with price drop indicators

### Components
- **Navigation**: Responsive navbar with mobile menu
- **ProductCard**: Reusable product display with wishlist integration
- **WishlistToggle**: Heart icon button for adding/removing from wishlist
- **AlertToast**: Notification system for user feedback

## 🌐 Development Container

The project includes a dev container configuration with:
- Universal development environment
- Azure CLI pre-installed for cloud integration
- Consistent development experience across teams

## 🔄 Continuous Integration

The Azure Pipelines CI ensures code quality with:
- ✅ Automated dependency installation
- ✅ Linting on every push and PR
- ✅ Build verification
- ✅ Artifact generation
- ✅ Node.js 20.x runtime

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!

### Deployment
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Made with ❤️ for the DJ community** 🎧🎵✨
