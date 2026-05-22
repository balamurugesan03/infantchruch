import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Title,
  Text,
  Stack,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  NumberInput,
  Select,
  Grid,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconTrash, IconCheck, IconDeviceFloppy } from '@tabler/icons-react';
import { pageService } from '../services/api';

export default function AdminHome() {
  const [page, setPage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pageService
      .getPage('home')
      .then((res) => setPage(res.data.data || {}))
      .catch(() => setPage({}))
      .finally(() => setLoading(false));
  }, []);

  const updateField = (field, value) => {
    setPage((prev) => ({ ...prev, [field]: value }));
  };

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

  const updateMassTime = (index, field, value) => {
    const massTimes = [...(page.massTimes || [])];
    massTimes[index] = { ...massTimes[index], [field]: value };
    setPage((prev) => ({ ...prev, massTimes }));
  };

  const addMassTime = () => {
    const massTimes = [...(page.massTimes || []), { day: '', time: '', language: 'Malayalam' }];
    setPage((prev) => ({ ...prev, massTimes }));
  };

  const removeMassTime = (index) => {
    const massTimes = [...(page.massTimes || [])];
    massTimes.splice(index, 1);
    setPage((prev) => ({ ...prev, massTimes }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await pageService.updatePage('home', page);
      notifications.show({
        title: 'Saved!',
        message: 'Home page updated successfully.',
        color: 'green',
        icon: <IconCheck size={16} />,
      });
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err.response?.data?.message || 'Save failed.',
        color: 'red',
      });
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
            Edit Home Page
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

        {/* Hero Section */}
        <Card shadow="sm" p="xl" style={{ border: '1px solid #e8e8e8' }}>
          <Title order={4} mb="md">Hero Section</Title>
          <Stack gap="md">
            <TextInput
              label="Hero Title"
              value={page.heroTitle || ''}
              onChange={(e) => updateField('heroTitle', e.target.value)}
            />
            <TextInput
              label="Hero Subtitle"
              value={page.heroSubtitle || ''}
              onChange={(e) => updateField('heroSubtitle', e.target.value)}
            />
            <TextInput
              label="Hero Background Image URL"
              placeholder="https://... or /uploads/your-photo.jpg"
              description="Paste a full image URL or an uploaded image path. Leave blank to use the default church photo."
              value={page.heroImage || ''}
              onChange={(e) => updateField('heroImage', e.target.value)}
            />
            {page.heroImage && (
              <Box
                style={{
                  height: 160,
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${page.heroImage}) center/cover no-repeat`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e8e8e8',
                }}
              >
                <Text size="xs" style={{ color: '#fff' }}>Preview</Text>
              </Box>
            )}
          </Stack>
        </Card>

        {/* Content Sections */}
        <Card shadow="sm" p="xl" style={{ border: '1px solid #e8e8e8' }}>
          <Group justify="space-between" mb="md">
            <Title order={4}>Content Sections</Title>
            <Button size="xs" leftSection={<IconPlus size={14} />} variant="light" onClick={addSection}>
              Add Section
            </Button>
          </Group>

          <Stack gap="md">
            {(page.sections || []).map((section, i) => (
              <Box
                key={i}
                p="md"
                style={{ border: '1px solid #e8e8e8', borderRadius: 8, background: '#fafafa' }}
              >
                <Group justify="space-between" mb="sm">
                  <Text fw={600} size="sm">Section {i + 1}</Text>
                  <ActionIcon color="red" variant="light" size="sm" onClick={() => removeSection(i)}>
                    <IconTrash size={14} />
                  </ActionIcon>
                </Group>
                <Stack gap="sm">
                  <Grid>
                    <Grid.Col span={{ base: 12, sm: 9 }}>
                      <TextInput
                        label="Title"
                        value={section.title}
                        onChange={(e) => updateSection(i, 'title', e.target.value)}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, sm: 3 }}>
                      <NumberInput
                        label="Order"
                        value={section.order}
                        onChange={(v) => updateSection(i, 'order', v)}
                        min={0}
                      />
                    </Grid.Col>
                  </Grid>
                  <Textarea
                    label="Content"
                    rows={4}
                    value={section.content}
                    onChange={(e) => updateSection(i, 'content', e.target.value)}
                  />
                </Stack>
              </Box>
            ))}
          </Stack>
        </Card>

        {/* Mass Timings */}
        <Card shadow="sm" p="xl" style={{ border: '1px solid #e8e8e8' }}>
          <Group justify="space-between" mb="md">
            <Title order={4}>Mass Timings</Title>
            <Button size="xs" leftSection={<IconPlus size={14} />} variant="light" onClick={addMassTime}>
              Add Timing
            </Button>
          </Group>

          <Stack gap="sm">
            {(page.massTimes || []).map((mt, i) => (
              <Grid key={i} align="flex-end">
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <TextInput
                    label={i === 0 ? 'Day' : undefined}
                    placeholder="Monday – Saturday"
                    value={mt.day}
                    onChange={(e) => updateMassTime(i, 'day', e.target.value)}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 5, sm: 3 }}>
                  <TextInput
                    label={i === 0 ? 'Time' : undefined}
                    placeholder="6:30 AM"
                    value={mt.time}
                    onChange={(e) => updateMassTime(i, 'time', e.target.value)}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 5, sm: 3 }}>
                  <Select
                    label={i === 0 ? 'Language' : undefined}
                    value={mt.language}
                    onChange={(v) => updateMassTime(i, 'language', v)}
                    data={['Malayalam', 'English', 'Latin', 'Tamil']}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 2, sm: 2 }}>
                  <ActionIcon color="red" variant="light" onClick={() => removeMassTime(i)} mb={2}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

