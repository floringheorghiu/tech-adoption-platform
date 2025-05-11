export interface User {
  id: string
  name: string | null
  email: string
  password: string
  totalBudget: number
  allocatedBudget: number
  remainingBudget: number
  createdAt: Date
  updatedAt: Date
}

export interface Request {
  id: string
  userId: string
  toolName: string
  amount: number
  justification: string
  goals: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  createdAt: Date
  updatedAt: Date
}

export interface Experience {
  id: string
  userId: string
  requestId: string
  title: string
  description: string
  toolName: string
  rating: number
  feedback: string
  tags: string[]
  mediaUrl: string | null
  upvotes: number
  comments: number
  createdAt: Date
  updatedAt: Date
}

export interface RequestWithUser extends Request {
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
}

export interface ExperienceWithUser extends Experience {
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
}

export interface ApprovedRequest {
  id: string
  toolName: string
}

export interface Department {
  id: string
  name: string
  totalBudget: number
  allocatedBudget: number
  remainingBudget: number
}
