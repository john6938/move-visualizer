# Move Visualizer

A web application for exploring the rhetorical move structure of academic abstracts across disciplines.

## About

This tool helps users understand how abstract move structure — Introduction, Purpose, Method, Result, and Discussion — varies within and across academic disciplines. It includes 1,000 annotated abstracts from 10 domains.

## Domains

| Domain | Abstracts |
|---|---|
| Botany | 100 |
| Industrial Electronics | 100 |
| Linguistics | 100 |
| Advanced Materials | 100 |
| Medicine | 100 |
| Evolutionary Computation | 100 |
| Image Processing | 100 |
| Information Theory | 100 |
| Knowledge & Data Engineering | 100 |
| Wireless Communications | 100 |

## Features

- Browse abstracts by discipline
- Toggle move annotations on/off
- Switch between move-only and move + subtype labels
- Colour-coded legend for all move types

## Development

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
```

The `dist/` folder can be uploaded to any static host (GoDaddy cPanel, GitHub Pages, etc.).

## Adding more domains

1. Add XML-annotated abstract files to `public/data/<domain-folder>/`
2. Add the domain entry (key, label, folder, files array) to `public/data/index.json`

## Abstract XML format

Each abstract is an XML file with annotated segments:

```xml
<segment features="rhetorical_moves;introduction;background">
  Text of the segment here.
</segment>
```

The `features` attribute contains semicolon-separated values identifying the move type and optional subtype.
