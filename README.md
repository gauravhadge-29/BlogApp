# Blog Application

A modern, full-stack blog platform built with React and Vite, leveraging Appwrite for authentication, database, and file storage. This application allows users to register, log in, create, edit, and delete blog posts with rich text and images, all within a responsive and user-friendly interface.

## Features
- **User Authentication:** Secure sign up, log in, and log out using Appwrite.
- **Post Management:** Create, edit, and delete blog posts with featured images and rich text content (TinyMCE editor).
- **Authorization:** Only post authors can edit or delete their own posts.
- **Post Browsing:** View all posts or individual post details.
- **Responsive UI:** Built with Tailwind CSS for a modern look and feel.
- **State Management:** Uses Redux Toolkit for robust state handling.

## Tech Stack
- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - TinyMCE (via @tinymce/tinymce-react)
  - React Hook Form
  - Redux Toolkit
  - React Router DOM
  - html-react-parser
- **Backend as a Service:**
  - Appwrite (Authentication, Database, Storage)
- **Tooling:**
  - ESLint (with React and hooks plugins)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- An Appwrite instance (self-hosted or cloud)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd BlogApplication
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Appwrite:**
   - Create a `.env` file or set the following environment variables:
     - `VITE_APPWRITE_URL`
     - `VITE_APPWRITE_PROJECT_ID`
     - `VITE_APPWRITE_DATABASE_ID`
     - `VITE_APPWRITE_COLLECTION_ID`
     - `VITE_APPWRITE_BUCKET_ID`
   - Set up your Appwrite project with the required database, collection, and storage bucket.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

## Usage
- Register a new account or log in with existing credentials.
- Create new blog posts with a title, slug, content, and featured image.
- Edit or delete your own posts from the post detail page.
- Browse all posts or view individual post details.




