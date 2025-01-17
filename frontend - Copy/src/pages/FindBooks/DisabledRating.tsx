import { StarRating } from "@/components/ui/star-rating"

export default function DisabledRating({value} : {value: number}) {
    return (
      <div className="space-y-2 text-center">
        <StarRating 
          defaultValue={value}
          disabled
        />
      </div>
    )
  }