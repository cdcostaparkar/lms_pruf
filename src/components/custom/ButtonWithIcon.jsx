import { StepForward } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { handleResumeClick } from "@/lib/navigationUtils"
 
export function ButtonWithIcon({course}) {
  return (
    <div className="flex flex-col items-center mt-4">
      <Button onClick={handleResumeClick(course)}>
        <StepForward /> Resume Course
      </Button>
    </div>
  )
}