export class GetSavedPlansUseCase {
  constructor(planRepository) {
    this.planRepository = planRepository;
  }

  execute() {
    return this.planRepository.getAll();
  }
}
