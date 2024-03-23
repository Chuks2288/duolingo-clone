import { cache } from "react";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs";
import { challengProgress, courses, units, userProgress } from "./schema";
import { eq } from "drizzle-orm";

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        }
    })

    return data;
});

export const getUnits = cache(async () => {
    const userProgress = await getUserProgress();
    const { userId } = await auth();

    if (!userId || !userProgress?.activeCourseId) {
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengProgress: {
                                where: eq(
                                    challengProgress.userId,
                                    userId
                                )
                            }
                        }
                    }
                }
            }
        }
    });

    const normalizedData = data.map((unit) => {
        const lessonWithCompleteStatus = unit.lessons.map((lesson) => {
            const allCompleteChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengProgress && challenge.challengProgress.length > 0 && challenge.challengProgress.every((progress) => progress.completed);
            });

            return { ...lesson, completed: allCompleteChallenges }
        })
        return { ...unit, lessons: lessonWithCompleteStatus }
    })

    return normalizedData;
})

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();

    return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),

        // TODO: Populate units and lessons
    });

    return data;
});
