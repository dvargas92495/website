const esbuild = require("esbuild").build;
const fs = require("fs");

const build = () => {
  if (!fs.existsSync("dist")) fs.mkdirSync("dist");
  const entryPoints = fs.readdirSync("pages").map(f => `pages/${f}`);
  return esbuild({
    entryPoints,
    bundle: true,
    outdir: 'dist',
    external: ["react", "react-dom"],
  })
    .then(() => console.log("Finished!"))
    .catch(e => {
      console.error("ERROR:", e.message);
      return 1;
    });
};

build();
