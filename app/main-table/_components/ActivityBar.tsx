'use client';

import React, { useState, useEffect } from 'react';
import { Search, CircleUserRound, ArrowDownUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Task } from '@/app/main-table/_components/TableTodo';

interface ActivityBarProps {
  data: Task[];
  updateData: (updatedData: Task[]) => void;
  originalData: Task[];
  statusOptions: { value: string; color: string }[];
  priorityOptions: { value: string; color: string }[];
  typeOptions: { value: string; color: string }[];
}

export default function ActivityBar({ data, updateData, originalData, statusOptions, priorityOptions, typeOptions }: ActivityBarProps) {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByPerson, setSortByPerson] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);

  // New task form state
  const [newTask, setNewTask] = useState<Task>({
    title: '',
    developer: '',
    status: 'Ready to start',
    priority: 'Medium',
    type: 'Feature Enhancements',
    date: new Date().toISOString(),
    'Estimated SP': 0,
    'Actual SP': 0,
  });

  const handleNewTaskSubmit = () => {
    const updatedData = [...originalData, newTask];

    localStorage.setItem('tasks', JSON.stringify(updatedData));

    let displayData = [...updatedData];
    if (sortByPerson) {
      displayData = displayData.sort((a, b) => a.developer.localeCompare(b.developer));
    } else if (sortByDate) {
      displayData = displayData.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }

    updateData(displayData);

    setNewTask({
      title: '',
      developer: '',
      status: 'Ready to start',
      priority: 'Medium',
      type: 'Feature Enhancements',
      date: new Date().toISOString(),
      'Estimated SP': 0,
      'Actual SP': 0,
    });

    setIsNewTaskOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value) {
      const filteredData = originalData.filter((task) => task.title.toLowerCase().includes(e.target.value.toLowerCase()) || task.developer.toLowerCase().includes(e.target.value.toLowerCase()));

      let displayData = [...filteredData];
      if (sortByPerson) {
        displayData = displayData.sort((a, b) => a.developer.localeCompare(b.developer));
      } else if (sortByDate) {
        displayData = displayData.sort((a, b) => {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      }

      updateData(displayData);
    } else {
      let displayData = [...originalData];
      if (sortByPerson) {
        displayData = displayData.sort((a, b) => a.developer.localeCompare(b.developer));
      } else if (sortByDate) {
        displayData = displayData.sort((a, b) => {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      }

      updateData(displayData);
    }
  };

  const handleSortByPerson = () => {
    const newSortByPerson = !sortByPerson;
    setSortByPerson(newSortByPerson);
    setSortByDate(false);
    if (newSortByPerson) {
      const filteredData = searchTerm ? originalData.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.developer.toLowerCase().includes(searchTerm.toLowerCase())) : originalData;
      const sortedData = [...filteredData].sort((a, b) => a.developer.localeCompare(b.developer));
      updateData(sortedData);
    } else {
      const filteredData = searchTerm ? originalData.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.developer.toLowerCase().includes(searchTerm.toLowerCase())) : originalData;

      updateData([...filteredData]);
    }
  };

  const handleSortByDate = () => {
    const newSortByDate = !sortByDate;
    setSortByDate(newSortByDate);
    setSortByPerson(false);

    if (newSortByDate) {
      const filteredData = searchTerm ? originalData.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.developer.toLowerCase().includes(searchTerm.toLowerCase())) : originalData;

      const sortedData = [...filteredData].sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      updateData(sortedData);
    } else {
      const filteredData = searchTerm ? originalData.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.developer.toLowerCase().includes(searchTerm.toLowerCase())) : originalData;

      updateData([...filteredData]);
    }
  };

  return (
    <>
      <div className="flex flex-row max-w-[85rem] w-full items-center justify-between mt-4">
        <div className="flex flex-row items-center gap-x-4 w-full">
          <button className="bg-blue-500 rounded hover:bg-blue-500/90 px-7 py-2 transition-colors" onClick={() => setIsNewTaskOpen(true)}>
            New Task
          </button>
          <button className={`flex flex-row gap-x-2 ${sortByPerson ? 'text-blue-500' : 'text-gray-200 hover:text-gray-300'} transition-colors`} onClick={handleSortByPerson}>
            <CircleUserRound className="w-6 h-6" />
            Sort by Person
          </button>
          <button className={`flex flex-row gap-x-2 ${sortByDate ? 'text-blue-500' : 'text-gray-200 hover:text-gray-300'} transition-colors`} onClick={handleSortByDate}>
            <ArrowDownUp className="w-6 h-6" />
            Sort by Date
          </button>
        </div>
        <div className="flex flex-row items-center gap-x-4 max-w-lg w-full mt-4">
          <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} className="bg-gray-800 text-gray-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button className="bg-blue-500 rounded hover:bg-blue-500/90 px-7 py-2 transition-colors flex flex-row gap-x-2">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* New Task Modal */}
      <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-xl shadow-lg px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">Add New Task</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">
                Task Title
              </label>
              <Input className="text-gray-800" id="title" placeholder="Enter task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="developer" className="text-sm font-medium text-gray-700">
                Developer
              </label>
              <Input className="text-gray-800" id="developer" placeholder="Enter developer names (comma separated)" value={newTask.developer} onChange={(e) => setNewTask({ ...newTask, developer: e.target.value })} />
            </div>

            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                <SelectTrigger className="text-gray-800">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: option.color }} />
                        {option.value}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-gray-700">Priority</label>
              <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                <SelectTrigger className="text-gray-800">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: option.color }} />
                        {option.value}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value })}>
                <SelectTrigger className="text-gray-800">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: option.color }} />
                        {option.value}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-gray-700">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left text-gray-800">
                    {newTask.date ? format(new Date(newTask.date), 'dd MMM, yyyy') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={newTask.date ? new Date(newTask.date) : undefined} onSelect={(date) => date && setNewTask({ ...newTask, date: date.toISOString() })} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="estimatedSP" className="text-sm font-medium text-gray-700">
                  Estimated SP
                </label>
                <Input className="text-gray-800 placeholder:text-gray-400" id="estimatedSP" type="number" value={newTask['Estimated SP']} onChange={(e) => setNewTask({ ...newTask, 'Estimated SP': parseInt(e.target.value) || 0 })} />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="actualSP" className="text-sm font-medium text-gray-700">
                  Actual SP
                </label>
                <Input className="text-gray-800 placeholder:text-gray-400" id="actualSP" type="number" value={newTask['Actual SP']} onChange={(e) => setNewTask({ ...newTask, 'Actual SP': parseInt(e.target.value) || 0 })} />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsNewTaskOpen(false)} className="text-gray-800">
              Cancel
            </Button>
            <Button onClick={handleNewTaskSubmit}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
