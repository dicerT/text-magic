# 文字魔法师 (Text Magic)

> A modern, multilingual text processing application built with Next.js and TypeScript

## 🌟 Features

### 📝 Text Repeater
- **Smart Repetition**: Generate repeated text up to 100,000 times
- **Multiple Output Formats**: 
  - Line-by-line (`\n`)
  - Comma-separated (`, `)
  - Space-separated (` `)
  - No separator (concatenated)
- **Preset Quick Options**: 10, 100, 1,000, 10,000 repetitions
- **Real-time Validation**: Input validation with error handling
- **Character Counter**: Live character count display
- **One-click Copy**: Instant clipboard functionality

### 🎨 Emoji Text Art
- **Pixel Art Generator**: Convert text into emoji pixel art patterns
- **Customizable Emojis**: Choose foreground and background emojis
- **Layout Options**: Vertical or horizontal arrangement
- **Character Support**: Letters, numbers, spaces, and Chinese characters
- **Visual Preview**: Real-time art generation
- **Unicode Patterns**: 7x5 pixel matrix for each character

### 🔤 Font Converter
- **Unicode Font Styles**: Transform text into various Unicode fonts
- **Multiple Styles Available**:
  - Fraktur (Gothic style)
  - Cryptic Italic
  - Math Sans
  - Light Text Bubbles
  - Script Bold Italic
  - Fairytale
- **Smart Fallback**: Automatic character compatibility detection
- **Browser Compatibility**: Enhanced rendering support

## 🌍 Multilingual Support

- **Full Internationalization**: Complete Chinese/English language switching
- **Dynamic UI**: All interface elements adapt to selected language
- **Seamless Experience**: No hardcoded text, pure translation-based

## 🚀 Technology Stack

### Core Framework
- **Next.js 14.2.16** - React framework with App Router
- **React 18** - Latest React with concurrent features
- **TypeScript** - Full type safety and developer experience

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions
- **CSS-in-JS** - Dynamic styling capabilities

### Development Tools
- **next-themes** - Dark/light theme support
- **Lucide React** - Beautiful icon library
- **clsx** - Conditional className utility
- **tailwind-merge** - Intelligent Tailwind class merging

### Package Management
- **pnpm** - Fast, disk space efficient package manager

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Setup
```bash
# Clone the repository
git clone git@github.com:dicerT/text-magic.git
cd text-magic

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts
```bash
# Development
pnpm dev          # Start development server on http://localhost:3000

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## 🎯 Usage Examples

### Text Repeater
```
Input: "Hello World ❤️"
Count: 3
Format: Line-by-line

Output:
Hello World ❤️
Hello World ❤️
Hello World ❤️
```

### Emoji Text Art
```
Input: "LOVE"
Foreground: ❤️
Background: ⬜️
Direction: Horizontal

Output: [Generates pixel art pattern]
```

### Font Converter
```
Input: "Hello"
Styles:
- Fraktur: 𝔥𝔢𝔩𝔩𝔬
- Script: 𝒽𝑒𝓁𝓁𝑜
- Bubbles: ⓗⓔⓛⓛⓞ
```

## 🏗️ Project Structure

```
text-magic/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page with routing
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── home-page.tsx     # Landing page
│   ├── text-repeater.tsx # Text repetition tool
│   ├── emoji-text.tsx    # Emoji pixel art generator
│   ├── font-text.tsx     # Font style converter
│   ├── language-provider.tsx # i18n context
│   └── theme-provider.tsx # Theme management
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🌐 Internationalization

The application supports full internationalization with:
- **Translation Keys**: Comprehensive translation system
- **Dynamic Language Switching**: Real-time language changes
- **Complete Coverage**: All UI elements, messages, and placeholders
- **Fallback Support**: Graceful handling of missing translations

## 🎨 Design Features

- **Modern UI**: Clean, professional interface design
- **Responsive Design**: Mobile and desktop optimized
- **Smooth Animations**: Framer Motion powered transitions
- **Theme Support**: Dark/light mode compatibility
- **Accessibility**: ARIA compliance and keyboard navigation
- **Performance**: Optimized for speed and efficiency

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```bash
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=your_api_url
```

### Deployment
The application is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting platform**

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Radix UI** for accessible primitives
- **Next.js team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for smooth animations

## 📞 Support

For support, questions, or feature requests, please open an issue on GitHub.

---

<div align="center">
  <strong>Built with ❤️ using Next.js and TypeScript</strong>
</div>