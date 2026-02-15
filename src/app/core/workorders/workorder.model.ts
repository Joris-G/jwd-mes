import { Part } from "../part.model";
import { WorkorderOperation } from "../workorder-operations/workorder-operation.model";
import { WorkorderStatus } from "./workorder-status.model";

export interface Workorder{
    workorderNumber:string,
    part:Part,
    operations:WorkorderOperation,
    plannedEndDate:Date,
    statut:WorkorderStatus,  
}