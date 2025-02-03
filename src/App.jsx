import { useRef, useState } from 'react';
import './App.css';

import { useActor, useMachine } from '@xstate/react';
import { Modal } from 'antd';
import ReactHlsPlayer from 'react-hls-player';
import { MediaFooter, Thumbnail } from './components';
import { modalMachine, playerMachine } from './state.js';

const source = 'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8';

function App() {
    const videoRef = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modal, sendModal] = useMachine(modalMachine);
    const [player, sendPlayer] = useActor(
        playerMachine.provide({
            actions: {
                playVideo: () => videoRef.current?.play(),
                pauseVideo: () => videoRef.current?.pause(),
            }
        })
    );

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // actions
    const onToggleModal = () => sendModal({ type: 'TOGGLE' });
    const onPlay = () => sendPlayer({ type: 'PLAY' });
    const onPause = () => sendPlayer({ type: 'PAUSE' });

    return (
        <main className="App">
            <Thumbnail onClick={toggleModal}/>

            <Modal
                title="PLAYER"
                open={isModalOpen}
                onCancel={toggleModal}
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
                    />
                    <hr color="lightgray" size="1"/>
                </div>
            </Modal>
        </main>
    );
}

export default App;
