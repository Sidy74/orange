export class PharmacieModel {
  id: number = 0;
  code: string = '';
  name: string = '';
  isEnabled: boolean = true;
  // assignmentPharmacieGardes: AssignmentPharmacieGardeModel[] = []; // Liste des gardes associées

  constructor(id?: number, code?: string, name?: string, isEnabled: boolean = true) {
    this.id = id || 0;
    this.code = code || '';
    this.name = name || '';
    this.isEnabled = isEnabled;
  }

}
export class AssignmentPharmacieGardeModel {
  id: number = 0;
  pharmacieId: number = 0;
}
