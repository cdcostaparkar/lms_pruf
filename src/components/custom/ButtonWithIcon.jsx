import { StepForward } from "lucide-react"
 
import { Button } from "@/components/ui/button"
 
export function ButtonWithIcon() {
  return (
    <div className="flex flex-col items-center mt-4">
      <Button>
        <StepForward /> Resume Course
      </Button>
    </div>
  )
}