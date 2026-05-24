export class SavePlanUseCase {
  constructor(planRepository) {
    this.planRepository = planRepository;
  }

  execute(plan) {
    return this.planRepository.save(plan);
  }
}
