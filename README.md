# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/ui/button"
```

```mermaid
sequenceDiagram
    participant A as User
    participant B as Next.js
    participant C as Nest.js
    
    A->>B: Submit form register
    B->>C: Call graphql signUp mutation
    C->>B: Return user data registered
    B->>A: Redirect to login page and show success message

    A->>B: Submit form login
    B->>C: Call graphql signIn mutation
    C->>B: Return user JWT token
    B->>A: Set cookie with JWT token and redirect to home page
```