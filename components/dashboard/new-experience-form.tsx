"use client"

import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { createExperience } from "@/lib/actions/experiences"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { ApprovedRequest } from "@/lib/types"
import { Rating } from "@/components/dashboard/rating"

const experienceFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  requestId: z.string().min(1, {
    message: "Please select a tool/service.",
  }),
  rating: z.number().min(1).max(5),
  feedback: z.string().min(10, {
    message: "Feedback must be at least 10 characters.",
  }),
  tags: z.string().min(1, {
    message: "Please add at least one tag.",
  }),
})

type ExperienceFormValues = z.infer<typeof experienceFormSchema>

interface NewExperienceFormProps {
  userId: string
  approvedRequests: ApprovedRequest[]
}

export function NewExperienceForm({ userId, approvedRequests }: NewExperienceFormProps) {
  const router = useRouter()
  const [mediaFile, setMediaFile] = useState<File | null>(null)

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      title: "",
      description: "",
      requestId: "",
      rating: 0,
      feedback: "",
      tags: "",
    },
  })

  async function onSubmit(data: ExperienceFormValues) {
    try {
      // In a real app, you would upload the media file to a storage service
      // and get back a URL to store in the database
      let mediaUrl = ""
      if (mediaFile) {
        // Simulate file upload
        mediaUrl = URL.createObjectURL(mediaFile)
      }

      const request = approvedRequests.find((r) => r.id === data.requestId)

      await createExperience({
        userId,
        title: data.title,
        description: data.description,
        requestId: data.requestId,
        toolName: request?.toolName || "",
        rating: data.rating,
        feedback: data.feedback,
        tags: data.tags.split(",").map((tag) => tag.trim()),
        mediaUrl,
      })

      toast({
        title: "Experience shared",
        description: "Your experience has been shared successfully.",
      })

      router.push("/dashboard/experiences")
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your experience could not be shared. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0])
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="requestId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tool/Service</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tool/service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {approvedRequests.length > 0 ? (
                    approvedRequests.map((request) => (
                      <SelectItem key={request.id} value={request.id}>
                        {request.toolName}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No approved requests
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormDescription>Select a tool/service from your approved requests.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., My experience with Figma" {...field} />
              </FormControl>
              <FormDescription>A brief title for your experience.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Briefly describe your overall experience" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormDescription>A brief summary of your experience.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Rating value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>Rate your experience from 1 to 5 stars.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Feedback</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your detailed thoughts, insights, and feedback"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide detailed feedback about your experience.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI, Productivity, Design (comma-separated)" {...field} />
              </FormControl>
              <FormDescription>Add tags to categorize your experience (comma-separated).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Media Upload</FormLabel>
          <Input type="file" accept="image/*,video/*" onChange={handleFileChange} className="mt-2" />
          <p className="text-sm text-muted-foreground mt-1">
            Upload screenshots, screen recordings, or video walkthroughs.
          </p>
        </div>
        <Button type="submit">Share Experience</Button>
      </form>
    </Form>
  )
}
