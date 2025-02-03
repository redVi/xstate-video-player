import { createMachine } from 'xstate';

export const playerMachine = createMachine({
    id: 'video',
    initial: 'paused',
    states: {
        paused: {
            on: {
                PLAY: {
                    target: 'playing',
                    actions: ['playVideo'],
                }
            }
        },
        playing: {
            on: {
                PAUSE: {
                    target: 'paused',
                    actions: ['pauseVideo'],
                },
            }
        },
    },
});

export const modalMachine = createMachine({
    id: 'modal',
    initial: 'full',
    states: {
        mini: {
            on: {
                TOGGLE: {
                    target: 'full',
                }
            },
        },
        full: {
            on: {
                TOGGLE: {
                    target: 'mini',
                },
            },
        }
    }
});
