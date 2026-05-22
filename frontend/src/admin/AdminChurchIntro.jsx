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
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy } from '@tabler/icons-react';
import { pageService } from '../services/api';

const FIELDS = [
  {
    section: 'Church Header',
    fields: [
      { key: 'churchTitle', label: 'Church Title', type: 'text', placeholder: 'ശിശുയേശു ദൈവാലയം, പുത്തൻകാട്' },
      { key: 'dioceseSubtitle', label: 'Diocese Subtitle', type: 'text', placeholder: 'നെയ്യാറ്റിൻകര രൂപത · Neyyattinkara Diocese' },
    ],
  },
  {
    section: 'Background Image',
    fields: [
      { key: 'heroImage', label: 'Background Image URL', type: 'text', placeholder: '/image.jpg', isTop: true },
    ],
  },
  {
    section: 'Main Content',
    fields: [
      { key: 'introLabel', label: 'Section Label (small uppercase)', type: 'text', placeholder: 'ആമുഖം' },
      { key: 'introSectionTitle', label: 'Section Title', type: 'text', placeholder: 'ദൈവാലയ പരിചയം' },
      { key: 'mainContent', label: 'Main Content (Malayalam)', type: 'textarea', rows: 12 },
      { key: 'dioceseFooter', label: 'Footer / Diocese Note', type: 'text', placeholder: 'നെയ്യാറ്റിൻകര രൂപതയ്ക്ക് കീഴിലുള്ള ഇടവക' },
    ],
  },
  {
    section: 'Decorative Card',
    fields: [
      { key: 'decorativeCardTitle', label: 'Card Title', type: 'text', placeholder: 'ദൈവ സന്നിധിയിൽ' },
      { key: 'decorativeCardText', label: 'Card Description', type: 'textarea', rows: 3, placeholder: 'ഓരോ ദിവസവും\nദൈവകൃപ അനുഭവിക്കുക' },
    ],
  },
];

export default function AdminChurchIntro() {
  const [meta, setMeta] = useState({});
  const [heroImage, setHeroImage] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pageService.getPage('church-intro')
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
      await pageService.updatePage('church-intro', { heroImage, metadata: meta });
      notifications.show({
        title: 'Saved!',
        message: 'Church Intro page updated successfully.',
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
            Edit Church Intro Page
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

              {group.section === 'Background Image' && heroImage && (
                <Box
                  style={{
                    height: 160,
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: `url(${heroImage}) center/cover no-repeat`,
                    border: '1px solid #e8e8e8',
                    filter: 'blur(2px) brightness(0.6)',
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
