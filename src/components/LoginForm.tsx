
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useOnboarding } from '@/contexts/OnboardingContext';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { startOnboarding } = useOnboarding();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (values.email === 'contact@propcloud.io' && values.password === 'admin123') {
      toast({
        title: "Login successful",
        description: "Welcome to PropCloud dashboard",
      });

      // Check if user needs onboarding
      const onboardingCompleted = localStorage.getItem('onboarding_completed') === 'true';
      const isNewUser = !localStorage.getItem('onboarding_started');
      
      if (!onboardingCompleted && isNewUser) {
        // This is a new user who hasn't completed onboarding yet
        localStorage.setItem('onboarding_started', 'true');
        startOnboarding(); // Start the onboarding process
      }
      
      navigate('/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleDemoAccess = () => {
    // For demo exploration without login
    navigate('/dashboard');
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-sm text-muted-foreground mb-2">For demo purposes, use:</p>
          <div className="text-xs text-muted-foreground">
            <div>Email: <span className="font-mono">contact@propcloud.io</span></div>
            <div>Password: <span className="font-mono">admin123</span></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button variant="link" className="w-full" onClick={handleDemoAccess}>
          Skip login and explore the demo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
