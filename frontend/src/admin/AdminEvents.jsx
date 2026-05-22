import { useEffect, useState } from 'react';
import {
  Box, Card, Title, Text, Stack, Button, Group, Table, Badge,
  Modal, TextInput, Textarea, Select, ActionIcon, Switch, Grid,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconTrash, IconEdit, IconCheck } from '@tabler/icons-react';
import { eventService } from '../services/api';

const CATEGORIES = ['mass', 'festival', 'prayer', 'community', 'other'];

const emptyValues = {
  title: '',
  description: '',
  date: null,
  time: '',
  location: 'Church Premises',
  category: 'other',
  isPublished: true,
};

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: emptyValues,
    validate: {
      title: (v) => (v.trim().length < 2 ? 'Title required' : null),
      date: (v) => (v ? null : 'Date required'),
    },
  });

  const fetchEvents = () => {
    setLoading(true);
    eventService.getAllEvents()
      .then((res) => setEvents(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEvents(); }, []);

  const openAdd = () => {
    setEditTarget(null);
    form.setValues(emptyValues);
    open();
  };

  const openEdit = (event) => {
    setEditTarget(event._id);
    form.setValues({ ...event, date: new Date(event.date) });
    open();
  };

  const handleSubmit = async (values) => {
    try {
      const payload = { ...values, date: values.date?.toISOString() };
      if (editTarget) {
        await eventService.updateEvent(editTarget, payload);
        notifications.show({ title: 'Updated!', message: 'Event updated.', color: 'green', icon: <IconCheck size={16} /> });
      } else {
        await eventService.createEvent(payload);
        notifications.show({ title: 'Created!', message: 'Event added.', color: 'green', icon: <IconCheck size={16} /> });
      }
      close();
      fetchEvents();
    } catch (err) {
      notifications.show({ title: 'Error', message: err.response?.data?.message || 'Failed.', color: 'red' });
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await eventService.deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e._id !== id));
      notifications.show({ title: 'Deleted', color: 'green' });
    } catch {
      notifications.show({ title: 'Error', message: 'Delete failed.', color: 'red' });
    }
  };

  const categoryColor = { mass: 'blue', festival: 'gold', prayer: 'violet', community: 'green', other: 'gray' };

  return (
    <Box p={{ base: 'sm', sm: 'xl' }}>
      <Stack gap="xl">
        <Group justify="space-between" wrap="wrap">
          <Title order={2} style={{ fontFamily: 'Crimson Pro, serif', color: '#1a2744' }}>
            Events Management
          </Title>
          <Button leftSection={<IconPlus size={16} />} onClick={openAdd}
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d08a)', color: '#1a2744', border: 'none' }}>
            Add Event
          </Button>
        </Group>

        <Card shadow="sm" p={0} style={{ border: '1px solid #e8e8e8', overflow: 'hidden' }}>
          {loading ? (
            <Box p="md"><Text c="dimmed">Loading...</Text></Box>
          ) : (
            <Box style={{ overflowX: 'auto' }}>
            <Table striped highlightOnHover>
              <Table.Thead style={{ background: '#f8f9fa' }}>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {events.map((event) => (
                  <Table.Tr key={event._id}>
                    <Table.Td>
                      <Text fw={500} size="sm">{event.title}</Text>
                      <Text size="xs" c="dimmed">{event.location}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">
                        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </Text>
                      {event.time && <Text size="xs" c="dimmed">{event.time}</Text>}
                    </Table.Td>
                    <Table.Td>
                      <Badge color={categoryColor[event.category] || 'gray'} size="sm" variant="light">
                        {event.category}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={event.isPublished ? 'green' : 'gray'} size="sm" variant="dot">
                        {event.isPublished ? 'Published' : 'Hidden'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon size="sm" variant="light" color="blue" onClick={() => openEdit(event)}>
                          <IconEdit size={14} />
                        </ActionIcon>
                        <ActionIcon size="sm" variant="light" color="red" onClick={() => deleteEvent(event._id)}>
                          <IconTrash size={14} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            </Box>
          )}
        </Card>
      </Stack>

      {/* Add/Edit Modal */}
      <Modal opened={opened} onClose={close} title={editTarget ? 'Edit Event' : 'Add New Event'} centered size="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput label="Event Title" required {...form.getInputProps('title')} />
            <Textarea label="Description" rows={3} {...form.getInputProps('description')} />
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  label="Date"
                  type="date"
                  value={form.values.date ? new Date(form.values.date).toISOString().split('T')[0] : ''}
                  onChange={(e) => form.setFieldValue('date', e.target.value ? new Date(e.target.value) : null)}
                  error={form.errors.date}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput label="Time (e.g., 6:30 AM)" {...form.getInputProps('time')} />
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput label="Location" {...form.getInputProps('location')} />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Select
                  label="Category"
                  data={CATEGORIES.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
                  {...form.getInputProps('category')}
                />
              </Grid.Col>
            </Grid>
            <Switch
              label="Published (visible on website)"
              checked={form.values.isPublished}
              onChange={(e) => form.setFieldValue('isPublished', e.currentTarget.checked)}
            />
            <Button type="submit" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d08a)', color: '#1a2744', border: 'none' }}>
              {editTarget ? 'Update Event' : 'Create Event'}
            </Button>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}

