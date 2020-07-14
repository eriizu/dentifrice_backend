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
        findByToto: QueryMethod<typeof findByToto>;
    }

    // Define query helper functions here
    export function findByToto(this: ReturnModelType<typeof Example, IQueryHelpers>, toto: number) {
        return this.find({ toto });
    }
}

// This is a sub class of the main document.
export class Foo {
    @prop({ unique: true })
    bar?: string;

    set patate(tata: string) {
        this.bar = tata;
    }
}

@modelOptions({ schemaOptions: { timestamps: true } })
// This is how we enable query helpers.
@queryMethod(queryHelpers.findByToto)
// This is the main document
export class Example {
    @prop({ _id: false })
    foo?: Foo;

    @prop({ required: true })
    toto!: number;

    print() {
        console.log(this.foo.bar + this.toto);
    }
}

// This produces the model, which is the object to use when queriying the database.
export const model = getModelForClass<typeof Example, queryHelpers.IQueryHelpers>(Example);

// ExampleModel.findOne({}).then((doc) => {
//     doc.print();
//     doc.foo.patate = "prout";
//     doc._id
// });

// ExampleModel.find().byToto(12).orFail();
