import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { Header } from "./components/header"
import { UserProgress } from "@/components/user-progress"
import {
    getCourseProgress,
    getLessonPercentage,
    getUserProgress,
    getUnits,
} from "@/db/queries"
import { redirect } from "next/navigation"
import { Unit } from "./components/unit"
import { lessons, lessonsRelations } from "@/db/schema"

const LearnPage = async () => {
    const userProgress = await getUserProgress();
    const courseProgress = await getCourseProgress();
    const lessonPercentage = await getLessonPercentage();
    const units = await getUnits();

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    if (!courseProgress) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />

                {units.map((unit: any) => (
                    <Unit
                        key={unit.id}
                        title={unit.title}
                        id={unit.id}
                        order={unit.order}
                        description={unit.description}
                        lessons={unit.lessons}
                        activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                            unit: typeof unitsSchema.$inferSelect;
                        } | undefined}
                        activeLessonPercentage={lessonPercentage}
                    />
                ))
                }
            </FeedWrapper >
        </div >
    )
}

export default LearnPage;