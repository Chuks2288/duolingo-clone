import { auth } from "@clerk/nextjs";

const adminIds = [
    "user_2dxVUMm1pReR2oHpSvRWvoM3Nxn",
    "user_2eZT5nDCfN3ZaeFKx5ccFdH4sBe",
];

export const isAdmin = () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
}