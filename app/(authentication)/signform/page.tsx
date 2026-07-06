"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Authentication() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh">
      <h1 className="text-2xl font-bold my-4">Reading Platform</h1>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            {isSignIn ? "Get into your account" : "Create new account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  required
                />
              </div>

              {isSignIn ? (
                <section className="mb-2">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline opacity-70"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                </section>
              ) : (
                <section className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Pen Name</Label>
                    <Input
                      id="pen_name"
                      type="pen_name"
                      placeholder="Your Pen Name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password-2">Retype Password</Label>
                      <Input id="password-2" type="password-2" required />
                    </div>
                    <div className="md:col-span-2">
                      <p className="ml-auto inline-block text-sm opacity-70">
                        Minimum 8 characters, including at least 1 uppercase
                        letter and 1 number.
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          <CardAction>
            Or
            <Button variant="link" onClick={() => setIsSignIn((prev) => !prev)}>
              {isSignIn ? "Sign Up" : "Sign In"}
            </Button>
            {isSignIn ? "to create new account" : "to get into your account"}
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
