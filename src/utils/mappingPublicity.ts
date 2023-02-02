import { AccessLevel, ScopePublicity } from "@prisma/client";

const conditionToView = (accessLevel: AccessLevel, permissionToSee: ScopePublicity): Boolean => {
    const isSchool = AccessLevel.SCHOOL_ADMIN === accessLevel;
    const isGrade = AccessLevel.GRADE_MOD === accessLevel && (permissionToSee === "GRADE" || permissionToSee === "CLASS");
    const isClass = AccessLevel.CLASS_MOD === accessLevel && permissionToSee === "CLASS";
    const isPrivate = permissionToSee === "PRIVATE";

    if (isPrivate) return false;

    return isSchool || isGrade || isClass
}

export const isAllowToViewValue = (currentUserPermission: string, permissionToSee: string): Boolean => {
    return conditionToView(currentUserPermission as AccessLevel, permissionToSee as ScopePublicity)
}