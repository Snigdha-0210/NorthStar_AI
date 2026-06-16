import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResumeScore } from "@/types";
import { AlertCircle } from "lucide-react";

export function ResumeScoreCard({ score }: { score: ResumeScore }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Overall Score</span>
          <span className={`text-2xl font-bold ${score.overallScore >= 80 ? 'text-green-500' : 'text-amber-500'}`}>
            {score.overallScore}/100
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Impact</span>
              <span>{score.impactScore}/100</span>
            </div>
            <Progress value={score.impactScore} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Brevity</span>
              <span>{score.brevityScore}/100</span>
            </div>
            <Progress value={score.brevityScore} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Skills Match</span>
              <span>{score.skillsMatchScore}/100</span>
            </div>
            <Progress value={score.skillsMatchScore} className="h-2" />
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t">
          <h4 className="font-semibold text-sm">Key Suggestions</h4>
          <ul className="space-y-2">
            {score.suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
