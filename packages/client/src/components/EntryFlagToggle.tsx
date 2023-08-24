import { useFetcher } from 'react-router-dom'

type Props = {
    flagValue: boolean
    flagType: string
}

function EntryFlagToggle({ flagValue, flagType }: Props) {
    const fetcher = useFetcher()

    return (
        <fetcher.Form
            onChange={(event) => {
                fetcher.submit(event.currentTarget, {
                    method: 'PATCH',
                })
            }}
            method="PATCH"
            className="toggle-btn"
        >
            <input
                className="sr-only"
                type="checkbox"
                id={flagType}
                name={flagType}
                value={'true'}
                defaultChecked={flagValue}
            />
            {
                <label htmlFor={flagType}>
                    {flagType.charAt(0).toUpperCase() + flagType.slice(1)}
                </label>
            }
            {/* This value is sent even if unchecking the checkbox.
            The API prioritizes 'playing' so it doesn't interfere. */}
            <input type="hidden" name={`un${flagType}`} value={'false'} />
        </fetcher.Form>
    )
}

export default EntryFlagToggle
