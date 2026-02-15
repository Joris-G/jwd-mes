import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../app-config.service';
import { AuthResponse, LoginRequest } from './auth.model';

/**
 * Service responsable uniquement des appels HTTP liés à l'authentification.
 * Ce service est "stateless" : il ne conserve aucune donnée utilisateur.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(AppConfigService);

  /**
   * Envoie les identifiants au serveur pour obtenir un token.
   * @param {LoginRequest} credentials - L'objet contenant username et password.
   * @returns {Observable<AuthResponse>} La réponse contenant le token et l'utilisateur.
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.config.apiUrl}/auth/login`, 
      credentials
    );
  }

  /**
   * Vérifie la validité du token actuel ou le rafraîchit.
   * Utile au démarrage de l'app.
   */
  me(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.config.apiUrl}/auth/me`);
  }
}