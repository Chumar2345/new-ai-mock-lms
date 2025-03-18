import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
    const router = useRouter();
    
    const onStart = () => {
        router.push('/dashboard/interview/' + interview?.mockId);
    };
    
    const onFeedbackPress = () => {
        router.push('dashboard/interview/' + interview.mockId + "/feedback");
    };

    return (
        <div className="border border-gray-700 shadow-md rounded-sm p-3 bg-black text-white">
            <h2 className="font-bold text-purple-400">{interview?.jobPosition}</h2>
            <h2 className="text-sm text-gray-400">{interview?.jobExperience} Years</h2>
            <h2 className="text-xs text-gray-500">
                Created At: {interview?.createdAt}
            </h2>
            <div className="flex justify-between gap-5 mt-2">
                <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-purple-400 border-purple-400 hover:bg-purple-700 hover:text-white"
                    onClick={onFeedbackPress}
                >
                    Feedback
                </Button>
                <Button
                    className="w-full bg-purple-500 text-white hover:bg-purple-700"
                    size="sm"
                    onClick={onStart}
                >
                    Start
                </Button>
            </div>
        </div>
    );
};

export default InterviewItemCard;
