# LAURA
This is an official website actively hosted via GitHub Pages for the non-profit organization L.A.U.R.A.

## Local Development

```sh
python3 -m http.server 8000
# Then open http://localhost:8000
```

## Tailwind CSS

The site uses a compiled Tailwind CSS file (`css/tailwind.css`) instead of the CDN to avoid browser warnings in production.

**When to recompile:** Any time you add new Tailwind utility classes to an HTML file that aren't already in `css/tailwind.css`, recompile to include them.

**How to recompile:**

```sh
npm install
npm run build:css
```

The `build:css` script is defined in `package.json` and runs the Tailwind CLI against all `*.html` files, outputting a minified `css/tailwind.css`. Commit the updated `css/tailwind.css` after recompiling.
