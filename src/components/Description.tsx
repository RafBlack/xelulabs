import './Description.css'
import type { Ref } from 'react'

function Description({ ref }: { ref?: Ref<HTMLParagraphElement> }) {
    return (
        <p ref={ref} className="hero-desc">
            A passion-driven cybersecurity organization focused on improvement and exposure through
            practical competition and projects.
        </p>
    )
}

export default Description
