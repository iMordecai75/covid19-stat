import { AnnotationBk } from './annotation-bk';
import { Annotations } from './annotations';
import { Dati } from './dati';
import { Province } from './province';
import { Regioni } from './regioni';

export interface ApiResponse {
  status: string;
  msg: string;
  item: Annotations | AnnotationBk;
  items: Dati[]|Province[]|Regioni[]|Annotations[]|AnnotationBk[];
}
