import { User } from '../../core/users/user.model';
import { MockStrategy } from '../base/mock-strategy.interface';

/**
 * Stratégie de mock pour l'entité User.
 * Responsable uniquement de la génération des utilisateurs.
 */
export class UsersMock implements MockStrategy {
  
  readonly collectionName = 'users';

  /**
   * Crée la liste des utilisateurs.
   * @returns {User[]} Liste des utilisateurs simulés.
   */
  createData(): User[] {
    return [
      { id: 1, name: 'Alice Dev', role: 'Admin' },
      { id: 2, name: 'Bob Pro', role: 'User' },
      { id: 3, name: 'Charlie Stagiaire', role: 'Guest' }
    ];
  }
}