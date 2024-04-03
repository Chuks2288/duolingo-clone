import { auth } from "@clerk/nextjs";

const adminIds = [
    "user_2dxVUMm1pReR2oHpSvRWvoM3Nxn",
];

export const isAdmin = () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
}