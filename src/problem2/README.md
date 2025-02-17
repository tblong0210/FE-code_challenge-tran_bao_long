# Running the React.js Project

This guide provides instructions on how to run and manage the React.js project using the available npm scripts.

Demo: [link](https://drive.google.com/file/d/1PU9v9rXBh521LpvSIgXWUJKxo86Wkzlw/view?usp=sharing)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [npm](https://www.npmjs.com/) (usually bundled with Node.js) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Available Scripts

The following scripts are defined in the `package.json` file:

- **`dev`**: Starts the development server using Vite.
- **`build`**: Compiles TypeScript and builds the project for production using Vite.
- **`lint`**: Runs ESLint to check for code issues in the project.
- **`preview`**: Previews the production build locally using Vite.
- **`lint:fix`**: Runs ESLint and automatically fixes fixable issues.
- **`prettier`**: Checks code formatting using Prettier for files in the `src` directory.
- **`prettier:fix`**: Automatically formats code using Prettier for files in the `src` directory.

## Steps to Run the Project

1. **Install Dependencies**  
   Make sure all dependencies are installed by running:

   ```bash
   npm install
   ```

2. **Run the Project**  
   To launch the project in development mode, use:

   ```bash
   npm run dev
   ```

   This will start the Vite development server. Open your browser and navigate to the provided local URL (usually http://localhost:3000) to view the application.

3. **Lint the Code**  
   To check for code issues and maintain code quality, run:

   ```bash
   npm run lint
   ```

   To automatically fix fixable issues, use:

   ```bash
   npm run lint:fix
   ```

4. **Format the Code**  
   To ensure consistent code formatting, check the code with Prettier:

   ```bash
   npm run prettier
   ```

   To automatically format the code, run:

   ```bash
   npm run prettier:fix
   ```

5. **Build for Production**  
   To create an optimized production build, run:

   ```bash
   npm run build
   ```

   This command compiles TypeScript and generates production-ready files in the dist folder.

6. **Preview the Production Build**  
   To test the production build locally, use:

   ```bash
   npm run preview
   ```

   This will serve the production build, allowing you to verify its functionality before deployment.
