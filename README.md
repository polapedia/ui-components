# 🧩 Polapedia — UI Components

**Polapedia UI Components** is a modular component library built for use across Polapedia applications.
This project uses **Next.js**, **TypeScript**, **Tailwind CSS**, and **Storybook** to document, preview, and test UI components in isolation.

Storybook provides a dedicated environment where developers and designers can visually inspect components, test interactive states, and maintain consistency in our design system.

---

## 📚 Table of Contents

- [🚀 Introduction](#-introduction)
- [⚙️ System Requirements](#️-system-requirements)
- [💡 Getting Started](#-getting-started)
  - [1️⃣ Clone Repository](#1️⃣-clone-repository)
  - [2️⃣ Install Dependencies](#2️⃣-install-dependencies)
  - [3️⃣ Run Storybook](#3️⃣-run-storybook)
  - [4️⃣ Build Storybook Static](#4️⃣-build-storybook-static)

- [🤖 Automated Linting (CI)](#-automated-linting-ci)
  - [🔍 How It Works](#-how-it-works)
  - [🛠 Fixing Linting Issues](#-fixing-linting-issues)
  - [📌 Local Commands](#-local-commands)

- [📁 Project Structure](#-project-structure)
- [📘 Storybook Guide](#-storybook-guide)
  - [📄 Writing Stories](#-writing-stories)
  - [🧩 Component Structure](#-component-structure)
  - [🎨 Icon Components](#-icon-components)

- [🧪 Addons Used](#-addons-used)
- [🤝 Contributing](#-contributing)
- [📝 Commit Message Convention](#-commit-message-convention)
- [✅ Notes](#-notes)

---

## 🚀 Introduction

### Overview

**Polapedia UI Components** is a shared UI library designed to offer:

- A unified **design system** across Polapedia products
- Isolated component previews using **Storybook 10**
- Auto-generated documentation using **Docs addon**
- Full support for **Next.js 16**, **React 19**, and **Tailwind CSS v4**

---

## ⚙️ System Requirements

| Requirement | Minimum Version              | Description            |
| ----------- | ---------------------------- | ---------------------- |
| **Node.js** | ≥ 20.x (Recommended: ≥ 22.x) | Runtime environment    |
| **npm**     | ≥ 9.x (Recommended: ≥ 11.x)  | Package manager        |
| **Git**     | Latest                       | Version control system |

Check versions:

```bash
node -v
npm -v
git --version
```

<p align="right">(<a href="#-table-of-contents">back to top</a>)</p>

---

## 💡 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/polapedia/ui-components.git
cd ui-components
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Run Storybook

Storybook runs on port **6006**:

```bash
npm run storybook
```

Open in your browser:

```
http://localhost:6006
```

---

### 4️⃣ Build Storybook Static

Generates a production-ready static Storybook build:

```bash
npm run build-storybook
```

Output:

```
storybook-static/
```

<p align="right">(<a href="#-table-of-contents">back to top</a>)</p>

---

## 🤖 Automated Linting (CI)

This repository includes a **GitHub Actions CI workflow** that automatically runs ESLint on every:

- `push` event to `main`
- `pull_request` targeting `main`

This ensures the codebase remains consistent, clean, and aligned with project linting rules.

### 🔍 How It Works

1. Developer pushes commit or opens a Pull Request.
2. GitHub Actions workflow (`.github/workflows/lint.yml`) runs automatically.
3. ESLint checks the entire project using:

```bash
npm run lint
```

4. If linting issues are found, the pipeline will **fail** and block merging to `main`.

---

### 🛠 Fixing Linting Issues

If CI reports lint errors:

1. Run the auto-fix script:

```bash
npm run lint:fix
```

2. Format code:

   ```bash
   npm run format
   ```

3. Commit your changes and push again:

   ```bash
   git add .
   git commit -m "style: apply lint and formatter fixes [POPE-69]"
   git push
   ```

If errors still persist, check the exact rule message in the GitHub Actions logs or run:

```bash
npm run lint
```

---

### 📌 Local Commands

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| `npm run lint`       | Run lint check                        |
| `npm run lint:fix`   | Automatically fix lint issues         |
| `npm run format`     | Validate formatting without modifying |
| `npm run format:fix` | Format codebase using Prettier        |

<p align="right">(<a href="#-table-of-contents">back to top</a>)</p>

---

## 📁 Project Structure

The following structure is based on the repository layout:

```
ui-components/
│
├── app/                        # Next.js App Router
│
├── components/                 # Main UI component directory
│   ├── badge/
│   │   ├── index.tsx
│   │   ├── index.stories.tsx
│   │   └── index.mdx
│   ├── button/
│   ├── chip/
│   ├── empty-state/
│   └── icons/                  # SVG icon components
│
├── .storybook/                 # Storybook configuration
│   ├── main.ts
│   ├── manager.ts              (optional)
│   ├── preview.ts
│   ├── theme.ts                (optional)
│   └── vitest.setup.ts
│
├── public/
├── storybook-static/           # Static Storybook build output
│
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── vitest.config.ts
└── vitest.shims.d.ts
```

### 📘 Explanation

- **components/** → Contains all reusable UI components
- **.storybook/** → Addons, framework config, global decorators
- **storybook-static/** → Deployment-ready Storybook build

---

## 📘 Storybook Guide

### 📄 Writing Stories

Example:

```
components/badge/index.stories.tsx
```

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Badge from '.';
import PlusOne from '../icons/PlusOneIcon';

const icons = {
  None: null,
  PlusOne: <PlusOne className="w-2.5 h-2.5 font-bold text-black" />,
};

const meta: Meta<typeof Badge> = {
  title: 'Design System/Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Badge',
    variant: 'primary',
    size: 'lg',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'destructive',
        'blue',
        'green',
        'brown',
        'red',
      ],
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'dot'],
    },
    leftIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    rightIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Primary: Story = {
  args: { variant: 'primary', children: 'Badge' },
};
```

You can also add MDX documentation:

```
components/badge/index.mdx
```

---

### 🧩 Component Structure

All components follow a consistent pattern:

```
component-name/
│── index.tsx
│── index.stories.tsx
└── index.mdx (optional docs)
```

---

### 🎨 Icon Components

Icons are standalone SVG components.
Example (`/components/icons/PlusOneIcon.tsx`):

```tsx
import { SVGProps } from 'react';

export default function PlusOneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="8"
      height="7"
      viewBox="0 0 8 7"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 1.5H2V3.5H0V4.5H2V6.5H3V4.5H5V3.5H3V1.5ZM5.25 0.54V1.45L6.5 1.2V6.5H7.5V0L5.25 0.54Z"
        fill="currentColor"
      />
    </svg>
  );
}
```

Icons can be styled with:

```tsx
<PlusOneIcon className="text-black" />
```

<p align="right">(<a href="#-table-of-contents">back to top</a>)</p>

---

## 🧪 Addons Used

Your Storybook configuration includes:

| Addon                           | Purpose                                     |
| ------------------------------- | ------------------------------------------- |
| **@storybook/addon-docs**       | Auto documentation                          |
| **@storybook/addon-a11y**       | Accessibility checks                        |
| **@storybook/addon-vitest**     | Test integration                            |
| **@storybook/nextjs-vite**      | Official Next.js + Vite Storybook framework |
| **@storybook/addon-essentials** | Controls, Actions, Viewport, Backgrounds    |
| **@chromatic-com/storybook**    | Visual regression testing (optional)        |

<p align="right">(<a href="#-table-of-contents">back to top</a>)</p>

---

## 🤝 Contributing

1. Create a new branch:

```bash
git checkout -b feature/POPE-123
```

2. Commit your work:

```bash
git commit -m "feat(button): add secondary variant [POPE-123]"
```

3. Push the branch:

```bash
git push origin feature/POPE-123
```

4. Open a Pull Request and assign reviewers.

<p align="right">(<a href="#-table-of-contents">back to top</a>)</p>

---

## 📝 Commit Message Convention

Format:

```
type(scope): subject [ticket-number]
```

### Common Types

| Type     | Meaning               |
| -------- | --------------------- |
| feat     | New feature           |
| fix      | Bug fix               |
| docs     | Documentation updates |
| style    | UI or formatting      |
| refactor | Code restructuring    |
| test     | Tests                 |
| chore    | Maintenance/config    |

**Example:**

```
feat(badge): add success variant [POPE-88]
```

<p align="right">(<a href="#-table-of-contents">back to top</a>)</p>

---

## ✅ Notes

- Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**
- Storybook supports Next.js features like `next/image` and routing
- Ready for static deployment using `npm run build-storybook`

<p align="right">(<a href="#-table-of-contents">back to top</a>)</p>

---
