import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface AppConfig {
  apiUrl: string;
}

/**
 * Service chargé de récupérer la configuration au runtime (avant le démarrage de l'app).
 * Permet de respecter le principe "Build Once, Deploy Anywhere".
 */
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private http = inject(HttpClient);
  
  /** Signal en lecture seule exposant la configuration */
  readonly settings = signal<AppConfig | null>(null);

  /**
   * Charge le fichier JSON de configuration.
   * Cette méthode est appelée via APP_INITIALIZER.
   */
  async loadConfig(): Promise<void> {
    try {
      // En dev, on pourrait charger un config.dev.json si besoin, 
      // ou laisser le mock intercepter cette requête aussi !
      const config = await lastValueFrom(this.http.get<AppConfig>('config.json'));
      this.settings.set(config);
    } catch (error) {
      console.error('Impossible de charger la configuration', error);
    }
  }

  /** * Getter utilitaire pour l'URL API 
   */
  get apiUrl(): string {
    return this.settings()?.apiUrl || '';
  }
}