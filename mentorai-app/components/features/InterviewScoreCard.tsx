import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InterviewScore } from "@/types";

export function InterviewScoreCard({ score }: { score: InterviewScore }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Interview Performance</span>
          <span className={`text-2xl font-bold ${score.overallScore >= 80 ? 'text-green-500' : 'text-amber-500'}`}>
            {score.overallScore}/100
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Communication</span>
            <div className="flex items-center gap-2">
              <Progress value={score.communicationScore} className="h-2" />
              <span className="text-sm font-medium">{score.communicationScore}</span>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Technical</span>
            <div className="flex items-center gap-2">
              <Progress value={score.technicalScore} className="h-2" />
              <span className="text-sm font-medium">{score.technicalScore}</span>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Confidence</span>
            <div className="flex items-center gap-2">
              <Progress value={score.confidenceScore} className="h-2" />
              <span className="text-sm font-medium">{score.confidenceScore}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-semibold text-sm mb-2">AI Feedback</h4>
          <p className="text-sm text-muted-foreground italic">&ldquo;{score.feedback}&rdquo;</p>
        </div>
      </CardContent>
    </Card>
  );
}
