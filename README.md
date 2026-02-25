# 🚀 LeetCode Clone - Full Stack Web Application

A high-fidelity LeetCode clone built with **Angular 18**, featuring a professional dark-mode UI, integrated **Monaco Editor** (the same engine powering VS Code), and a real-time code execution simulation system.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

# 🚀 LeetCode Clone - Full Stack Web Application

[🔗 View Live Demo]([https://your-username.github.io/leetcode-clone/](https://priyanildz.github.io/leetcode-clone/))

A high-fidelity LeetCode clone built with **Angular 18**...

---

## ✨ Key Features

* **Professional Problem Interface:** Authentic LeetCode layout with a scrollable description panel, topics, and hint navigation.
* **Integrated Monaco Editor:**
    * Syntax highlighting for C, C++, Java, Python, and JavaScript.
    * **Custom Language Picker:** Fully styled dropdown with custom hover states.
    * **Auto-Boilerplate:** Automatically generates standard solution templates when switching languages.
* **Real-time Execution Pipeline:** * Angular **Services** link the NavBar and Code Editor.
    * Interactive **Console & Test Results** panel with tab switching.
    * Simulated runtime, status tracking, and input/output comparisons.
* **Responsive Layout:** Uses CSS Flexbox and modern design principles for a seamless IDE experience.

---

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/leetcode-clone.git](https://github.com/your-username/leetcode-clone.git)
    cd leetcode-clone
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    ng serve
    ```

4.  **View the app**
    Open your browser and navigate to `http://localhost:4200/`.

---

## 🏗️ Architecture Overview

The application is built using a decoupled component-based architecture:

* **NavBar Component:** Handles global actions like "Run" and "Submit".
* **Editor Component:** Manages the Monaco instance and language-specific logic.
* **Description Component:** Displays problem constraints and smooth-scrolls to hints/topics.
* **Console Component:** Manages test cases and displays execution results via RxJS subscriptions.
* **Execution Service:** Acts as the "Source of Truth," facilitating communication between the NavBar, Editor, and Console.



---

## 📝 Usage

1. Select your preferred language from the custom dropdown in the Editor.
2. Observe the boilerplate code update automatically.
3. Write your solution and click the **Run** button in the NavBar.
4. The Console will automatically switch to the **Test Result** tab and display the execution status.
5. **Auto-Tab Switching:** Clicking "Run" triggers an RxJS Subject that automatically navigates the Console component to the "Test Result" tab.

---

## 🧠 Technical Challenges

### Monaco-Angular Integration
Integrating a non-Angular library like Monaco required careful lifecycle management. Using `ngAfterViewInit` and a polling mechanism (`checkAndInit`) ensured the editor only initialized once the external script was fully loaded into the DOM.

### Cross-Component State Management
Since the "Run" button (NavBar) and the code data (Editor) live in different branches of the DOM tree, I implemented a **Service-based Event Bus** using RxJS `Subject` and `BehaviorSubject`. This allowed for:
- One-way data flow from Editor to Service.
- Event triggering from NavBar to Console.
- Real-time UI updates in the Output panel without a page refresh.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/leetcode-clone/issues).

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Made with ❤️ for the Developer Community*
