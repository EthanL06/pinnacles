# Next.js 15 + ShadCN UI + Tailwind CSS + Framer Motion + Firebase Template  

A modern, opinionated starter template featuring a powerful tech stack to kickstart your Next.js projects.

## 🔥 Features  

- **Next.js 15 (App Router)**: The latest version of Next.js with the App Router for a modern, file-based routing approach.  
- **ShadCN UI**: Pre-styled components with seamless integration for a great developer experience.  
- **Tailwind CSS**: Utility-first CSS framework for building stunning designs efficiently.  
- **Framer Motion**: Easy and intuitive animations to bring life to your UI.  
- **Firebase**: Backend integration for authentication, database, and hosting services.  

---

## 📦 Installation  

Clone the repository and install dependencies using `pnpm`:  

```bash  
git clone https://github.com/EthanL06/nextjs-shadcn-tailwind-framer-firebase-starter.git  
cd nextjs-shadcn-tailwind-framer-firebase-starter  
pnpm install  
```

---

## 🚀 Getting Started  

1. **Set Up Firebase**:  
   - Create a project in [Firebase Console](https://console.firebase.google.com/).  
   - Add your Firebase configuration to a `.env.local` file.  

2. **Run Development Server**:  
   Start the Next.js development server:  

   ```bash  
   pnpm dev  
   ```

3. **Build and Deploy**:  
   Build the app for production and deploy it to your hosting provider.  

   ```bash  
   pnpm build  
   pnpm start  
   ```

---

## 📂 Example `.env` File  

Here's an example `.env.local` file to guide your Firebase configuration:  

```env  
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key  
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain  
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id  
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket  
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id  
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id  
```

Make sure to replace `your-api-key`, `your-auth-domain`, and other placeholders with your actual Firebase configuration values.  

---

## 🛠 Tech Stack  

| Technology    | Purpose                              |  
|---------------|--------------------------------------|  
| Next.js 15    | Framework with App Router for modern, file-based routing. |  
| ShadCN UI     | Component library for consistent UI. |  
| Tailwind CSS  | Utility-first CSS for rapid UI development. |  
| Framer Motion | Animations and motion effects.       |  
| Firebase      | Backend services (auth, database, hosting). |  

---

## 🧩 Folder Structure  

```plaintext  
├── app/             # App Router directory  
│   ├── layout.tsx   # Root layout file  
│   ├── page.tsx     # Default home page  
│   ├── globals.css  # Global styles  
├── components/      # Reusable UI components  
├── public/          # Static assets (e.g., images, fonts)  
├── lib/             # Utility functions and configurations  
│   ├── utils.ts     # General-purpose helper functions  
├── firebase/        # Firebase setup and initialization  
└── .env.local       # Environment variables  
```

### Key Notes  
- The **App Router** is used, with routing defined in the `app` directory.  
- `globals.css` is located in the `app` directory and applied through the root `layout.tsx`.  

---

## 🎨 Customization  

- Modify Tailwind configuration in `tailwind.config.ts`.  
- Update components or create new ones in `components/`.  
- Integrate additional Firebase services as needed.  

---

## 📖 Resources  

- [Next.js Documentation](https://nextjs.org/docs)  
- [ShadCN UI Documentation](https://shadcn.dev/)  
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)  
- [Framer Motion Documentation](https://www.framer.com/motion/)  
- [Firebase Documentation](https://firebase.google.com/docs)  

---

## 💡 Contributing  

Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.  

---

## ⚖️ License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  
