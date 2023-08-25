import { Form } from 'react-router-dom'

type Props = {
    id: number
    name: string
    playtime: number
    backgroundImage: string | null
    updated: string
    onSelect: (event: any) => void
}

function SearchEntry({
    id,
    name,
    playtime,
    backgroundImage,
    updated,
    onSelect,
}: Props) {
    return (
        <Form method="POST" onClick={(event) => onSelect(event)}>
            <div className="card">
                <h5 className="name">{name}</h5>
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
            </div>
        </Form>
    )
}

export default SearchEntry
