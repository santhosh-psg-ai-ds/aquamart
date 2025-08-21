"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Fish } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [city, setCity] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCreateAccount = async () => {
    if (!name || !mobile || !city) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)
    try {
      await addDoc(collection(db, "users"), {
        name,
        mobile,
        city,
      })
      toast({
        title: "Success",
        description: "Your account has been created.",
      })
      setName("")
      setMobile("")
      setCity("")
    } catch (error) {
      console.error("Error adding document: ", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="space-y-1 text-center">
        <div className="inline-flex justify-center mb-4">
            <Fish className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input id="mobile" type="tel" placeholder="9876543210" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="Mumbai" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" onClick={handleCreateAccount} disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
