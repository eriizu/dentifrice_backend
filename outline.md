# Things to consider

- configuration
  - startup configuration
  - passed arround configuration
- adding routes
- adding middleware
- managing database entries
- i18n

# Configuration

The configuration needs to be setup upon startup pulling from:

- env variables
- a configuration file

With this precedence.

The config object can then be passed when creating objects such as database collections, middlewares and controllers in general, in a context.

# i18n

# Component

- component
  - Interfaces (what the component provides)
  - db
    - DocuementInterface (with method descriptions)
    - methods
      - index (exports all methods)
      - individual methods
    - DbInterface (with statics)
    - statics
      - individual statics
  - controller
    - index (exports all functions)
    - controlling functions
  - routes
    - index (exports all routes)
    - individual routes

# Routes

How to ensure testability?

Each file describing a route shall:

- Have a function that interfaces with express that
  - extracts parameters and body from the request;
  - calls the controlling function;
  - depending on the return/throw respond with the proper code and body.
- Have a controlling function that:
  - has it's own parameters, not dependend on the library being used to honour the request;
  -
