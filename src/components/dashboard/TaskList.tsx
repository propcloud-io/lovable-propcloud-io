
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const tasks = [
  {
    id: 1,
    title: "Review new booking requests",
    completed: false,
    priority: "high",
  },
  {
    id: 2,
    title: "Schedule cleaning for Villa Serenity",
    completed: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "Update pricing for weekend dates",
    completed: true,
    priority: "medium",
  },
  {
    id: 4,
    title: "Respond to guest inquiry for Mountain View property",
    completed: false,
    priority: "high",
  },
  {
    id: 5,
    title: "Order new towels for Downtown Loft",
    completed: true,
    priority: "low",
  },
];

const TaskList = () => {
  const [completedTasks, setCompletedTasks] = React.useState(
    tasks.filter((task) => task.completed).map((task) => task.id)
  );

  const toggleTask = (taskId: number) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Tasks & Reminders</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedTasks.length}/{tasks.length} completed
          </span>
        </CardTitle>
        <CardDescription>Your upcoming tasks and reminders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center space-x-2 p-2 rounded-md ${
              completedTasks.includes(task.id)
                ? "bg-muted line-through text-muted-foreground"
                : ""
            }`}
          >
            <Checkbox
              checked={completedTasks.includes(task.id)}
              onCheckedChange={() => toggleTask(task.id)}
              id={`task-${task.id}`}
            />
            <div className="flex-1 flex items-center justify-between">
              <label
                htmlFor={`task-${task.id}`}
                className="text-sm cursor-pointer flex-1"
              >
                {task.title}
              </label>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "medium"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TaskList;
