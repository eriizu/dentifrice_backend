import {
    prop,
    modelOptions,
    getModelForClass,
    ReturnModelType,
    queryMethod,
} from "@typegoose/typegoose";

// Seperate the query helpers from the rest.
namespace queryHelpers {
    type QueryMethod<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T>;

    // List all query helper functions here:
    export interface IQueryHelpers {
        findByTag: QueryMethod<typeof findByTag>;
    }

    // Define query helper functions here
    export function findByTag(this: ReturnModelType<typeof Example, IQueryHelpers>, tag: number) {
        return this.find({ tag });
    }
}

// This is a sub class of the main document.
export class Foo {
    @prop({ unique: true })
    bar?: string;

    set setbar(tata: string) {
        this.bar = tata;
    }
}

@modelOptions({ schemaOptions: { timestamps: true } })
// This is how we enable query helpers.
@queryMethod(queryHelpers.findByTag)
// Main class of the file, the "Example" entity model.
export class Example {
    @prop({ _id: false })
    foo?: Foo;

    @prop({ required: true })
    tag!: number;

    print() {
        console.log(this.foo.bar + this.tag);
    }
}

// This produces the model, which is the object to use when queriying the database.
export const model = getModelForClass<typeof Example, queryHelpers.IQueryHelpers>(Example);
