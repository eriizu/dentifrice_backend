import {
    prop,
    modelOptions,
    getModelForClass,
    ReturnModelType,
    queryMethod,
} from "@typegoose/typegoose";

namespace find {
    type QueryMethod<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T>;

    export interface IQueryHelpers {
        byToto: QueryMethod<typeof byToto>;
    }

    export function byToto(this: ReturnModelType<typeof Example, IQueryHelpers>, toto: number) {
        return this.find({ toto });
    }
}

export class Foo {
    @prop({ unique: true })
    bar?: string;

    set patate(tata: string) {
        this.bar = tata;
    }
}

@modelOptions({ schemaOptions: { timestamps: true } })
@queryMethod(find.byToto)
export class Example {
    @prop({ _id: false })
    foo?: Foo;

    @prop({ required: true })
    toto!: number;

    print() {
        console.log(this.foo.bar + this.toto);
    }
}

export const ExampleModel = getModelForClass<typeof Example, find.IQueryHelpers>(Example);

ExampleModel.findOne({}).then((doc) => {
    doc.print();
    doc.foo.patate = "prout";
});

ExampleModel.find().byToto(12).orFail();
