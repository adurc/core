
import v8 from 'v8';
import { AdurcFindManyArgs } from '../interfaces/client/find-many.args';
import { AdurcContext } from '../interfaces/context';
import { AdurcModel } from '../interfaces/model';
import { ResolverMethod } from './resolver.method';

const prepareSourceArgs = (context: AdurcContext, model: AdurcModel, args: AdurcFindManyArgs) => {
    const output: AdurcFindManyArgs = v8.deserialize(v8.serialize(args));

    for (const fieldName in output.include) {
        const field = model.fields.find(x => x.name === fieldName);
        if (!field) {
            throw new Error(`Unexpected field name ${fieldName} in model ${model.name}`);
        }

        const modelRelated = context.models.find(x => x.name === field.type);
        if (!modelRelated) {
            continue; // it's a field
        }

        if (modelRelated.source !== model.source) {
            // TODO: store path for resolve when we'll get response of parent source
            continue;
        }

        output.include[fieldName] = prepareSourceArgs(context, modelRelated, output.include[fieldName]);
    }

    return output;
};

const findManyResolver: ResolverMethod<AdurcFindManyArgs, unknown[]> = async (
    context,
    model,
    args,
) => {
    const source = context.sources.find(x => x.name === model.source);

    if (!source) {
        throw new Error(`Source ${model.source} not registered`);
    }

    const sourceArgs = prepareSourceArgs(context, model, args);

    const results = await source.driver.findMany(model, sourceArgs);

    return results;
};

export default findManyResolver;