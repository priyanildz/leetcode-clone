# LeetCode Clone

A simple LeetCode-style coding platform built using Angular.  
It includes a problem viewer, Monaco code editor (same as VS Code), and a basic test execution UI.

![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/Editor-Monaco-007ACC?style=flat&logo=visualstudiocode&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-success?style=flat)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

## Live Demo

https://priyanildz.github.io/leetcode-clone/

---

## What this project does

- Shows coding problems in a clean layout
- Lets you write code using Monaco Editor
- Supports multiple languages (with basic templates)
- Simulates running code and shows output in a console panel
- Simple dark UI similar to LeetCode

---

## Tech Stack

- Angular 18
- TypeScript
- Monaco Editor
- RxJS

---

## Getting Started

Clone the repo

```bash
git clone https://github.com/your-username/leetcode-clone.git
cd leetcode-clone

```

# Install dependencies

```bash
npm install
```

# Run the app

```bash
ng serve
```

# Open in browser
```bash
http://localhost:4200/
```
---

## Project Structure

```bash
leetcode-clone/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── editor/
│   │   │   ├── description/
│   │   │   └── console/
│   │   ├── services/
│   │   │   └── execution.service.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   └── app.ts
│   ├── assets/
│   │   └── monaco/
│   │       └── vs/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── README.md
```

----

## Acknowledgements
Inspired by LeetCode
Special thanks to my senior and close friend who suggested building this project