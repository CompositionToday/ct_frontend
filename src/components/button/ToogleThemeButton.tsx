import {ActionIcon, Tooltip, useMantineColorScheme} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons';

export function ToggleThemeButton() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
        <Tooltip
            label={useMantineColorScheme().colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            color={useMantineColorScheme().colorScheme === 'dark' ? 'blue' : ''}
        >

            <ActionIcon
                variant="outline"
                color={useMantineColorScheme().colorScheme === 'dark' ? '' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
            >
                {useMantineColorScheme().colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
        </Tooltip>
    );
}