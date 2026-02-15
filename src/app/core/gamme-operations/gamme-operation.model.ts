import { CentreFrai } from "../centre-frais.model";

export interface GammeOperation{
    id:number,
    centreFrai:CentreFrai,
    designation:string,
    instructionTravail:string,
    instructionControle:string,
}