import { Center, Loader, Stack, Text } from '@mantine/core';
import { IconCross } from '@tabler/icons-react';

export default function PageLoader({ message = 'Loading...' }) {
  return (
    <Center style={{ minHeight: '60vh' }}>
      <Stack align="center" gap="md">
        <IconCross size={36} color="#c9a84c" style={{ animation: 'spin 2s linear infinite' }} />
        <Loader color="gold" size="sm" />
        <Text size="sm" c="dimmed">{message}</Text>
      </Stack>
    </Center>
  );
}
