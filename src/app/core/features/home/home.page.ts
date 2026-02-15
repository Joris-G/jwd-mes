import { Component } from "@angular/core";
import { CoreRoutes } from "../../core.routes";
import { RouterLink } from "@angular/router";

@Component({
    imports:[RouterLink],
    template:`
        <div class="button" [routerLink]="['/',coreRoutes.LOGIN]">Home page works !</div>
    `
})
export class HomePage{
protected readonly coreRoutes = CoreRoutes;
}