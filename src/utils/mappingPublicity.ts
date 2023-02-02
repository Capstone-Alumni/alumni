import { Information, ScopePublicity } from "@prisma/client";

export const isAllowToViewValue = (currentUserInfomation: Information, profileInfomation: Information, permissionToSee: ScopePublicity): Boolean => {
    if (permissionToSee === "PRIVATE") return false;
    if (permissionToSee === "SCHOOL") return true;

    if (permissionToSee === "GRADE") {
        return currentUserInfomation.gradeName === profileInfomation.gradeName
    } else {
        return currentUserInfomation.className === profileInfomation.className
    }

    return false;
}