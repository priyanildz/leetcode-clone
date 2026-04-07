# LeetCode Clone - Full Stack Web Application

A high-fidelity LeetCode clone built with Angular 18, featuring a professional dark-mode interface, Monaco Editor integration (the same editor used in VS Code), and a real-time code execution simulation system.

![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/Editor-Monaco-007ACC?style=flat&logo=visualstudiocode&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-success?style=flat)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

## Live Demo

[View Live Demo](https://priyanildz.github.io/leetcode-clone/)

---

## Key Features

* Professional problem interface with scrollable description, tags, and structured layout
* Integrated Monaco Editor with syntax highlighting for multiple languages
* Custom language selector with dynamic boilerplate generation
* Real-time execution simulation with console and test result panels
* Component-based architecture with reactive state management using RxJS
* Responsive layout using modern CSS (Flexbox)

---

## Installation and Setup

1. Clone the repository

```bash
git clone https://github.com/your-username/leetcode-clone.git
cd leetcode-clone
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
ng serve
```

4. Open in browser

```
http://localhost:4200/
```

---

## Project Structure

```
leetcode-clone/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── editor/
│   │   │   ├── description/
│   │   │   └── console/
│   │   │
│   │   ├── services/
│   │   │   └── execution.service.ts
│   │   │
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   └── app.ts
│   │
│   ├── assets/
│   │   └── monaco/
│   │       └── vs/   (Monaco Editor runtime files)
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.css
│
├── angular.json
├── package.json
└── README.md
```

---

## Architecture Overview

The application follows a modular and decoupled architecture:

* NavBar Component
  Handles global actions such as Run and Submit.

* Editor Component
  Manages the Monaco Editor instance and language switching logic.

* Description Component
  Displays problem statements, tags, and structured content.

* Console Component
  Handles test cases and displays execution output.

* Execution Service
  Acts as a centralized communication layer using RxJS for:

  * Triggering execution events
  * Sharing editor data
  * Updating UI across components

---

## Usage

1. Select a programming language from the editor dropdown
2. Boilerplate code updates automatically
3. Write your solution
4. Click Run or Submit
5. View results in the console panel

---

## Technical Challenges

### Monaco Integration with Angular

Monaco Editor is not an Angular-native library. It required manual initialization using lifecycle hooks and dynamic script loading to ensure proper rendering.

### Cross-Component Communication

Implemented a service-based communication system using RxJS Subjects and BehaviorSubjects to enable interaction between independent components without tight coupling.

---

## Contributing

Contributions are welcome. You can open issues or submit pull requests to improve the project.

---

## Acknowledgements

* LeetCode for inspiration in UI and problem structure
* Special thanks to my senior and close friend, who first suggested building this project

