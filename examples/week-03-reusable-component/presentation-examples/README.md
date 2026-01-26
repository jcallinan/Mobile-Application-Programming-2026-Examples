# Week 3 Presentation Examples

This folder includes a small React example that follows the Week 3 slide deck.
It demonstrates:

- A reusable `<Link />` component for external URLs.
- A reusable `<List />` component that accepts an `items` array.
- Routing with React Router v6, including a dynamic route for project details.

## Suggested Structure

```
src/
  assets/
  components/
    Header.jsx
    Link.jsx
    List.jsx
  pages/
    Profile.jsx
    Projects.jsx
    ProjectDetail.jsx
  App.jsx
  index.js
```

The example uses the GitHub REST API (public endpoints) to populate profile and
project data, matching the workflow from the presentation.
