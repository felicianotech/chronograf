export enum TemplateValueType {
  Database = 'database',
  TagKey = 'tagKey',
  FieldKey = 'fieldKey',
  Measurement = 'measurement',
  TagValue = 'tagValue',
  CSV = 'csv',
  Points = 'points',
  Constant = 'constant',
}

export interface TemplateValue {
  value: string
  type: TemplateValueType
  selected: boolean
}

export interface TemplateQuery {
  command: string
  db: string
  database?: string
  rp?: string
  measurement: string
  tagKey: string
  fieldKey: string
  influxql: string
}

export enum TemplateType {
  AutoGroupBy = 'autoGroupBy',
  Constant = 'constant',
  FieldKeys = 'fieldKeys',
  Measurements = 'measurements',
  TagKeys = 'tagKeys',
  TagValues = 'tagValues',
  CSV = 'csv',
  Query = 'query',
  Databases = 'databases',
}

export interface Template {
  id: string
  tempVar: string
  values: TemplateValue[]
  type: TemplateType
  label: string
  query?: TemplateQuery
}

export interface TemplateUpdate {
  key: string
  value: string
}

export interface URLQueryParams {
  [key: string]: string
}
