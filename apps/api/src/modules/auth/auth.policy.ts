const DEFAULT_ROLE_POLICIES: Record<string, string[]> = {
  user: ["user.read.self", "user.update.self", "user.soft_delete.self"],
  teacher: ["user.read", "user.create", "user.update"],
  admin: ["user.read", "user.create", "user.update", "user.soft_delete", "user.assign_roles"],
  super_admin: ["*"],
};

export function normalizeRoleName(role: string) {
  return role.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

export function normalizeRoles(roles: string[] | undefined, fallback: string[] = ["user"]) {
  const source = roles && roles.length > 0 ? roles : fallback;
  return Array.from(new Set(source.map(normalizeRoleName)));
}

export function getRolePolicies() {
  return DEFAULT_ROLE_POLICIES;
}

export function hasPermission(
  roles: string[],
  action: string,
  options?: { isSelf?: boolean }
) {
  const normalizedRoles = normalizeRoles(roles);
  const policies = getRolePolicies();
  const resource = action.split(".")[0];
  const granted = new Set<string>();

  for (const role of normalizedRoles) {
    for (const permission of policies[role] ?? []) {
      granted.add(permission);
    }
  }

  if (granted.has("*")) return true;
  if (granted.has(action)) return true;
  if (granted.has(`${resource}.*`)) return true;

  if (options?.isSelf) {
    if (granted.has(`${action}.self`)) return true;
    if (granted.has(`${resource}.*.self`)) return true;
  }

  return false;
}
