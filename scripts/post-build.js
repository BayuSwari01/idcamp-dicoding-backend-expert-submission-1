import fs from "fs/promises";
import path from "path";

// Direktori output hasil build
const distDir = path.resolve(process.cwd(), "dist");

// Regex untuk mencari path impor/ekspor relatif
// Contoh: import ... from './file' atau export ... from '../folder/file'
const importRegex = /(from\s+['"]|import\s+['"])(\.\.?\/[^'"]+)(['"])/g;

async function addJsExtensions(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Jika direktori, cari di dalamnya secara rekursif
      await addJsExtensions(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      // Jika file JavaScript, baca dan proses isinya
      try {
        let content = await fs.readFile(fullPath, "utf-8");
        let modified = false;

        content = content.replace(importRegex, (match, prefix, importPath, suffix) => {
          // Hanya tambahkan .js jika belum ada ekstensi
          if (!path.extname(importPath)) {
            modified = true;
            return `${prefix}${importPath}.js${suffix}`;
          }
          return match;
        });

        if (modified) {
          // Tulis kembali file hanya jika ada perubahan
          await fs.writeFile(fullPath, content, "utf-8");
          console.log(`Updated: ${fullPath}`);
        }
      } catch (error) {
        console.error(`Could not process file ${fullPath}:`, error);
      }
    }
  }
}

console.log("Starting post-build script to add .js extensions...");
addJsExtensions(distDir)
  .then(() => console.log("Post-build script finished successfully."))
  .catch(console.error);
