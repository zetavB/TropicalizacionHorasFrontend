export interface Page<t> {
  content: t[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
