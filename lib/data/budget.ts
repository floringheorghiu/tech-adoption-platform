import type { Department } from "@/lib/types"

// Mock data for demo purposes
const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Engineering",
    totalBudget: 5000,
    allocatedBudget: 2500,
    remainingBudget: 2500,
  },
  {
    id: "2",
    name: "Product",
    totalBudget: 4000,
    allocatedBudget: 1500,
    remainingBudget: 2500,
  },
  {
    id: "3",
    name: "Marketing",
    totalBudget: 3000,
    allocatedBudget: 1000,
    remainingBudget: 2000,
  },
  {
    id: "4",
    name: "Design",
    totalBudget: 3500,
    allocatedBudget: 2000,
    remainingBudget: 1500,
  },
]

export async function getDepartmentBudgets(): Promise<Department[]> {
  // In a real app, this would query the database
  return mockDepartments
}
