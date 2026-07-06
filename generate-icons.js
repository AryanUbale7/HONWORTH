const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoDir = path.join(__dirname, 'public', 'logo');
const svgFiles = fs.readdirSync(logoDir).filter(f => f.endsWith('.svg'));
if (svgFiles.length === 0) {
    console.error('No SVG files found in public/logo/');
    process.exit(1);
}
const logoPath = path.join(logoDir, svgFiles[0]);

async function generateImages() {
    try {
        console.log(`Generating images from ${logoPath}...`);
        // opengraph-image.png (1200x630 is standard)
        await sharp(logoPath)
            .resize(1200, 630, { fit: 'contain', background: { r: 251, g: 248, b: 240, alpha: 1 } }) // ivory background
            .png()
            .toFile(path.join(__dirname, 'app', 'opengraph-image.png'));
        console.log('Created app/opengraph-image.png');

        // favicon.ico (usually 32x32)
        // Sharp doesn't support writing .ico directly easily in all versions without extra libraries, 
        // but we can generate a 32x32 png and rename it (which works in most modern browsers as a fallback),
        // or we just output a 32x32 png and name it favicon.ico.
        await sharp(logoPath)
            .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .png()
            .toFile(path.join(__dirname, 'app', 'favicon.ico'));
        console.log('Created app/favicon.ico');
    } catch (e) {
        console.error(e);
    }
}
generateImages();
