import { Game } from './Game'

export type Entry = {
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
    game: Game
}
