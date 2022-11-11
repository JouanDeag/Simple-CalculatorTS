// Import and build the math module
import { derivativeDependencies, evaluateDependencies, create } from 'mathjs';
export const { derivative, evaluate } = create({
  derivativeDependencies,
  evaluateDependencies,
});
