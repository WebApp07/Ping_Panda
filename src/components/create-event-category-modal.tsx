import { useQueryClient } from "@tanstack/react-query"
import { PropsWithChildren, useState } from "react"

export const CreateEventCategoryModal = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
}
