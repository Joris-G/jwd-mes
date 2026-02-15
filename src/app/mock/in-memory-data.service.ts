import { Injectable } from "@angular/core";
import { InMemoryDbService, RequestInfo, STATUS } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { UsersMock } from "./datas/users.mock";
import { MockStrategy } from "./base/mock-strategy.interface";

@Injectable({providedIn:'root'})
export class InMemoryData implements InMemoryDbService{
    /**
   * Liste des stratégies de mock actives.
   * Pour ajouter une nouvelle entité, il suffit de l'ajouter ici.
   */
  private readonly strategies: MockStrategy[] = [
    new UsersMock(),
  ];

/**
   * Agrège les données de toutes les stratégies en un seul objet DB.
   * * @returns {Record<string, unknown>} L'objet DB final attendu par angular-in-memory-web-api.
   */
  createDb(): Record<string, unknown> {
    const db: Record<string, unknown> = {};

    this.strategies.forEach(strategy => {
      // On associe le nom de la collection (clé) à ses données (valeur)
      db[strategy.collectionName] = strategy.createData();
    });

    console.log('[InMemoryDataService] DB Initialized with:', Object.keys(db));
    return db;
  }

  // La méthode genId peut rester ici de façon générique ou être déléguée si besoin
  genId(collection: any[]): number {
     return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
  }

  post(reqInfo:RequestInfo){
    if(reqInfo.collectionName==='auth'&&reqInfo.id ==='login'){
      return this.handleLoginRequest(reqInfo);
    }
    return undefined
  }

  private handleLoginRequest(reqInfo:RequestInfo):Observable<any>{
    const body = reqInfo.utils.getJsonBody(reqInfo.req);
    const users = reqInfo.collection.find((c:any)=> c.name === 'users')?.data || [];
    const user = users.find((u:any) => u.name === body.username || u.email === body.username);
    if(user){
      return reqInfo.utils.createResponse$(()=>({
        body:{user,token:'fake-jwt-token-dev-mode'},
        status: STATUS.OK
      }))
    }
    return reqInfo.utils.createResponse$(()=>({
      body:{error:'identifiants invalides'},
      status:STATUS.UNAUTHORIZED
    }))
  }
}