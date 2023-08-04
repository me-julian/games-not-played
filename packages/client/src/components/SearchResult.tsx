import { Form } from 'react-router-dom'

type Props = {
    id: number
    name: string
    playtime?: number
    backgroundImage?: string
}

function SearchResult({ id, name, playtime, backgroundImage }: Props) {
    return (
        <Form method="POST">
            <div>
                <h6>{name}</h6>
                {playtime && <span>{playtime}</span>}
                <input type="hidden" id="id" name="id" value={id} />
                <input type="hidden" id="name" name="name" value={name} />
                <input
                    type="hidden"
                    id="playtime"
                    name="playtime"
                    value={playtime}
                />
                <input
                    type="hidden"
                    id="backgroundImage"
                    name="backgroundImage"
                    value={backgroundImage}
                />
                <input type="submit" value="submit" />
                <hr />
            </div>
        </Form>
    )
}

export default SearchResult
