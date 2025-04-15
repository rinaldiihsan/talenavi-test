'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EditableCell from './EditableCell';
import { Task, Option } from './TableTodo';

interface TaskTableProps {
  data: Task[];
  updateData: (updatedData: Task[]) => void;
  statusOptions: Option[];
  priorityOptions: Option[];
  typeOptions: Option[];
}

interface EditingCell {
  rowIndex: number;
  field: string;
}

export default function TaskTable({ data, updateData, statusOptions, priorityOptions, typeOptions }: TaskTableProps) {
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [editValue, setEditValue] = useState<any>(null);

  const handleCellClick = (rowIndex: number, field: string, value: any) => {
    setEditingCell({ rowIndex, field });
    setEditValue(value);
  };

  const handleInputChange = (value: any) => {
    setEditValue(value);
  };

  const handleInputBlur = () => {
    if (editingCell) {
      saveChanges();
      setEditingCell(null);
    }
  };

  const handleSelectChange = (value: string) => {
    setEditValue(value);
    saveChanges(value);
    setEditingCell(null);
  };

  const handleCalendarSelect = (date: Date) => {
    setEditValue(date);
    saveChanges(date);
    setEditingCell(null);
  };

  const saveChanges = (valueOverride: any = null) => {
    if (!editingCell) return;

    const { rowIndex, field } = editingCell;
    const newData = [...data];

    const newValue = valueOverride !== null ? valueOverride : editValue;

    newData[rowIndex] = {
      ...newData[rowIndex],
      [field]: newValue,
    };

    updateData(newData);
  };

  const getOptionColor = (field: string, value: string): string => {
    let options: Option[];
    if (field === 'status') options = statusOptions;
    else if (field === 'priority') options = priorityOptions;
    else if (field === 'type') options = typeOptions;
    else return '#999';

    return options.find((option) => option.value === value)?.color || '#999';
  };

  return (
    <div className="rounded border">
      <Table>
        <TableHeader className="bg-blue-500 py-96">
          <TableRow>
            {['Task', 'Developer', 'Status', 'Priority', 'Type', 'Date', 'Estimated SP', 'Actual SP'].map((title) => (
              <TableHead key={title} className="text-white py-4">
                {title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((task, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                <EditableCell
                  field="title"
                  value={task.title}
                  isEditing={editingCell?.rowIndex === rowIndex && editingCell?.field === 'title'}
                  editValue={editValue}
                  onCellClick={() => handleCellClick(rowIndex, 'title', task.title)}
                  onInputChange={handleInputChange}
                  onInputBlur={handleInputBlur}
                />
              </TableCell>
              <TableCell>
                <EditableCell
                  field="developer"
                  value={task.developer}
                  isEditing={editingCell?.rowIndex === rowIndex && editingCell?.field === 'developer'}
                  editValue={editValue}
                  onCellClick={() => handleCellClick(rowIndex, 'developer', task.developer)}
                  onInputChange={handleInputChange}
                  onInputBlur={handleInputBlur}
                />
              </TableCell>
              <TableCell>
                <EditableCell
                  field="status"
                  value={task.status}
                  isEditing={editingCell?.rowIndex === rowIndex && editingCell?.field === 'status'}
                  editValue={editValue}
                  onCellClick={() => handleCellClick(rowIndex, 'status', task.status)}
                  onSelectChange={handleSelectChange}
                  options={statusOptions}
                  color={getOptionColor('status', task.status)}
                />
              </TableCell>
              <TableCell>
                <EditableCell
                  field="priority"
                  value={task.priority}
                  isEditing={editingCell?.rowIndex === rowIndex && editingCell?.field === 'priority'}
                  editValue={editValue}
                  onCellClick={() => handleCellClick(rowIndex, 'priority', task.priority)}
                  onSelectChange={handleSelectChange}
                  options={priorityOptions}
                  color={getOptionColor('priority', task.priority)}
                />
              </TableCell>
              <TableCell>
                <EditableCell
                  field="type"
                  value={task.type}
                  isEditing={editingCell?.rowIndex === rowIndex && editingCell?.field === 'type'}
                  editValue={editValue}
                  onCellClick={() => handleCellClick(rowIndex, 'type', task.type)}
                  onSelectChange={handleSelectChange}
                  options={typeOptions}
                  color={getOptionColor('type', task.type)}
                />
              </TableCell>
              <TableCell>
                <EditableCell
                  field="date"
                  value={task.date}
                  isEditing={editingCell?.rowIndex === rowIndex && editingCell?.field === 'date'}
                  editValue={editValue}
                  onCellClick={() => handleCellClick(rowIndex, 'date', task.date ? new Date(task.date) : new Date())}
                  onCalendarSelect={handleCalendarSelect}
                />
              </TableCell>
              <TableCell>
                <EditableCell
                  field="Estimated SP"
                  value={task['Estimated SP']}
                  isEditing={editingCell?.rowIndex === rowIndex && editingCell?.field === 'Estimated SP'}
                  editValue={editValue}
                  onCellClick={() => handleCellClick(rowIndex, 'Estimated SP', task['Estimated SP'])}
                  onInputChange={handleInputChange}
                  onInputBlur={handleInputBlur}
                  isNumeric={true}
                />
              </TableCell>
              <TableCell>
                <EditableCell
                  field="Actual SP"
                  value={task['Actual SP']}
                  isEditing={editingCell?.rowIndex === rowIndex && editingCell?.field === 'Actual SP'}
                  editValue={editValue}
                  onCellClick={() => handleCellClick(rowIndex, 'Actual SP', task['Actual SP'])}
                  onInputChange={handleInputChange}
                  onInputBlur={handleInputBlur}
                  isNumeric={true}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
