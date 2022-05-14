/* eslint-disable prettier/prettier */
import { SelectQueryBuilder } from "typeorm";

enum QueryOperation {
    AND = "AND",
    OR = "OR",
    AND_IN_IDS = "AND_IN_IDS",
    OR_IN_IDS = "OR_IN_IDS",
}

interface IQueryParams {
    property: string;
    value: string;
    operation: QueryOperation;
    ids?: string[];
}

function getQueryOperation<T>(
    query: SelectQueryBuilder<T>,
    queryParam: IQueryParams
): SelectQueryBuilder<T> {
    switch (queryParam.operation) {
        case QueryOperation.AND:
            return query.andWhere(
                `${queryParam.property} = :${queryParam.property}`,
                {
                    [queryParam.property]: queryParam.value,
                }
            );
        case QueryOperation.OR:
            return query.orWhere(
                `${queryParam.property} = :${queryParam.property}`,
                {
                    [queryParam.property]: queryParam.value,
                }
            );
        case QueryOperation.AND_IN_IDS:
            return query.andWhereInIds(queryParam.ids);
        case QueryOperation.OR_IN_IDS:
            return query.orWhereInIds(queryParam.ids);
        default:
            throw new Error(`Unknown operation: ${queryParam.operation}!`);
    }
}

function buildQuery<T>(
    queryParams: IQueryParams[],
    query: SelectQueryBuilder<T>
): void {
    queryParams.forEach((queryParam) => {
        if (queryParam.property && queryParam.value) {
            getQueryOperation(query, queryParam);
        }
    });
}

export { buildQuery, QueryOperation };
