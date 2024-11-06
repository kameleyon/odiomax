# AUDIOMAX - AI-Powered Audio Generation Platform

AUDIOMAX is a modern web application that enables users to create high-quality audio content using advanced AI technology, voice cloning, and text-to-speech capabilities.

## 🎨 Theme & Design System

### Color Palette
```css
:root {
  --primary: #63248d;      /* Primary Purple - Main brand color */
  --secondary: #189571;    /* Secondary Green - Accent color */
  --accent: #bceee7;      /* Light Teal - Subtle highlights */
  --background: #0f0035;  /* Deep Navy - Background color */
}
```

### Gradients
- Main Background: `bg-gradient-to-br from-[#0f0035] to-[#1859c7]`
- Dark Mode: `dark:from-[#0f0035] dark:to-[#0e7584]`

### UI Components
- Cards/Panels: `bg-white/5` with `backdrop-blur-sm`
- Borders: `border-white/10`
- Text Colors:
  - Primary: `text-white`
  - Secondary: `text-white/60`
  - Disabled: `text-white/40`

## 📁 Project Structure

```
/
├── src/                      # Source code
│   ├── components/           # Reusable UI components
│   │   ├── about/           # About page components
│   │   │   ├── AdminSection.tsx        # Admin dashboard section
│   │   │   ├── Careers.tsx             # Careers information
│   │   │   ├── CompanyInfo.tsx         # Company details
│   │   │   ├── Contact.tsx             # Contact form
│   │   │   └── Legal.tsx               # Legal information
│   │   ├── admin/           # Admin dashboard components
│   │   │   ├── AdminDashboard.tsx      # Main admin panel
│   │   │   ├── BlogManagement.tsx      # Blog management
│   │   │   ├── HomepageEditor.tsx      # Homepage customization
│   │   │   └── SubscriptionManagement.tsx # Subscription controls
│   │   ├── auth/            # Authentication components
│   │   │   ├── AdminRoute.tsx          # Admin route protection
│   │   │   ├── GoogleAuthCheck.tsx     # Google auth verification
│   │   │   └── ProtectedRoute.tsx      # Route protection
│   │   ├── files/           # File management components
│   │   │   ├── FileHeader.tsx          # File section header
│   │   │   ├── FileList.tsx            # File listing
│   │   │   ├── FileFilters.tsx         # File filtering
│   │   │   └── SearchBar.tsx           # File search
│   │   ├── help/            # Help & support components
│   │   │   ├── FAQSection.tsx          # FAQ display
│   │   │   ├── TutorialSection.tsx     # Tutorials
│   │   │   └── SupportTicket.tsx       # Support ticket form
│   │   ├── layout/          # Layout components
│   │   │   ├── Footer.tsx             # Site footer
│   │   │   ├── Layout.tsx             # Main layout wrapper
│   │   │   ├── Navbar.tsx             # Navigation bar
│   │   │   └── Sidebar.tsx            # Side navigation
│   │   ├── notifications/   # Notification components
│   │   │   ├── NotificationList.tsx    # Notification display
│   │   │   └── NotificationFilters.tsx # Notification filtering
│   │   ├── settings/        # Settings components
│   │   │   ├── BillingPanel.tsx        # Billing management
│   │   │   ├── PreferencesPanel.tsx    # User preferences
│   │   │   └── SubscriptionPanel.tsx   # Subscription management
│   │   ├── studio/          # Studio components
│   │   │   ├── AudioPlayer.tsx         # Audio playback
│   │   │   ├── ContentInput.tsx        # Content entry
│   │   │   ├── ContentSettings.tsx     # Generation settings
│   │   │   └── TranscriptEditor.tsx    # Transcript editing
│   │   ├── tts/             # Text-to-speech components
│   │   │   └── GoogleAuthStatus.tsx    # TTS connection status
│   │   ├── ui/              # Generic UI components
│   │   │   ├── ThemeToggle.tsx         # Theme switcher
│   │   │   └── Toggle.tsx              # Toggle component
│   │   └── voice/           # Voice cloning components
│   │       ├── FavoriteVoices.tsx      # Saved voices
│   │       ├── VoiceHeader.tsx         # Voice section header
│   │       ├── VoiceList.tsx           # Voice management
│   │       └── VoiceUpload.tsx         # Voice upload
│   ├── contexts/            # React contexts
│   │   └── ThemeContext.tsx # Theme management
│   ├── pages/               # Page components
│   │   ├── About.tsx        # About page
│   │   ├── Admin.tsx        # Admin dashboard
│   │   ├── FileManagement.tsx # File management
│   │   ├── Help.tsx         # Help center
│   │   ├── Home.tsx         # Landing page
│   │   ├── NotFound.tsx     # 404 page
│   │   ├── Settings.tsx     # User settings
│   │   ├── SignUp.tsx       # Registration
│   │   ├── Studio.tsx       # Main studio
│   │   ├── TTSTest.tsx      # TTS testing
│   │   └── VoiceCloning.tsx # Voice cloning
│   ├── services/            # API services
│   │   ├── auth.service.ts  # Authentication
│   │   └── tts.service.ts   # Text-to-speech
│   └── types/               # TypeScript types
│       └── auth.ts          # Auth types
├── server/                  # Backend server
│   ├── config/             # Server configuration
│   ├── middleware/         # Express middleware
│   ├── routes/             # API routes
│   └── services/           # Backend services
├── public/                 # Static assets
├── .env                    # Environment variables
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript config
└── vite.config.ts         # Vite configuration
```

## 🚀 Features

- AI-powered text-to-speech generation
- Voice cloning capabilities
- Multiple voice styles and accents
- Content management system
- User authentication
- File management
- Admin dashboard
- Subscription management
- Help and support system

## 🛠️ Technology Stack

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Vite
  - Clerk (Authentication)
  - Lucide Icons

- Backend:
  - Node.js
  - Express
  - Google Cloud Text-to-Speech API

## 🔒 Authentication

- User authentication handled by Clerk
- Google Cloud authentication for TTS services
- Protected routes for authenticated users
- Special admin routes for administrators

## 🎯 Core Functionality

1. Studio
   - Content input (text/file upload)
   - Voice and tone selection
   - AI-powered content generation
   - Audio preview and editing
   - Publishing system

2. Voice Management
   - Voice cloning
   - Voice library
   - Custom voice settings
   - Voice organization

3. File Management
   - Audio file organization
   - Search and filtering
   - File sharing
   - Download capabilities

## 🎨 Design System

### Typography
- Font Family: Montserrat
- Weights: 100 (Thin), 300 (Light), 400 (Regular), 600 (Semibold)

### Spacing
- Container Max Width: 64rem (max-w-4xl)
- Standard Gap: 1.5rem (gap-6)
- Section Spacing: 2rem (space-y-8)

### Components
1. Buttons
   ```css
   .btn-primary {
     @apply px-6 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors;
   }
   ```

2. Cards
   ```css
   .card {
     @apply bg-white/5 backdrop-blur-sm rounded-lg border border-white/10;
   }
   ```

3. Forms
   ```css
   .input {
     @apply px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary;
   }
   ```

### Animations
```css
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}
```

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   GOOGLE_CLIENT_EMAIL=your_google_email
   GOOGLE_PRIVATE_KEY=your_google_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

See `vite.config.ts` for development server configuration and `tsconfig.json` for TypeScript settings.

## 📄 License

Copyright © 2024 AUDIOMAX. All rights reserved.