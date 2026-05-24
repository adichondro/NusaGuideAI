import { PlanRepository } from '../../domain/repositories/PlanRepository';
import { TripPlan } from '../../domain/entities/TripPlan';

export class LocalStoragePlanRepository extends PlanRepository {
  constructor() {
    super();
    this.storageKey = 'nusaguide_saved_plans';
  }

  getAll() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];
      const plans = JSON.parse(data);
      return plans.map(p => new TripPlan(p));
    } catch (err) {
      console.error('Failed to get plans from localStorage', err);
      return [];
    }
  }

  save(plan) {
    try {
      const plans = this.getAll();
      
      // Ensure plan has ID and timestamps
      if (!plan.id) {
        plan.id = 'plan_' + Date.now();
      }
      if (!plan.saved_at) {
        plan.saved_at = new Date().toISOString();
      }

      // Check if plan already exists to update, else prepend
      const existingIdx = plans.findIndex(p => p.id === plan.id);
      let planEntity = plan instanceof TripPlan ? plan : new TripPlan(plan);
      planEntity.id = plan.id;
      planEntity.saved_at = plan.saved_at;

      if (existingIdx !== -1) {
        plans[existingIdx] = planEntity;
      } else {
        plans.unshift(planEntity);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(plans));
      return planEntity;
    } catch (err) {
      console.error('Failed to save plan to localStorage', err);
      throw err;
    }
  }

  delete(planId) {
    try {
      let plans = this.getAll();
      plans = plans.filter(p => p.id !== planId);
      localStorage.setItem(this.storageKey, JSON.stringify(plans));
      return true;
    } catch (err) {
      console.error('Failed to delete plan from localStorage', err);
      throw err;
    }
  }

  deleteAll() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (err) {
      console.error('Failed to delete all plans from localStorage', err);
      throw err;
    }
  }
}
