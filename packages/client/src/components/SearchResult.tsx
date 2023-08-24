import { Form } from 'react-router-dom'

type Props = {
    id: number
    name: string
    playtime: number
    backgroundImage: string | null
    updated: string
    onSelect: (event: any) => void
}

function SearchResult({
    id,
    name,
    playtime,
    backgroundImage,
    updated,
    onSelect,
}: Props) {
    return (
        <Form method="POST" onClick={(event) => onSelect(event)}>
            <div>
                <h6>{name}</h6>
                {playtime !== 0 && <span>{playtime}</span>}
                <input type="hidden" id="id" name="id" value={id} />
                <input type="hidden" id="name" name="name" value={name} />
                {playtime !== 0 && (
                    <input
                        type="hidden"
                        id="playtime"
                        name="playtime"
                        value={playtime}
                    />
                )}
                {backgroundImage && (
                    <input
                        type="hidden"
                        id="backgroundImage"
                        name="backgroundImage"
                        value={backgroundImage}
                    />
                )}
                <input
                    type="hidden"
                    id="updated"
                    name="updated"
                    value={updated}
                />
                <hr />
            </div>
        </Form>
    )
}

export default SearchResult
