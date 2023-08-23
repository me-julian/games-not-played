import { User as TUser } from './User'
import { Game as TGame } from './Game'
import { Entry as TEntry } from './Entry'
import {
    RawgGame as TRawgGame,
    SearchResults as TSearchResults,
} from './SearchResults'

// Objects as they should be exposed on the client.
export namespace Client {
    export type User = TUser
    export type Game = TGame
    export type Entry = TEntry
}

export namespace RAWG {
    export type RawgGame = TRawgGame
    export type SearchResults = TSearchResults
}
