# Information to implement middleware

Middlewares are also implemented as express handlers. They are defined in a `middlewares` directory, inside a component.

Middleware can either be:
- global, and therefore should be added (pushed) to a field call `list` and of type `express.Handler[]` exported by the middlewares directory;
- non-global (to be cherrypicked for use by each routes that needs them), and simply need to be exported by their name.

An example of global middleware is the `addContext` middleware.

An example of non-global is `requiresAuth`, because not all routes require users to be connected.

# Loading global middlewares

Global middlewares are automatically loaded as long as the component exports a `middleware.list`.