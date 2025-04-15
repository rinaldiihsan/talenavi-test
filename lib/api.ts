// lib/api.ts
import { Task } from '@/app/main-table/_components/TableTodo';

interface ApiResponse {
  response: boolean;
  data: Task[];
}

export async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await fetch(process.env.API_LINK || '');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    if (result.response === true && Array.isArray(result.data)) {
      return result.data;
    } else {
      throw new Error('Invalid data format received from API');
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

// In a real application, you would add functions to update tasks here
export async function updateTask(taskData: Task): Promise<{ success: boolean }> {
  // Implementation would depend on your API
  console.log('Updating task:', taskData);
  return { success: true };
}
