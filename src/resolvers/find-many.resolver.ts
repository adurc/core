
import { ResolverMethod } from './resolver.method';
import v8 from 'v8';
import { ResolverContext } from './resolver.context';
import { AdurcReadProjection } from 'src/interfaces/client/read';
import { AdurcModel } from 'src/interfaces/model';

const prepareProjectionSource = (context: ResolverContext, model: AdurcModel, projection: AdurcReadProjection) => {
    const output: AdurcReadProjection = v8.deserialize(v8.serialize(projection));

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

        output.include[fieldName] = prepareProjectionSource(context, modelRelated, output.include[fieldName]);
    }

    return output;
};

const findManyResolver: ResolverMethod<AdurcReadProjection, unknown[]> = async (
    context,
    model,
    projection,
) => {
    const source = context.sources[model.source];

    if (!source) {
        throw new Error(`Source ${model.source} not registered`);
    }

    const projectionSource = prepareProjectionSource(context, model, projection);

    const results = await source.read(projectionSource);

    return results;
};

export default findManyResolver;