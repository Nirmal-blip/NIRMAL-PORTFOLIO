# Premium Fonts Setup Guide

This portfolio uses a sophisticated typography system with premium fonts. Here's how to set them up:

## 🎨 **Premium Font System**

### **Font Hierarchy:**
- **MetaRegular** - Main display font for hero titles
- **DIN** - Clean headings and navigation
- **PeterGothic** - Card titles and accents
- **BalconeRano3** - Brand display elements
- **AmericanTypewriter** - Body text and descriptions
- **FranklinGothic** - Contact labels and UI elements
- **Helvetica Neue** - Fallback for body text

### **Typography Classes:**
- `.hero-title` - Main hero section titles
- `.hero-subtitle` - Hero section descriptions
- `.section-title` - Section headings
- `.card-title` - Card and component titles
- `.card-text` - Card descriptions
- `.brand-display` - Brand logo and main display
- `.brand-heading` - Brand headings
- `.brand-body` - Brand body text
- `.brand-accent` - Accent text and highlights
- `.nav-text` - Navigation elements
- `.tech-badge` - Technology badges
- `.stats-number` - Statistics numbers
- `.contact-label` - Form labels and contact info

## 📁 **Font Files Setup**

### **1. Download Premium Fonts**
You'll need to obtain the following font files:

```
public/fonts/
├── MetaRegular.woff2
├── MetaRegular.woff
├── DIN-Regular.woff2
├── DIN-Regular.woff
├── DIN-Bold.woff2
├── DIN-Bold.woff
├── PeterGothic-Regular.woff2
├── PeterGothic-Regular.woff
├── BalconeRano3-Regular.woff2
├── BalconeRano3-Regular.woff
├── AmericanTypewriter-Regular.woff2
├── AmericanTypewriter-Regular.woff
├── FranklinGothic-Regular.woff2
└── FranklinGothic-Regular.woff
```

### **2. Font Sources**
- **MetaRegular**: Available from FontShop or Adobe Fonts
- **DIN**: Available from Linotype or Adobe Fonts
- **PeterGothic**: Available from Google Fonts or Adobe Fonts
- **BalconeRano3**: Available from Adobe Fonts
- **AmericanTypewriter**: Available from Apple or Adobe Fonts
- **FranklinGothic**: Available from Adobe Fonts

### **3. Font Conversion**
Convert your font files to web formats:

```bash
# Install fonttools
pip install fonttools[woff]

# Convert TTF to WOFF2
pyftsubset font.ttf --output-file=font.woff2 --flavor=woff2

# Convert TTF to WOFF
pyftsubset font.ttf --output-file=font.woff --flavor=woff
```

## 🚀 **Implementation**

### **Current Setup:**
The portfolio is already configured with:
- ✅ Font loading in `index.html`
- ✅ CSS typography system in `src/index.css`
- ✅ Component updates with premium font classes
- ✅ Fallback fonts for better performance

### **Font Loading Strategy:**
1. **Preconnect** to Google Fonts for fallbacks
2. **Custom @font-face** declarations for premium fonts
3. **Font-display: swap** for better performance
4. **Progressive enhancement** with fallbacks

## 🎯 **Usage Examples**

### **Hero Section:**
```jsx
<h1 className="hero-title gradient-text text-6xl">
  NIRMAL JOSHI
</h1>
<p className="hero-subtitle text-xl">
  AI Product Developer
</p>
```

### **Section Headings:**
```jsx
<h2 className="section-title text-4xl">
  About Me
</h2>
```

### **Card Content:**
```jsx
<div className="card">
  <h3 className="card-title">Project Title</h3>
  <p className="card-text">Project description</p>
</div>
```

### **Navigation:**
```jsx
<nav className="nav-text">
  <a href="#about">About</a>
</nav>
```

## 🔧 **Customization**

### **Adding New Fonts:**
1. Add font files to `public/fonts/`
2. Update `@font-face` declarations in `index.html`
3. Create new CSS classes in `src/index.css`
4. Update components with new classes

### **Font Weights:**
- **400** - Regular
- **600** - Semibold
- **700** - Bold

### **Letter Spacing:**
- **-0.06em** - Tight (hero titles)
- **-0.03em** - Medium (headings)
- **0.01em** - Loose (body text)

## 📱 **Responsive Typography**

The typography system includes responsive scaling:

```css
.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 0.95;
}

.section-title {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.1;
}
```

## ⚡ **Performance Optimization**

### **Font Loading Best Practices:**
1. **Preload critical fonts**
2. **Use font-display: swap**
3. **Optimize font files** (subset, compress)
4. **Provide fallbacks**

### **Example Preload:**
```html
<link rel="preload" href="/fonts/MetaRegular.woff2" as="font" type="font/woff2" crossorigin>
```

## 🎨 **Design System**

### **Font Pairings:**
- **MetaRegular + DIN** - Modern, clean
- **PeterGothic + AmericanTypewriter** - Creative, unique
- **BalconeRano3 + FranklinGothic** - Professional, bold

### **Color Combinations:**
- **Primary**: MetaRegular with cyan gradient
- **Secondary**: DIN with white text
- **Accent**: PeterGothic with brand colors

## 🚀 **Deployment**

### **Production Setup:**
1. Ensure all font files are in `public/fonts/`
2. Test font loading on different devices
3. Optimize font files for web
4. Set up CDN for better performance

### **Fallback Strategy:**
If premium fonts fail to load, the system gracefully falls back to:
- **Outfit** → **Inter** → **System fonts**

This ensures your portfolio always looks professional, even without premium fonts!

## 📞 **Support**

For font-related issues:
1. Check browser console for font loading errors
2. Verify font file paths in `index.html`
3. Test with different browsers
4. Use fallback fonts during development

---

**Note**: Premium fonts may require licensing. Ensure you have proper rights to use these fonts in your portfolio.
