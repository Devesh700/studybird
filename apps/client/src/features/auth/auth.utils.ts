export const ADMIN_PANEL_ROLES = ["admin", "super_admin", "teacher"] as const;

export function normalizeRole(role: string) {
  return role.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

export function normalizeRoles(roles: string[] | undefined) {
  return Array.from(new Set((roles ?? []).map(normalizeRole)));
}

export function hasAnyRole(userRoles: string[] | undefined, requiredRoles: readonly string[]) {
  const normalizedUserRoles = normalizeRoles(userRoles);
  const normalizedRequired = requiredRoles.map(normalizeRole);
  return normalizedRequired.some((role) => normalizedUserRoles.includes(role));
}

export function isAdminRole(userRoles: string[] | undefined) {
  return hasAnyRole(userRoles, ADMIN_PANEL_ROLES);
}

export function getAdminLandingPath(userRoles: string[] | undefined) {
  const roles = normalizeRoles(userRoles);
  if (roles.includes("super_admin")) return "/admin/super-admin";
  if (roles.includes("admin")) return "/admin/admin";
  if (roles.includes("teacher")) return "/admin/teacher";
  return "/admin";
}
