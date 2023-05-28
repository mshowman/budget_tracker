# Simple Budget Tracker
I wanted to explore Tauri apps and my wife wanted a simple app to help budget.

## Tech Stack
* [Svelte + SvelteKit](https://svelte.dev/) + [SvelteUI](https://www.svelteui.org/) + Typescript for the frontend
* Rust + SQLite for the backend / persistence

## Usage
1. Clone repo
2. Install npm packages (I just happened to use pnpm)
3. Run app
   a. Dev with Hot Reload: `pnpm tauri dev`
   b. Build executable: `pnpm tauri build`
   
## Features
* Add / Remove budget items
* Main page shows previous month, current month, and five months ahead
* Table View to review historical and future items
