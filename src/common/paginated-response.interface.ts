export interface PaginatedResponse<T> {
    count: number;
    limit: number;
    page: number;
    totalPages: number;
    rows: T[];
}