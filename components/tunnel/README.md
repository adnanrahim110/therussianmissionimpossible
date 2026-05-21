# TunnelExperience refactor

Use this folder in place of the original single long component.

## Main import

```jsx
import { TunnelExperience } from "@/components/tunnel/TunnelExperience";
```

or:

```jsx
import { TunnelExperience } from "@/components/tunnel";
```

## Notes

- Behavior and JSX were kept the same as the original component.
- The component is split into shared constants, utilities, texture creators, Three.js scene components, overlay cards, the canvas wrapper, and the main scroll controller.
- Keep the folder structure unchanged so the relative imports continue to work.
