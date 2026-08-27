/**
 * ProjectsShowcase — compatibility shim
 *
 * PortfolioHome.jsx imports this as `{ ProjectsShowcase }`.
 * The implementation has moved to `../work/WorkArchive`.
 * This file re-exports it under the original name so PortfolioHome
 * requires no changes.
 */
export { WorkArchive as ProjectsShowcase } from "../work/WorkArchive";