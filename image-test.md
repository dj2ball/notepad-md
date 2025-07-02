# Image Support Test

## Web Images (URL)
Here's a web image that should load immediately:

![Sample Web Image](https://via.placeholder.com/400x200/4A90E2/ffffff?text=Web+Image+Test)

## Local Images (Relative Paths)
These demonstrate how local images work with real files:

![Local Screenshot](./image-test-assets/screenshot.png)
![My Photo](./image-test-assets/photo1.jpg)

## Features Demonstrated

### 1. **Document-Adjacent Storage**
- When you save this document as `image-test.md`
- Images will be stored in `image-test-assets/` folder
- Markdown references use relative paths like `./image-test-assets/filename.png`

### 2. **Smart Path Resolution**
- Web images (http/https) load directly from URL
- Local images resolve relative to document location
- Error handling shows helpful messages for missing images

### 3. **Visual Polish**
- Images have subtle shadows and hover effects
- Loading states show "Loading image..." overlay
- Error states show clear error messages
- Dark mode support with appropriate styling

## Coming Next: Advanced Features

### Phase 2 Features (Future)
- **Clipboard Paste**: Ctrl+V to paste images from clipboard
- **Drag & Drop**: Drop images from file explorer or browser
- **Auto Asset Management**: Automatic creation of asset folders

### Usage Examples

1. **For Screenshots**: Save document, then paste screenshots with Ctrl+V
2. **For Web Images**: Copy image URLs directly into markdown
3. **For Local Files**: Reference images relative to your document

---

**Try it out**: 
1. Open this in Notepad.md
2. Save the document somewhere
3. The web image should display immediately
4. Local image references will show error placeholders (until you add actual images) 