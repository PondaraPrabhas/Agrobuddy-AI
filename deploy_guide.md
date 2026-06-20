# AgroBuddy AI - Global Hosting Guide

To take your website from `localhost:5173` to a **live global website** (with a secure HTTPS link that you can share with farmers, students, and advisors), you can use any of the free hosting platforms below.

First, always compile your production build:
```powershell
npm run build
```
This command compiles your React code and packages all assets into a folder called `dist` in your project directory.

---

## Option 1: Host on Netlify (Recommended - Easiest 10-second deploy)

Netlify allows you to deploy direct from your command line:

1. Open your terminal in `c:\Agrobuddy AI`
2. Run the Netlify deployment tool directly using `npx` (no installation required):
   ```powershell
   npx netlify-cli deploy --dir=dist --prod
   ```
3. The tool will ask you to authorize or log in (you can create a free account at [netlify.com](https://www.netlify.com/)).
4. It will immediately upload your `dist` folder and give you a live **Global URL** (e.g. `https://agrobuddy-ai.netlify.app`).

---

## Option 2: Host on Vercel (Another 10-second deploy)

Vercel is another premium hosting provider for Vite React apps:

1. Open your terminal in `c:\Agrobuddy AI`
2. Run the Vercel deployment tool using `npx`:
   ```powershell
   npx vercel --prod
   ```
3. Vercel will ask a few setup questions:
   - *Set up and deploy?* Yes
   - *Which scope?* (Select your default personal account scope)
   - *Link to existing project?* No
   - *What is your project's name?* `agrobuddy-ai`
   - *In which directory is your code located?* `./` (Default)
   - *Want to modify settings?* No
4. Vercel will build and deploy the app, providing you with a live secure global link (e.g. `https://agrobuddy-ai.vercel.app`).

---

## Option 3: Host on GitHub Pages (Great for developers)

If you have a GitHub repository:

1. Initialize git and push your code to a GitHub repository:
   ```powershell
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Install the `gh-pages` helper package:
   ```powershell
   npm install gh-pages --save-dev
   ```
3. Open your `package.json` and add these two items:
   - Add a `"homepage": "https://<your-username>.github.io/<your-repo-name>",` property at the top level.
   - Add these scripts in the `"scripts"` section:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
     ```
4. Run the deploy script:
   ```powershell
   npm run deploy
   ```
5. Your site will be live globally at `https://<your-username>.github.io/<your-repo-name>/`.
