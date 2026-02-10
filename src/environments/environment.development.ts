import { importProvidersFrom } from "@angular/core";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { EnvironmentConfig } from "./environment.interface";
import { InMemoryData } from "../app/mock/in-memory-data.service";

export const environment:EnvironmentConfig = {
    apiUrl:'',
    mockProviders:[
        importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryData, {
        delay: 500,
        dataEncapsulation: false 
      })
    )
    ]
};
