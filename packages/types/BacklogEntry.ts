export type BacklogEntry = {
    id: number
    userId: number
    gameId: number
    customOrder: number
    isStarred: boolean
    isOwned: boolean
    isPlaying: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}
