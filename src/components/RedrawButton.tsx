import './RedrawButton.css'

function RedrawButton({ onClick }: { onClick: () => void }) {
    return (
        <button type="button" className="redraw" onClick={onClick}>
            ↻ redraw
        </button>
    )
}

export default RedrawButton
