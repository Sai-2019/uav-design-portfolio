# AVIONIFTY UAV Interactive Portfolio Website

This is a GitHub Pages-ready static website built from the SAE Aero Design Challenge 2020 Regular Class UAV design report.

## What is included

- `index.html` - complete one-page portfolio site
- `styles.css` - responsive dark/light design system
- `app.js` - interactive charts, filters, gallery, lightbox, presentation mode, and payload slider
- `assets/` - report visuals extracted as web-ready images

## How to host on GitHub Pages

1. Create a new public repository on GitHub, for example: `uav-design-portfolio`.
2. Upload every file and folder from this package to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
5. Save. GitHub will publish the website in a few minutes.

## Recommended edits before publishing

- Replace the footer text with your real LinkedIn, GitHub, email, and resume links.
- Add a short “My role” paragraph if you want to clarify your exact contribution.
- Add a downloadable resume PDF link if you want recruiters to take action quickly.
- Review team/publication permissions before adding the original PDF, because the report contains personal contact details.

## Suggested recruiter headline

`Mechanical Design Engineer | UAV CAD, Aerodynamics, Structural Analysis, CFD, Fabrication`

## Local preview

Open `index.html` directly in a browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
