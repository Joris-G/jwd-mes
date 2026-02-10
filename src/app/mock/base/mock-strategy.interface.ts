/**
 * Interface définissant la stratégie de génération de données pour une entité.
 * Chaque entité (User, Product, etc.) devra implémenter cette interface.
 */
export interface MockStrategy {
  /**
   * Retourne le nom de la collection (ex: 'users').
   * Ce sera la clé utilisée dans l'objet final DB.
   */
  readonly collectionName: string;

  /**
   * Génère et retourne les données initiales pour cette collection.
   * @returns {unknown[]} Tableau d'objets simulés.
   */
  createData(): unknown[];
}