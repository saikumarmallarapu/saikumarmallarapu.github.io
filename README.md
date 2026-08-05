# Saikumar Mallarapu - Portfolio

Professional portfolio for Saikumar Mallarapu, Python Django Developer and Backend Engineer.

Live site: https://saikumarmallarapu.github.io

## Project structure

```text
.
|-- index.html
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   |-- js/
|   |   |-- projects.js
|   |   `-- script.js
|   |-- documents/
|   |   `-- Saikumar_Mallarapu_Django_Developer.pdf
|   `-- images/
|       |-- branding/
|       |-- profile/
|       |-- projects/
|       |   `-- <project-name>/
|       `-- gallery/
|           |-- company/
|           `-- freelance/
|-- robots.txt
|-- sitemap.xml
`-- googlebade5013fac44d7c.html
```

## Add a project

1. Create `assets/images/projects/<project-name>/`.
2. Add optimized JPG, WebP, AVIF, or PNG screenshots.
3. Copy a project object in `assets/js/projects.js`.
4. Set `category` to `company` or `personal`.
5. Use an empty `url` for private projects.

Example:

```js
{
  name: "Project name",
  category: "personal",
  url: "",
  images: [
    "assets/images/projects/project-name/page1.webp",
    "assets/images/projects/project-name/page2.webp"
  ]
}
```

Project images automatically support looping, arrows, and touch swiping.
