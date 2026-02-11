# 😂 JokeCreator

A modern, beautiful, and user-friendly joke generator built with React. Get jokes on any topic with an intuitive interface featuring theme switching, search history, and safe mode filtering.

## ✨ Features

- **🔍 Topic-Based Search**: Enter any topic and get jokes related to it
- **📂 Category Filtering**: Choose from multiple joke categories (Programming, Misc, Pun, Spooky, Christmas, Dark, or Any)
- **🎨 Theme Support**: Switch between Light and Dark themes with smooth transitions
- **🛡️ Safe Mode**: Filter explicit content for family-friendly jokes
- **🕒 Search History**: Quick access to your recent searches (up to 6 stored locally)
- **⚡ Real-time API**: Powered by JokeAPI v2 for fresh, quality jokes
- **📱 Responsive Design**: Beautiful UI on all devices
- **✨ Smooth Animations**: Engaging user experience with fade-in, slide, and bounce effects

## 🚀 Technologies Used

- **React** (v18+) - Frontend framework
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with CSS variables and animations
- **LocalStorage** - Persistent theme and search history

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd JokeCreator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎯 Usage

### Getting a Joke

1. **Enter a topic** (optional) - Type keywords like "coding", "cats", "space"
2. **Select a category** - Choose from the dropdown (default: Any)
3. **Toggle safe mode** - Enable to filter explicit jokes
4. **Click "Get Joke"** or press Enter to fetch a joke

### Theme Switching

- Use the **Theme** dropdown to switch between Light and Dark modes
- Your preference is automatically saved

### Search History

- Recent searches appear below the controls
- Click any history item to quickly re-run that search
- Click "Clear all" to remove all history

## 🔌 API

This project uses the [JokeAPI v2](https://v2.jokeapi.dev/):

- **Endpoint**: `https://v2.jokeapi.dev/joke/`
- **Categories**: Any, Programming, Misc, Pun, Spooky, Christmas, Dark
- **Features**: Topic search, safe mode, various joke formats

## 📁 Project Structure

```
JokeCreator/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles and theme variables
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration
└── README.md            # Project documentation
```

## 🎨 Design Features

### Visual Elements

- Bouncing emoji logo (😂)
- Icon labels for all controls
- Decorative background elements in joke cards
- Smooth transitions and animations

### Animations

- **Fade in**: Header and card entrance
- **Slide in**: Joke display
- **Bounce**: Logo animation
- **Shake**: Error messages
- **Hover effects**: Interactive elements

### Theme System

- CSS variables for easy customization
- Light and Dark theme presets
- Smooth color transitions
- Persistent user preference

## 🛠️ Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [JokeAPI](https://v2.jokeapi.dev/) for providing the joke database
- [Vite](https://vitejs.dev/) for the amazing build tool
- [React](https://react.dev/) for the frontend framework

---

**Made with ❤️ and 😂**

For issues or questions, please open an issue on the repository.
