export interface DomainConfig {
  key: string;
  label: string;
  folder: string;
  files: string[];
}

export interface AbstractSegment {
  content: string;
  move: string;
  subtype?: string;
}
