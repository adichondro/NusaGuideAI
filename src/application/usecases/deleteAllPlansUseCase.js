export class DeleteAllPlansUseCase {
  constructor(planRepository) {
    this.planRepository = planRepository;
  }

  execute() {
    return this.planRepository.deleteAll();
  }
}
