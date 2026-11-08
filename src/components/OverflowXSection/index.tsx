import React from 'react'
import { useHorizontalScrollFade, HorizontalScrollFades } from '../../hooks/useHorizontalScrollFade'

interface OverflowXSectionProps {
    children: any
    /** Match ReaderView's container-responsive content padding on docs tables. */
    readerGutters?: boolean
}

// Mirrors the horizontal extent + gutters of the legacy TABLE_CLASSES constant,
// but split so the negative margins live on the (relative) wrapper and the
// scroll + padding live on the inner viewport. This lets the edge fades sit at
// the true scroll edges.
const NEGATIVE_MARGIN_CLASSES = '-mx-5 lg:-mx-6 xl:-mx-12'
const VIEWPORT_CLASSES = 'min-w-full overflow-x-auto px-5 lg:px-6 xl:px-12'

// ReaderView uses container queries, not viewport breakpoints, for its padding.
// Tables must use the same named container to avoid overflowing narrow windows
// shown within a wide desktop viewport.
const READER_NEGATIVE_MARGIN_CLASSES =
    '-mx-4 @md/reader-content-container:-mx-6 @lg/reader-content-container:-mx-8 @xl/reader-content-container:-mx-12 @2xl/reader-content-container:-mx-16 @3xl/reader-content-container:-mx-20'
const READER_VIEWPORT_CLASSES =
    'min-w-full overflow-x-auto px-4 @md/reader-content-container:px-6 @lg/reader-content-container:px-8 @xl/reader-content-container:px-12 @2xl/reader-content-container:px-16 @3xl/reader-content-container:px-20'

export const OverflowXSection = ({ children, readerGutters = false }: OverflowXSectionProps) => {
    const { ref, showStart, showEnd } = useHorizontalScrollFade()
    const marginClasses = readerGutters ? READER_NEGATIVE_MARGIN_CLASSES : NEGATIVE_MARGIN_CLASSES
    const viewportClasses = readerGutters ? READER_VIEWPORT_CLASSES : VIEWPORT_CLASSES
    return (
        <div className={`relative ${marginClasses}`}>
            <div ref={ref} className={viewportClasses}>
                {children}
            </div>
            <HorizontalScrollFades showStart={showStart} showEnd={showEnd} />
        </div>
    )
}
