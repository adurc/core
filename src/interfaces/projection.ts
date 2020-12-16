export type ProjectionInfoField = { type: 'field', name: string }
export type ProjectionInfoExpand = {
    type: 'expand';
    name: string;
    fields: ProjectionInfoMeta[];
    args?: Record<string, unknown>
}
export type ProjectionInfoMeta = ProjectionInfoField | ProjectionInfoExpand;
export type ProjectionInfo = ProjectionInfoExpand;
