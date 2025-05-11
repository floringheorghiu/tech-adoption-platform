import type { ExperienceWithUser } from "@/lib/types"

// Mock data for demo purposes
const mockExperiences: ExperienceWithUser[] = [
  {
    id: "1",
    userId: "2",
    requestId: "3",
    title: "My Experience with Notion",
    description: "How Notion transformed our team's documentation process",
    toolName: "Notion",
    rating: 5,
    feedback:
      "Notion has completely transformed how our team handles documentation. The flexibility of databases combined with rich text editing makes it perfect for our needs.",
    tags: ["Productivity", "Documentation", "Collaboration"],
    mediaUrl: null,
    upvotes: 12,
    comments: 3,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    user: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      image: null,
    },
  },
  {
    id: "2",
    userId: "1",
    requestId: "2",
    title: "Exploring AWS Lambda",
    description: "My journey learning serverless architecture with AWS",
    toolName: "AWS",
    rating: 4,
    feedback:
      "AWS Lambda has been a game-changer for how I think about backend development. The serverless approach eliminates many infrastructure concerns.",
    tags: ["Cloud", "Development", "Serverless"],
    mediaUrl: null,
    upvotes: 8,
    comments: 2,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      image: null,
    },
  },
]

export async function getRecentExperiences(): Promise<ExperienceWithUser[]> {
  // In a real app, this would query the database
  return [...mockExperiences].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getUserExperiences(userId: string): Promise<ExperienceWithUser[]> {
  // In a real app, this would query the database
  return mockExperiences.filter((experience) => experience.userId === userId)
}
