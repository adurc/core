export abstract class AdurcBaseError<
    TPipeline extends 'build' | 'execution'
    > extends Error {
    abstract get pipeline(): TPipeline;
}