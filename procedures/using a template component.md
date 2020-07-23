# Procedure to use a template component

The examples compoponent can be used a a template for new components, but I must stress that you might not understand everything if you don't try and build a component from scratch yourself.

# 1. Copy the original directory

Make a copy of `examples`, from the `components` directory and give it the name of the component you are creating. Remember, component names are often plural.

# 2. Replace EVERYTHING

Use `yarn template-dir` with the following arguments:
- the path to the new directory you have created (relative will do)
- `example` **singular** (which was the name of the directory, before copy)
- the name you have given the directory, but **singular**.

Example `yarn template-dir src/components/users example user`.

> It will replace all occurences of "examples" and retain the original case.
> e.g.:
> - `ExampleClass` would become `UserClass`;
> - `example_enum` would become `example_enum`;
> - etc...

# 3. Edit the data model class

There should be a file called `NameOfYourComponent.ts`, containing an class definition with the same name, without the file extension.

Inside the class, they are "props".

Edit this class so it matches the data model you want to implement.
