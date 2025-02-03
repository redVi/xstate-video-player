import { useEffect, useRef } from 'react';
import './App.css';

import ReactHlsPlayer from 'react-hls-player';
import { useActor, useMachine } from '@xstate/react';
import { Modal } from 'antd';
import { MediaFooter, Thumbnail } from './components';
import { modalMachine, playerMachine } from './state.js';
import { source, types } from './constants.js';

function App() {
    const videoRef = useRef();
    const [modal, sendModal] = useMachine(modalMachine);
    const [player, sendPlayer] = useActor(
        playerMachine.provide({
            actions: {
                playVideo: () => videoRef.current?.play(),
                pauseVideo: () => videoRef.current?.pause(),
            },
        })
    );

    // actions
    const onToggleModal = () => sendModal({ type: 'TOGGLE' });
    const onPlay = () => sendPlayer({ type: types.PLAY });
    const onPause = () => sendPlayer({ type: types.PAUSE });
    const onReset = () => {
        sendPlayer({ type: types.PAUSE });
        sendModal({ type: types.RESET });
    };
    const onShow = () => sendModal({ type: types.SHOW });
    const togglePlay = () => player.value === 'playing' ? onPause() : onPlay();

    // stop or start video by space key
    const handleKeyDown = (event) => {
        if (event.key === 'Space' || event.keyCode === 32) togglePlay();
    };

    // effects
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <main className="App">
            <Thumbnail onClick={onShow}/>

            {modal.value === 'idle' ? null : (
                <Modal
                    title="PLAYER"
                    open
                    onCancel={onReset}
                    width={modal.value === 'full' ? 1000 : 512}
                    footer={
                        <MediaFooter
                            value={player.value}
                            onToggleModal={onToggleModal}
                            onPlay={onPlay}
                            onPause={onPause}
                        />}
                >
                    <div id="modal">
                        <ReactHlsPlayer
                            playerRef={videoRef}
                            src={source}
                            width="100%"
                            height="auto"
                            loop
                            onCanPlay={() => sendPlayer({ type: 'PLAY' })}
                            onClick={togglePlay}
                        />
                        <hr color="lightgray" size="1"/>
                    </div>
                </Modal>
            )}
        </main>
    );
}

export default App;
