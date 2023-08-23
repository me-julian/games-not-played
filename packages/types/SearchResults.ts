// Not exhaustive of everything actually sent by RAWG.
export type RawgGame = {
    id: number
    name: string
    background_image: string
    playtime: number
    updated: string
    saturated_color: string
    dominant_color: string
}

export type SearchResults = {
    count: number
    next: string | null
    previous: string | null
    results: RawgGame[]
}
