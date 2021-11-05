const esbuild = require("esbuild").build;
const fs = require("fs");

const build = () => {
  if (!fs.existsSync("dist")) fs.mkdirSync("dist");
  const entryPoints = fs.readdirSync("pages").map(f => `pages/${f}`);
  return esbuild({
    entryPoints,
    bundle: true,
    outdir: "dist",
    minify: true,
    plugins: [
      {
        name: "browser",
        setup(build) {
          const pathToModule = {
            react: "React",
            "react-dom": "ReactDOM",
          };

          // Intercept import paths called "env" so esbuild doesn't attempt
          // to map them to a file system location. Tag them with the "env-ns"
          // namespace to reserve them for this plugin.
          build.onResolve({ filter: /^react(-dom)?$/ }, args => ({
            path: args.path,
            namespace: "browser",
          }));

          // Load paths tagged with the "env-ns" namespace and behave as if
          // they point to a JSON file containing the environment variables.
          build.onLoad({ filter: /.*/, namespace: "browser" }, args => ({
            contents: `module.exports = window.${pathToModule[args.path]}`,
          }));
        },
      },
    ],
  })
    .then(() => console.log("Finished!"))
    .catch(e => {
      console.error("ERROR:", e.message);
      return 1;
    });
};

build();
