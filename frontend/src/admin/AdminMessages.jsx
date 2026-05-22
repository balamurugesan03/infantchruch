import { useEffect, useState } from 'react';
import {
  Box, Card, Title, Text, Stack, Badge, Group, ActionIcon,
  Table, Modal, Button, Alert,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconMail, IconMailOpened, IconTrash, IconEye } from '@tabler/icons-react';
import { contactService } from '../services/api';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const fetchMessages = () => {
    setLoading(true);
    contactService.getMessages()
      .then((res) => setMessages(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, []);

  const viewMessage = async (msg) => {
    setSelected(msg);
    open();
    if (!msg.isRead) {
      try {
        await contactService.markAsRead(msg._id);
        setMessages((prev) => prev.map((m) => m._id === msg._id ? { ...m, isRead: true } : m));
      } catch { /* ignore */ }
    }
  };

  const deleteMessage = async (id) => {
    try {
      await contactService.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      notifications.show({ title: 'Deleted', message: 'Message removed.', color: 'green' });
      if (selected?._id === id) close();
    } catch {
      notifications.show({ title: 'Error', message: 'Delete failed.', color: 'red' });
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <Box p={{ base: 'sm', sm: 'xl' }}>
      <Stack gap="xl">
        <Group justify="space-between">
          <Box>
            <Title order={2} style={{ fontFamily: 'Crimson Pro, serif', color: '#1a2744' }}>
              Contact Messages
            </Title>
            {unreadCount > 0 && (
              <Badge color="red" size="sm" mt="xs">{unreadCount} unread</Badge>
            )}
          </Box>
        </Group>

        <Card shadow="sm" p={0} style={{ border: '1px solid #e8e8e8', overflow: 'hidden' }}>
          {loading ? (
            <Box p="md"><Text c="dimmed">Loading messages...</Text></Box>
          ) : messages.length === 0 ? (
            <Box p="md">
              <Alert icon={<IconMail size={16} />} color="gray">No messages yet.</Alert>
            </Box>
          ) : (
            <Box style={{ overflowX: 'auto' }}>
            <Table striped highlightOnHover>
              <Table.Thead style={{ background: '#f8f9fa' }}>
                <Table.Tr>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Subject</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {messages.map((msg) => (
                  <Table.Tr
                    key={msg._id}
                    style={{ fontWeight: msg.isRead ? 400 : 700, background: msg.isRead ? 'transparent' : '#fffbf0' }}
                  >
                    <Table.Td>
                      {msg.isRead
                        ? <IconMailOpened size={16} color="#999" />
                        : <IconMail size={16} color="#c9a84c" />
                      }
                    </Table.Td>
                    <Table.Td>
                      <Box>
                        <Text size="sm" fw={msg.isRead ? 400 : 600}>{msg.name}</Text>
                        <Text size="xs" c="dimmed">{msg.email}</Text>
                      </Box>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" lineClamp={1}>{msg.subject}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" c="dimmed">
                        {new Date(msg.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon size="sm" variant="light" color="blue" onClick={() => viewMessage(msg)}>
                          <IconEye size={14} />
                        </ActionIcon>
                        <ActionIcon size="sm" variant="light" color="red" onClick={() => deleteMessage(msg._id)}>
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

      {/* Message Detail Modal */}
      <Modal opened={opened} onClose={close} title="Message Details" size="lg" centered>
        {selected && (
          <Stack gap="md">
            <Group justify="space-between">
              <Box>
                <Text fw={700}>{selected.name}</Text>
                <Text size="sm" c="dimmed">{selected.email}</Text>
                {selected.phone && <Text size="sm" c="dimmed">{selected.phone}</Text>}
              </Box>
              <Text size="xs" c="dimmed">
                {new Date(selected.createdAt).toLocaleString('en-IN')}
              </Text>
            </Group>

            <Box p="md" style={{ background: '#f8f9fa', borderRadius: 8 }}>
              <Text size="xs" style={{ color: '#c9a84c', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }} mb="xs">
                Subject
              </Text>
              <Text fw={600}>{selected.subject}</Text>
            </Box>

            <Box p="md" style={{ background: '#f8f9fa', borderRadius: 8 }}>
              <Text size="xs" style={{ color: '#c9a84c', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }} mb="xs">
                Message
              </Text>
              <Text style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{selected.message}</Text>
            </Box>

            <Button
              color="red"
              variant="light"
              leftSection={<IconTrash size={14} />}
              onClick={() => deleteMessage(selected._id)}
              size="sm"
            >
              Delete Message
            </Button>
          </Stack>
        )}
      </Modal>
    </Box>
  );
}

