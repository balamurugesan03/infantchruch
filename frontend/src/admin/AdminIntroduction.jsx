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
  SimpleGrid,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy } from '@tabler/icons-react';
import { pageService } from '../services/api';

const FIELDS = [
  {
    section: 'Welcome Banner',
    fields: [
      { key: 'welcomeText', label: 'Welcome Text (Banner)', type: 'text', placeholder: 'പുത്തൻകാട് ശിശുയേശു ദൈവാലയത്തിലേക്ക് സ്വാഗതം' },
    ],
  },
  {
    section: 'Introduction Paragraphs',
    fields: [
      { key: 'introPara1', label: 'First Paragraph', type: 'textarea', rows: 4 },
      { key: 'introPara2', label: 'Second Paragraph', type: 'textarea', rows: 4 },
    ],
  },
  {
    section: 'Church Image & Blessing Card',
    fields: [
      { key: 'heroImage', label: 'Church Image URL', type: 'text', placeholder: '/image.jpg', isTop: true },
      { key: 'blessingTitle', label: 'Blessing Title', type: 'text', placeholder: 'ദൈവാലയ ആശീർവാദം' },
      { key: 'blessingDate', label: 'Blessing Date/Event', type: 'text', placeholder: '2026 മെയ് 24 ഞായറാഴ്ച വൈകുന്നേരം 4:00 ന്' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'പുത്തൻകാട്, കേരളം' },
      { key: 'diocese', label: 'Diocese', type: 'text', placeholder: 'നെയ്യാറ്റിൻകര' },
    ],
  },
  {
    section: 'Quick Info Cards',
    fields: [
      { key: 'massTimeValue', label: 'Mass Time', type: 'text', placeholder: 'രാവിലെ 6:30' },
      { key: 'addressValue', label: 'Address', type: 'text', placeholder: 'പുത്തൻകാട്' },
    ],
  },
];

export default function AdminIntroduction() {
  const [meta, setMeta] = useState({});
  const [heroImage, setHeroImage] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pageService.getPage('introduction')
      .then((res) => {
        const data = res.data.data || {};
        setMeta(data.metadata || {});
        setHeroImage(data.heroImage || '');
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const setField = (key, value) => {
    if (key === 'heroImage') {
      setHeroImage(value);
    } else {
      setMeta((prev) => ({ ...prev, [key]: value }));
    }
  };

  const getField = (key) => key === 'heroImage' ? heroImage : (meta[key] || '');

  const handleSave = async () => {
    setSaving(true);
    try {
      await pageService.updatePage('introduction', { heroImage, metadata: meta });
      notifications.show({
        title: 'Saved!',
        message: 'Introduction page updated successfully.',
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
            Edit Introduction Page
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

        {FIELDS.map((group) => (
          <Card key={group.section} shadow="sm" p="xl" style={{ border: '1px solid #e8e8e8' }}>
            <Title order={4} mb="md">{group.section}</Title>
            <Stack gap="md">
              {group.fields.map((f) => {
                const val = getField(f.key);
                if (f.type === 'textarea') {
                  return (
                    <Textarea
                      key={f.key}
                      label={f.label}
                      rows={f.rows || 3}
                      value={val}
                      onChange={(e) => setField(f.key, e.target.value)}
                      placeholder={f.placeholder}
                    />
                  );
                }
                return (
                  <TextInput
                    key={f.key}
                    label={f.label}
                    value={val}
                    onChange={(e) => setField(f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                );
              })}

              {group.section === 'Church Image & Blessing Card' && heroImage && (
                <Box
                  style={{
                    height: 160,
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: `url(${heroImage}) center/cover no-repeat`,
                    border: '1px solid #e8e8e8',
                  }}
                />
              )}
            </Stack>
          </Card>
        ))}

        <Group justify="flex-end">
          <Button
            leftSection={<IconDeviceFloppy size={16} />}
            loading={saving}
            onClick={handleSave}
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d08a)', color: '#1a2744', border: 'none' }}
          >
            Save Changes
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
