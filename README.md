# 79830413e33e525e21697e8af4aa6c5d2dda1d41b3b156e915194d45bde2fe25

[Live Deployment](https://noteapp1221.netlify.app/)

## How to Run and Deploy the App

**To run locally:**
1. Clone the repository: `git clone https://github.com/sakshibhongle1221/Notes.git`
2. Navigate into the directory: `cd Notes`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open `http://localhost:5173` in your browser.

**To deploy:**
This project is built with SvelteKit and can be deployed easily to platforms like Netlify or Vercel.
* Connect your GitHub repository to Netlify/Vercel.
* The build command is `npm run build`.
* The output/publish directory should be set to the adapter's output folder (usually `.svelte-kit` or `build` depending on your SvelteKit adapter).

## Reflection on My Approach
My primary goal for this assignment was to balance a highly polished, responsive User Experience (UX) with modern, performant code. I chose to build this using the newly released Svelte 5 to leverage its granular reactivity system (Runes like `$state` and `$derived`). I broke the project down into small, reusable UI components (like `NoteCard` and `NoteForm`) and centralized my business logic into a single, reactive global store (`noteStore`). This architecture made it incredibly easy to manage complex states like debounced searching, pagination, and offline caching without prop-drilling.

## Trade-offs and Assumptions
* **Offline Sync Trade-off:** I chose to implement offline caching using the browser's native `localStorage` API. `localStorage` easily handles the text data payload of this app, providing the exact "instant load" offline UX.
* **Optimistic UI Assumptions:** For features like "Pinning" a note, I assumed a stable API and implemented an optimistic UI update. The app updates the UI immediately before waiting for the server response, making the app feel significantly faster and more premium. If the API fails, it silently reverts the UI.
* **Soft Delete Trade-off:** Instead of true trash-bin architecture (which requires backend support), I implemented "Soft Deletes" on the frontend. The note is hidden instantly, and a 10-second `setTimeout` holds the actual API `DELETE` request, giving the user a chance to undo.

## Additional Dependencies
* **Tailwind CSS v4:** The only major dependency added was Tailwind CSS. I used it to handle all styling and responsive breakpoints, and specifically utilized its "class strategy" to manually control the Dark Mode implementation. 
* *Note: I avoided heavy icon libraries (like FontAwesome or Lucide) and instead used raw, inline SVGs to keep the bundle size as small as possible.*

## What I'd Do With More Time
If I had another week to work on this project, I would implement:
* **Offline Action Queue:** Currently, offline changes are stored locally but not synced automatically. I would implement a queue system to retry failed API requests and sync them once the connection is restored.
* **Comprehensive Testing:** I would set up Vitest for unit testing my `noteStore` logic (specifically testing the sorting and pagination functions).
* **Drag and Drop Sorting:** Drag and drop to allow users to manually rearrange their pinned notes on the grid.
