import { useEffect, useState } from 'react';
import {
  Box, Card, Title, Text, Stack, TextInput, Textarea, Button, Group,
  ActionIcon, NumberInput, Grid,
} from '@mantine/core';

import { notifications } from '@mantine/notifications';
import { IconPlus, IconTrash, IconCheck, IconDeviceFloppy } from '@tabler/icons-react';
import { pageService } from '../services/api';

export default function AdminAbout() {
  const [page, setPage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pageService.getPage('about')
      .then((res) => setPage(res.data.data || {}))
      .catch(() => setPage({}))
      .finally(() => setLoading(false));
  }, []);

  const updateField = (field, value) => setPage((prev) => ({ ...prev, [field]: value }));

  const updateSection = (index, field, value) => {
    const sections = [...(page.sections || [])];
    sections[index] = { ...sections[index], [field]: value };
    setPage((prev) => ({ ...prev, sections }));
  };

  const addSection = () => {
    const sections = [...(page.sections || []), { title: '', content: '', order: page.sections?.length || 0 }];
    setPage((prev) => ({ ...prev, sections }));
  };

  const removeSection = (index) => {
    const sections = [...(page.sections || [])];
    sections.splice(index, 1);
    setPage((prev) => ({ ...prev, sections }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await pageService.updatePage('about', page);
      notifications.show({ title: 'Saved!', message: 'About page updated.', color: 'green', icon: <IconCheck size={16} /> });
    } catch (err) {
      notifications.show({ title: 'Error', message: err.response?.data?.message || 'Save failed.', color: 'red' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Box p="md"><Text>Loading...</Text></Box>;

  return (
    <Box p={{ base: 'sm', sm: 'xl' }}>
      <Stack gap="xl">
        <Group justify="space-between" wrap="wrap">
          <Title order={2} style={{ fontFamily: 'Crimson Pro, serif', color: '#1a2744' }}>
            Edit About Page
          </Title>
          <Button
            leftSection={<IconDeviceFloppy size={16} />}
            loading={saving}
            onClick={handleSave}
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d08a)', color: '#1a2744', border: 'none' }}
          >
            Save Changes
          </Button>
        </Group>

        <Card shadow="sm" p="xl" style={{ border: '1px solid #e8e8e8' }}>
          <Title order={4} mb="md">Hero Section</Title>
          <Stack gap="md">
            <TextInput label="Hero Title" value={page.heroTitle || ''} onChange={(e) => updateField('heroTitle', e.target.value)} />
            <TextInput label="Hero Subtitle" value={page.heroSubtitle || ''} onChange={(e) => updateField('heroSubtitle', e.target.value)} />
          </Stack>
        </Card>

        <Card shadow="sm" p="xl" style={{ border: '1px solid #e8e8e8' }}>
          <Group justify="space-between" mb="md">
            <Title order={4}>Content Sections</Title>
            <Button size="xs" leftSection={<IconPlus size={14} />} variant="light" onClick={addSection}>
              Add Section
            </Button>
          </Group>
          <Stack gap="md">
            {(page.sections || []).map((section, i) => (
              <Box key={i} p="md" style={{ border: '1px solid #e8e8e8', borderRadius: 8, background: '#fafafa' }}>
                <Group justify="space-between" mb="sm">
                  <Text fw={600} size="sm">Section {i + 1}</Text>
                  <ActionIcon color="red" variant="light" size="sm" onClick={() => removeSection(i)}>
                    <IconTrash size={14} />
                  </ActionIcon>
                </Group>
                <Stack gap="sm">
                  <Grid>
                    <Grid.Col span={{ base: 12, sm: 9 }}>
                      <TextInput label="Title" value={section.title} onChange={(e) => updateSection(i, 'title', e.target.value)} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, sm: 3 }}>
                      <NumberInput label="Order" value={section.order} onChange={(v) => updateSection(i, 'order', v)} min={0} />
                    </Grid.Col>
                  </Grid>
                  <Textarea label="Content" rows={4} value={section.content} onChange={(e) => updateSection(i, 'content', e.target.value)} />
                </Stack>
              </Box>
            ))}
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

