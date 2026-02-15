import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CoreRoutes } from '../../core.routes';
import { User } from '../../users/user.model';
import { AuthService } from './auth.service';
import { LoginRequest } from './auth.model';

/**
 * Définition de la structure de l'état (State).
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * État initial.
 */
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('access_token'), // Réhydratation
  isLoading: false,
  error: null,
};

/**
 * Store d'Authentification (100% Natif Angular).
 * Utilise le pattern "Service-as-a-Store".
 */
@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  // --- DÉPENDANCES ---
  private readonly authApi = inject(AuthService);
  private readonly router = inject(Router);

  // --- STATE (Privé en écriture) ---
  // On utilise un signal qui contient tout l'état
  private readonly _state = signal<AuthState>(initialState);

  // --- SELECTORS (Public en lecture seule) ---
  
  /** Signal exposant l'utilisateur courant */
  readonly user = computed(() => this._state().user);
  
  /** Signal exposant l'état de chargement */
  readonly isLoading = computed(() => this._state().isLoading);
  
  /** Signal dérivé : Est-on connecté ? */
  readonly isAuthenticated = computed(() => {
    const s = this._state();
    return !!s.token && !!s.user; // Ou juste token selon ta logique
  });

  // --- ACTIONS (Méthodes) ---

  /**
   * Connecte l'utilisateur.
   * Met à jour le signal _state en fonction du résultat de l'API.
   * @param credentials Les identifiants de connexion.
   */
  login(credentials: LoginRequest): void {
    // 1. On passe en loading
    this.updateState({ isLoading: true, error: null });

    this.authApi.login(credentials).pipe(
      // Finalize s'exécute en cas de succès OU d'erreur
      finalize(() => this.updateState({ isLoading: false }))
    ).subscribe({
      next: (response) => {
        // 2. Succès : On met à jour le state
        this.updateState({
          user: response.user,
          token: response.token,
          error: null
        });

        // Side Effect : Stockage et redirection
        localStorage.setItem('access_token', response.token);
        this.router.navigate([CoreRoutes.HOME]);
      },
      error: (err) => {
        // 3. Erreur : On met à jour l'erreur
        console.error('Erreur login:', err);
        this.updateState({ error: 'Identifiants incorrects.' });
      }
    });
  }

  /**
   * Déconnecte l'utilisateur.
   */
  logout(): void {
    this._state.set({
      user: null,
      token: null,
      isLoading: false,
      error: null
    });
    localStorage.removeItem('access_token');
    this.router.navigate([CoreRoutes.LOGIN]);
  }

  // --- HELPER PRIVÉ ---
  
  /**
   * Méthode utilitaire pour mettre à jour une partie de l'état proprement.
   * Équivalent léger du "patchState" de NgRx.
   */
  private updateState(partialState: Partial<AuthState>): void {
    this._state.update(current => ({ ...current, ...partialState }));
  }
}