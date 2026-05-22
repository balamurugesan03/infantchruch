import { useEffect, useState } from 'react';
import { Grid, Card, Text, Title, Stack, Group, Box } from '@mantine/core';
import {
  IconPhoto,
  IconMail,
  IconCalendar,
  IconCross,
  IconTrendingUp,
} from '@tabler/icons-react';
import { galleryService, contactService, eventService } from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ gallery: 0, messages: 0, unread: 0, events: 0 });

  useEffect(() => {
    Promise.all([
      galleryService.getAllGallery(),
      contactService.getMessages(),
      eventService.getAllEvents(),
    ])
      .then(([gallery, contacts, events]) => {
        const messages = contacts.data.data || [];
        setStats({
          gallery: gallery.data.data?.length || 0,
          messages: messages.length,
          unread: messages.filter((m) => !m.isRead).length,
          events: events.data.data?.length || 0,
        });
      })
      .catch(console.error);
  }, []);

  const statCards = [
    {
      label: 'Gallery Images',
      value: stats.gallery,
      icon: IconPhoto,
      color: '#c9a84c',
      bg: 'rgba(201,168,76,0.1)',
    },
    {
      label: 'Total Messages',
      value: stats.messages,
      icon: IconMail,
      color: '#4c7bc9',
      bg: 'rgba(76,123,201,0.1)',
    },
    {
      label: 'Unread Messages',
      value: stats.unread,
      icon: IconTrendingUp,
      color: '#e05252',
      bg: 'rgba(224,82,82,0.1)',
    },
    {
      label: 'Events',
      value: stats.events,
      icon: IconCalendar,
      color: '#52c084',
      bg: 'rgba(82,192,132,0.1)',
    },
  ];

  return (
    <Box p={{ base: 'sm', sm: 'xl' }}>
      <Stack gap="xl">
        {/* Header */}
        <Box>
          <Group gap="sm" mb="xs">
            <IconCross size={24} color="#c9a84c" />
            <Title order={2} style={{ fontFamily: 'Crimson Pro, serif', color: '#1a2744' }}>
              Admin Dashboard
            </Title>
          </Group>
          <Text c="dimmed" size="sm">
            Manage all content for Infant Jesus Church website
          </Text>
        </Box>

        {/* Stats */}
        <Grid>
          {statCards.map((stat) => (
            <Grid.Col key={stat.label} span={{ base: 6, md: 3 }}>
              <Card shadow="sm" p="lg" style={{ border: '1px solid #e8e8e8', background: '#fff' }}>
                <Group justify="space-between" mb="md">
                  <Box
                    style={{
                      width: 48,
                      height: 48,
                      background: stat.bg,
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <stat.icon size={22} color={stat.color} />
                  </Box>
                </Group>
                <Text
                  style={{ fontSize: '2rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}
                >
                  {stat.value}
                </Text>
                <Text size="sm" c="dimmed" mt="xs">
                  {stat.label}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Quick Guide */}
        <Card shadow="sm" p="xl" style={{ border: '1px solid #e8e8e8', background: '#fff' }}>
          <Title order={4} mb="md" style={{ color: '#1a2744' }}>
            Quick Guide
          </Title>
          <Grid>
            {[
              { section: 'Home Page', desc: 'Edit hero title, subtitle, and content sections. Manage mass timings.' },
              { section: 'About Page', desc: 'Update church history, diocese info, and mission statement.' },
              { section: 'Gallery', desc: 'Upload new images, organize by category, delete old images.' },
              { section: 'Events', desc: 'Add upcoming events, feasts, and special Mass timings.' },
              { section: 'Messages', desc: 'View and manage contact form submissions from the website.' },
            ].map((item) => (
              <Grid.Col key={item.section} span={{ base: 12, sm: 6, md: 4 }}>
                <Box
                  p="md"
                  style={{
                    background: '#fafafa',
                    borderRadius: 8,
                    borderLeft: '3px solid #c9a84c',
                  }}
                >
                  <Text fw={600} size="sm" mb={4}>
                    {item.section}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {item.desc}
                  </Text>
                </Box>
              </Grid.Col>
            ))}
          </Grid>
        </Card>
      </Stack>
    </Box>
  );
}

