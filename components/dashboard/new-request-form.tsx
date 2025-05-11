"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { createRequest } from "@/lib/actions/requests"
import { useRouter } from "next/navigation"

const requestFormSchema = z.object({
  toolName: z.string().min(2, {
    message: "Tool name must be at least 2 characters.",
  }),
  amount: z.coerce
    .number()
    .positive({
      message: "Amount must be a positive number.",
    })
    .min(1, {
      message: "Amount must be at least $1.",
    }),
  justification: z.string().min(10, {
    message: "Justification must be at least 10 characters.",
  }),
  goals: z.string().min(10, {
    message: "Goals must be at least 10 characters.",
  }),
})

type RequestFormValues = z.infer<typeof requestFormSchema>

interface NewRequestFormProps {
  userId: string
  remainingBudget: number
}
export function NewRequestForm({ userId, remainingBudget }: NewRequestFormProps) {
  const router = useRouter()
  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      toolName: "",
      amount: 0,
      justification: "",
      goals: "",
    },
  })

  async function onSubmit(data: RequestFormValues) {
    if (data.amount > remainingBudget) {
      toast({
        title: "Insufficient budget",
        description: `Your request exceeds your remaining budget of $${remainingBudget.toFixed(2)}.`,
        variant: "destructive",
      })
      return
    }
    // Always store request in localStorage (demo mode)
    try {
      const mockRequests = JSON.parse(localStorage.getItem("mockRequests") || "[]");
      const newMock = {
        id: Date.now().toString(),
        userId,
        toolName: data.toolName,
        amount: data.amount,
        justification: data.justification,
        goals: data.goals,
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockRequests.push(newMock);
      localStorage.setItem("mockRequests", JSON.stringify(mockRequests));
      toast({
        title: "Request submitted",
        description: "Your request has been stored locally.",
      });
      router.push("/dashboard/requests");
      router.refresh();
    } catch (storageError) {
      toast({
        title: "Something went wrong",
        description: "Your request could not be stored locally.",
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="toolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tool/Service Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Figma, AWS, Notion" {...field} />
                </FormControl>
                <FormDescription>The name of the tool or service you want to try.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount ($)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormDescription>Your remaining budget: ${remainingBudget.toFixed(2)}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="justification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Justification</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Why do you want to try this tool/service?"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Explain why this tool would be valuable to explore.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intended Outcomes/Goals</FormLabel>
              <FormControl>
                <Textarea placeholder="What do you hope to learn or achieve?" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormDescription>Describe what you hope to learn or achieve with this tool.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Request</Button>
      </form>
    </Form>
  )
}
