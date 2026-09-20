# RubikTimer

A modern, lightweight Rubik's Cube timer for tracking solves, generating scrambles, and analyzing performance.

![Timer](assets/images/timer.png)
![Stats](assets/images/stats.png)

## Features

- ⏱️ Precise Rubik's Cube timer
- 🎲 Scramble generation for all WCA events (2×2–7×7 + Pyraminx, Megaminx, Skewb, Square-1, Clock)
- 📊 Solve tracking with configurable averages (Ao5, Ao12, Ao25, Ao50, Ao100)
- 📈 Statistics and performance charts
- 🌙 Light and dark themes
- 💾 Automatic local storage of all solves
- 📱 Clean, responsive and minimal UI

## Tech Stack

- HTML5 + CSS3 (Design Tokens)
- Vanilla JavaScript (ES Modules)
- [Chart.js](https://www.chartjs.org/)
- [cubing.js](https://js.cubing.net/cubing/)

## Getting Started

### Requirements
- Node.js (and npm)

```bash
git clone https://github.com/rshd0/RubikTimer.git
cd RubikTimer
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Roadmap

- [ ] Import / Export solves
- [ ] Inspection time (15s WCA)
- [ ] More statistics and charts improvements

## License

MIT