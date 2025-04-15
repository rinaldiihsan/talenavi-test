'use client';

import React, { useState, useEffect } from 'react';
import TaskTable from './TaskTable';
import StatsSection from './StatsSection';
import ActivityBar from './ActivityBar';
import { fetchTasks } from '@/lib/api';

export interface Task {
  title: string;
  developer: string;
  status: string;
  priority: string;
  type: string;
  date?: string;
  'Estimated SP': number;
  'Actual SP': number;
}

export interface StatData {
  count: number;
  percentage: number;
}

export interface Stats {
  [key: string]: StatData;
}

export interface Option {
  value: string;
  color: string;
}

export default function TableTodo() {
  const [data, setData] = useState<Task[]>([]);
  const [originalData, setOriginalData] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    status: Stats;
    priority: Stats;
    type: Stats;
  }>({
    status: {},
    priority: {},
    type: {},
  });

  const statusOptions: Option[] = [
    { value: 'Ready to start', color: '#3498db' },
    { value: 'In Progress', color: '#f39c12' },
    { value: 'Waiting for review', color: '#9b59b6' },
    { value: 'Pending Deploy', color: '#2ecc71' },
    { value: 'Done', color: '#27ae60' },
    { value: 'Stuck', color: '#e74c3c' },
  ];

  const priorityOptions: Option[] = [
    { value: 'Critical', color: '#e74c3c' },
    { value: 'High', color: '#f39c12' },
    { value: 'Medium', color: '#3498db' },
    { value: 'Low', color: '#2ecc71' },
    { value: 'Best Effort', color: '#95a5a6' },
  ];

  const typeOptions: Option[] = [
    { value: 'Feature Enhancements', color: '#9b59b6' },
    { value: 'Bug', color: '#e74c3c' },
    { value: 'Other', color: '#3498db' },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          try {
            const parsedTasks = JSON.parse(savedTasks);
            if (Array.isArray(parsedTasks) && parsedTasks.length > 0) {
              setData(parsedTasks);
              setOriginalData(parsedTasks);
              calculateStats(parsedTasks);
              setLoading(false);
              return;
            }
          } catch (error) {
            console.error('Error parsing tasks from localStorage:', error);
          }
        }

        const result = await fetchTasks();
        setData(result);
        setOriginalData(result);
        calculateStats(result);

        localStorage.setItem('tasks', JSON.stringify(result));
      } catch (err) {
        setError('Error fetching data: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const calculateStats = (taskData: Task[]) => {
    const statusCount: Record<string, number> = {};
    const priorityCount: Record<string, number> = {};
    const typeCount: Record<string, number> = {};

    taskData.forEach((task) => {
      statusCount[task.status] = (statusCount[task.status] || 0) + 1;
      priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
      typeCount[task.type] = (typeCount[task.type] || 0) + 1;
    });

    const calculatePercentages = (countObj: Record<string, number>, total: number): Stats => {
      const result: Stats = {};
      for (const key in countObj) {
        result[key] = {
          count: countObj[key],
          percentage: Math.round((countObj[key] / total) * 100),
        };
      }
      return result;
    };

    setStats({
      status: calculatePercentages(statusCount, taskData.length),
      priority: calculatePercentages(priorityCount, taskData.length),
      type: calculatePercentages(typeCount, taskData.length),
    });
  };

  const updateData = (updatedData: Task[]) => {
    setData(updatedData);
    calculateStats(updatedData);
  };

  const updateStoredData = (updatedData: Task[]) => {
    setData(updatedData);
    setOriginalData(updatedData);
    calculateStats(updatedData);

    localStorage.setItem('tasks', JSON.stringify(updatedData));
  };

  if (loading) return <div className="p-8 text-center">Loading tasks...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="w-full max-w-[85rem] mx-auto py-8">
      <ActivityBar data={data} updateData={updateData} originalData={originalData} statusOptions={statusOptions} priorityOptions={priorityOptions} typeOptions={typeOptions} />

      <div className="mt-4">
        <TaskTable data={data} updateData={updateStoredData} statusOptions={statusOptions} priorityOptions={priorityOptions} typeOptions={typeOptions} />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatsSection title="Status Distribution" stats={stats.status} options={statusOptions} />
        <StatsSection title="Priority Distribution" stats={stats.priority} options={priorityOptions} />
        <StatsSection title="Type Distribution" stats={stats.type} options={typeOptions} />
      </div>
    </div>
  );
}
