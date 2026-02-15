import { GammeOperation } from "../gamme-operations/gamme-operation.model";
import { Pointage } from "../pointage.model";

export interface WorkorderOperation{
    id:number,
    workorderId:number,
    gammeOperation:GammeOperation,
    pointages:Pointage[],
}