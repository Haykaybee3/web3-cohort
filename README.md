# Number Guessing Game

A simple but fun number guessing game built with **React** and **TypeScript**. The player must guess a randomly selected number between 1 and 100 within a limited number of attempts. This project was developed with clean Git practices, modular features, and optional enhancements.

# Demo

<img width="797" alt="Screenshot 2025-05-05 at 9 39 04 pm" src="https://github.com/user-attachments/assets/d1b24785-4752-43ee-997a-daa67744fc50" />

---

## **How to Play**

1. The game randomly selects a number between 1 and 100.
2. You have a limited number of guesses depending on the difficulty level.
3. After each guess, feedback is provided:
   - Too high
   - Too low
   - Correct!
4. If you guess correctly within the allowed attempts, you win.
5. Otherwise, the game ends and reveals the correct number.
6. You can restart the game without reloading the page.

---

## **Features**

- ✅ Generate a random number between 1 and 100
- ✅ User input via GUI
- ✅ Feedback after each guess
- ✅ Track and display remaining attempts
- ✅ Win/loss message at the end
- ✅ Restart game functionality
- ✅ Input validation with error messages
- ✅ Responsive and styled UI with Tailwind CSS

### **Optional Features Implemented**
- 🔥 Difficulty levels (Easy, Medium, Hard)
- 🔁 Restart game without page reload
- ⚡ Basic animations and transitions
- 🧪 Unit tests using React Testing Library & Jest

---

## **Tech Stack**

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)

---

## **Installation**

```bash
# Clone the repo
git clone https://github.com/your-username/number-guessing-game.git

# Move into the project folder
cd number-guessing-game

# Install dependencies
npm install or npm i

# Run the app
npm start

Testing

# Run tests
npm test

Tests are written for core components like:
	•	Rendering UI
	•	Game logic
	•	Restart and input behaviors

⸻

Future Improvements
	•	Sound effects and enhanced animations
	•	Leaderboard to track attempts
	•	Dark mode
	•	Deploy to Vercel or Netlify

⸻

License

MIT License — Free to use, modify, and share.

⸻

Author

Built with love by Akinbobola.
