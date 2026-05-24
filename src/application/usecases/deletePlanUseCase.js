export class DeletePlanUseCase {
  constructor(planRepository) {
    this.planRepository = planRepository;
  }

  execute(planId) {
    return this.planRepository.delete(planId);
  }
}
