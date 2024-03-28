"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartModal = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const { isOpen, onClose } = useHeartsModal();

    useEffect(() => {
        setIsMounted(true)
    }, []);

    const onClick = () => {
        close();
        router.push("/store")
    };

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                            src="/mascot_bad.svg"
                            alt="Mascot"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold">
                        You ran out of hearts!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Get Pro for unlimited hearts, or purchase them in the store.
                    </DialogDescription>
                    <DialogFooter className="mb-4">
                        <div className="flex flex-col gap-y-4 w-full">
                            <Button
                                variant="primary"
                                className="w-full"
                                size="lg"
                                onClick={onClick}
                            >
                                Get unlimited hearts
                            </Button>
                            <Button
                                variant="primaryOutline"
                                className="w-full"
                                size="lg"
                                onClick={onClose}
                            >
                                No thanks
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

