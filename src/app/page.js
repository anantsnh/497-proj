"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  sourceLanguage: z.enum(["english", "spanish", "italian"]),
  targetLanguage: z.enum(["english", "spanish", "italian"]),
  podcastLink: z.string().url({ message: "Invalid URL format." }),
});


export default function Home() {

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // TODO add API call
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-48">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="border p-10 rounded-lg w-full max-w-6xl mx-auto">
            <h2 className="text-left text-2xl font-bold mb-6">Podcast Translator</h2>

            <div className="flex justify-between gap-8 mb-6">
              {/* Source Language Field */}
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="sourceLanguage"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Source Language</FormLabel>

                      <FormDescription>
                        Choose the original language of the content.
                      </FormDescription>

                      <FormControl>
                        <select {...field} className="select-class w-full">
                          <option disabled selected>Select</option> {/* Default select option */}
                          <option value="english">English</option>
                          <option value="spanish">Spanish</option>
                          <option value="italian">Italian</option>
                        </select>
                      </FormControl>

                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              {/* Target Language Field */}
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="targetLanguage"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Target Language</FormLabel>

                      <FormDescription>
                        Choose the language to translate the content into.
                      </FormDescription>

                      <FormControl>
                        <select {...field} className="select-class w-full">
                          <option disabled selected>Select</option> {/* Default select option */}
                          <option value="english">English</option>
                          <option value="spanish">Spanish</option>
                          <option value="italian">Italian</option>
                        </select>
                      </FormControl>

                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Podcast Link Field */}
            <div className="mb-6">
              <FormField
                control={form.control}
                name="podcastLink"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Podcast Link</FormLabel>

                    <FormDescription>
                      Enter the URL of the podcast episode.
                    </FormDescription>

                    <FormControl>
                      <Input type="url" placeholder="https://yourpodcast.com/episode" {...field} className="w-full" />
                    </FormControl>

                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">Submit</Button>
          </div>
        </form>
      </Form>
    </main>


  );
}
