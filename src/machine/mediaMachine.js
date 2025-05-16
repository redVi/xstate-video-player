import { createMachine, assign } from 'xstate';

export const mediaMachine = createMachine({
    id: 'media',
    initial: 'closed',
    context: {
        videoRef: null,
    },
    states: {
        closed: {
            entry: ['pauseVideo'],
            on: {
                OPEN: {
                    target: 'opened.full.playing',
                    actions: assign({ videoRef: ({ event }) => event.videoRef })
                }
            }
        },
        opened: {
            initial: 'full',
            states: {
                full: {
                    initial: 'playing',
                    states: {
                        playing: {
                            entry: ['playVideo'],
                            on: {
                                TOGGLE_PLAY: {
                                    target: 'paused',
                                    actions: ['pauseVideo']
                                }
                            }
                        },
                        paused: {
                            on: {
                                TOGGLE_PLAY: {
                                    target: 'playing',
                                    actions: ['playVideo']
                                }
                            }
                        }
                    },
                    on: {
                        TOGGLE_SIZE: 'mini',
                        CLOSE: {
                            target: '#media.closed',
                            actions: ['pauseVideo']
                        }
                    }
                },
                mini: {
                    initial: 'playing',
                    states: {
                        playing: {
                            entry: ['playVideo'],
                            on: {
                                TOGGLE_PLAY: {
                                    target: 'paused',
                                    actions: ['pauseVideo']
                                }
                            }
                        },
                        paused: {
                            on: {
                                TOGGLE_PLAY: {
                                    target: 'playing',
                                    actions: ['playVideo']
                                }
                            }
                        }
                    },
                    on: {
                        TOGGLE_SIZE: 'full',
                        CLOSE: {
                            target: '#media.closed',
                            actions: ['pauseVideo']
                        }
                    }
                }
            }
        }
    }
}, {
    actions: {
        playVideo: ({ context }) => {
            context.videoRef?.current?.play();
        },
        pauseVideo: ({ context }) => {
            context.videoRef?.current?.pause();
        }
    }
});
