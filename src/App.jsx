import './App.css';
import { useEffect, useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { useMachine } from '@xstate/react';
import { Modal } from 'antd';
import { MediaFooter, Thumbnail } from './components';
import { mediaMachine } from './machines/mediaMachine';
import { source } from './constants';

function App() {
    const videoRef = useRef();
    const [state, send] = useMachine(mediaMachine, {
        actions: {
            playVideo: () => {
                videoRef.current?.play();
            },
            pauseVideo: () => {
                videoRef.current?.pause();
            }
        }
    });

    const isClosed = state.matches('closed');
    const isFull = state.matches('opened.full');
    const isPlaying = state.matches({ opened: { full: 'playing' } }) || state.matches({ opened: { mini: 'playing' } });

    const handleOpen = () => send({
        type: 'OPEN',
        videoRef: videoRef
    });
    const handleClose = () => send({ type: 'CLOSE' });
    const handleToggleSize = () => send({ type: 'TOGGLE_SIZE' });
    const handleTogglePlay = () => send({ type: 'TOGGLE_PLAY' });

    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.keyCode === 32) {
            event.preventDefault();
            handleTogglePlay();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying]);

    return (
        <main className="App">
            <Thumbnail onClick={handleOpen}/>

            {!isClosed && (
                <Modal
                    title="PLAYER"
                    open
                    onCancel={handleClose}
                    width={isFull ? 1000 : 512}
                    footer={
                        <MediaFooter
                            isPlaying={isPlaying}
                            isFullSize={isFull}
                            onToggleSize={handleToggleSize}
                            onTogglePlay={handleTogglePlay} />
                    }>
                    <div id="modal">
                        <ReactHlsPlayer
                            playerRef={videoRef}
                            src={source}
                            width="100%"
                            height="auto"
                            loop
                            autoPlay
                            onClick={handleTogglePlay} />
                        <hr color="lightgray" size="1"/>
                    </div>
                </Modal>
            )}
        </main>
    );
}

export default App;
