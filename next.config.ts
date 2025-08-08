import type { NextConfig } from "next";

// Фільтрація попередження DEP0169
// process.on("warning", (warning) => {
//   if (warning.code === "DEP0169") return; // Ігноруємо
//   console.warn(warning); // Інші попередження не чіпаємо
// });

const nextConfig: NextConfig = {
};

export default nextConfig;
