// Import and build the math module
import {
  derivativeDependencies,
  evaluateDependencies,
  sqrtDependencies,
  create,
} from 'mathjs';
export const { derivative, evaluate, sqrt } = create({
  derivativeDependencies,
  evaluateDependencies,
  sqrtDependencies,
});
