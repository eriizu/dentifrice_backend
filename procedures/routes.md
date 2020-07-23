# How to implement routes?

This procedure describes what needs to be known to add and implement routes to an existing component.

Routes simply use the `express` framework with the typical `request` and `reponse`.

# Imports

Use the `empty router` folder as a base, it instantiate a router that you can import in your route files.

```ts
import { router } from "./router";
import * as componentName from "..";
```

# Have one route per file

Please have one route per file.

If a route handler function can be used with multiple HTTP methods, don't duplicate the code, and do as follows:
- declare the handler as a variable:
  - `export const handlerName: express.Handler = function (req, _res, next) {};`
- write the content of the function in-between the curly braces
- make the router use the function on the needed methods, for instance:
  - `router.put(handlerName);`
  - `router.post(handlerName);`
  - `router.patch(handlerName);`

# Access to context

A context object is added to requests and can be accessed this way: `request.context`.

> Context *aims* to contain information about the logged in user, which is a feature to come.

# Loading router

Routers are automatically loaded as long as the component exports a function called `useRouter`, the same way the example component does.
