import { useState, useEffect } from 'react';
import { calendarService, CalendarConnection, CalendarEvent } from '@/services/calendarService';

export function useCalendar() {
  const [calendars, setCalendars] = useState<CalendarConnection[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initializeCalendar();
  }, []);

  const initializeCalendar = async () => {
    try {
      setIsLoading(true);
      await calendarService.initialize();
      await fetchCalendars();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize calendar'));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCalendars = async () => {
    try {
      const connectedCalendars = await calendarService.getConnectedCalendars();
      setCalendars(connectedCalendars);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch calendars'));
    }
  };

  const syncCalendar = async (calendarId: string) => {
    try {
      await calendarService.syncCalendar(calendarId);
      await fetchCalendars();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to sync calendar'));
      throw err;
    }
  };

  const fetchEvents = async (calendarId: string, startDate: Date, endDate: Date) => {
    try {
      const calendarEvents = await calendarService.getEvents(calendarId, startDate, endDate);
      setEvents(calendarEvents);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch events'));
    }
  };

  const connectCalendar = async (type: 'google' | 'outlook' | 'apple') => {
    try {
      const newCalendar = await calendarService.connectCalendar(type);
      setCalendars(prev => [...prev, newCalendar]);
      return newCalendar;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to connect calendar'));
      throw err;
    }
  };

  const disconnectCalendar = async (calendarId: string) => {
    try {
      await calendarService.disconnectCalendar(calendarId);
      setCalendars(prev => prev.filter(cal => cal.id !== calendarId));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to disconnect calendar'));
      throw err;
    }
  };

  return {
    calendars,
    events,
    isLoading,
    error,
    syncCalendar,
    fetchEvents,
    connectCalendar,
    disconnectCalendar
  };
} 