export default function PianoRoll() {
    return (
        <>
            <h2>What is PianoRoll?</h2>
            <p>
                PianoRoll is a web application I developed that emulates the
                classic piano roll interface found in many Digital Audio
                Workstations (DAWs). The piano roll is an essential tool for
                composing melodies, chord progressions, drum patterns, and more.
                It presents piano notes on a grid where the y-axis corresponds
                to the pitch (higher notes are higher on the grid) and the
                x-axis represents time. The length of a note on the grid
                determines how long it plays.
            </p>

            <h2>How PianoRoll was Built</h2>
            <p>
                PianoRoll was built using ReactJs with TypeScript, aiming to
                create a dynamic and feature-rich music composition tool that
                performs smoothly in real-time. Initially, each note on the grid
                was represented by an individual HTML element. This worked well
                for a small number of notes, but as the complexity and number of
                notes increased, the app's performance began to suffer.
            </p>
            <p>
                To address this, I transitioned to using the HTML Canvas API for
                rendering notes. Drawing each note on a canvas rather than
                creating individual HTML elements significantly improved the
                app's performance, making interactions like creating, moving,
                and deleting notes much smoother.
            </p>

            <h2>Features of PianoRoll</h2>
            <p>
                PianoRoll is designed to be a fully functional tool akin to
                those found in popular DAWs. Here are some of its key features:
            </p>
            <ul>
                <li>
                    <strong>Keyboard Shortcuts</strong>: Cut, copy, and paste
                    notes; Move notes up/down by octaves or semitones; Undo and
                    redo actions.
                </li>
                <li>
                    <strong>Diverse Instrumentation</strong>: Access to over 50
                    soundfont instruments.
                </li>
                <li>
                    <strong>Layer Support</strong>: Create and manage multiple
                    layers of notes.
                </li>
                <li>
                    <strong>Grid Snap</strong>: Magnet tool to snap notes to the
                    grid for precise placement.
                </li>
                <li>
                    <strong>Adjustable BPM</strong>: Change the beats per minute
                    to control the tempo.
                </li>
                <li>
                    <strong>Multi-Note Selection</strong>: Select and manipulate
                    multiple notes simultaneously.
                </li>
                <li>
                    <strong>Composition Export</strong>: Download your
                    compositions for future use.
                </li>
                <li>
                    <strong>MIDI Import</strong>: Import MIDI files to work with
                    existing compositions.
                </li>
            </ul>

            <h2>Conclusion</h2>
            <p>
                Overall, PianoRoll has been a fun and challenging project to
                complete, which helped me deepen my understanding of creating
                performant React code.
            </p>
        </>
    );
}
